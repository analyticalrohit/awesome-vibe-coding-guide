const express = require('express');
const { body, validationResult, param } = require('express-validator');
const rateLimit = require('express-rate-limit');

/**
 * AI-Generated RESTful API Example
 * Demonstrates CRUD operations with proper validation, error handling, and best practices
 */
const router = express.Router();

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP',
    retryAfter: '15 minutes'
  }
});

// More restrictive limit for create/update operations
const createLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    error: 'Too many creation requests',
    retryAfter: '15 minutes'
  }
});

/**
 * @route   GET /api/users
 * @desc    Get all users with pagination, filtering, and sorting
 * @access  Public
 */
router.get('/users', apiLimiter, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      search = '',
      isActive = null,
      role = null
    } = req.query;

    // Build query
    const query = {};
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by status
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    // Execute query with pagination
    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password') // Exclude password
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      User.countDocuments(query)
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages,
          hasNextPage,
          hasPrevPage,
          nextPage: hasNextPage ? parseInt(page) + 1 : null,
          prevPage: hasPrevPage ? parseInt(page) - 1 : null
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users'
    });
  }
});

/**
 * @route   GET /api/users/:id
 * @desc    Get single user by ID
 * @access  Public
 */
router.get('/users/:id', apiLimiter, [
  param('id').isMongoId().withMessage('Invalid user ID format')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const user = await User.findById(req.params.id).select('-password').lean();
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user'
    });
  }
});

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Private (Admin)
 */
router.post('/users', 
  createLimiter,
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain uppercase, lowercase, and numbers'),
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    body('role')
      .optional()
      .isIn(['user', 'admin', 'moderator'])
      .withMessage('Role must be one of: user, admin, moderator'),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be a boolean value')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map(error => ({
            field: error.param,
            message: error.msg
          }))
        });
      }

      const { email, password, name, role = 'user', isActive = true } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name.trim(),
        role,
        isActive,
        createdAt: new Date()
      });

      await user.save();

      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: { user: userResponse }
      });

    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create user'
      });
    }
  }
);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user by ID
 * @access  Private (Admin or User themselves)
 */
router.put('/users/:id',
  apiLimiter,
  [
    param('id').isMongoId().withMessage('Invalid user ID format'),
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    body('role')
      .optional()
      .isIn(['user', 'admin', 'moderator'])
      .withMessage('Role must be one of: user, admin, moderator'),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive must be a boolean value')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const updates = req.body;

      // Find user
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if email is being updated and if it already exists
      if (updates.email && updates.email !== user.email) {
        const existingUser = await User.findOne({ 
          email: updates.email.toLowerCase(),
          _id: { $ne: id }
        });
        
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: 'Another user with this email already exists'
          });
        }
      }

      // Update user fields
      Object.keys(updates).forEach(key => {
        if (updates[key] !== undefined) {
          user[key] = updates[key];
        }
      });

      user.updatedAt = new Date();
      await user.save();

      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.json({
        success: true,
        message: 'User updated successfully',
        data: { user: userResponse }
      });

    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update user'
      });
    }
  }
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID (soft delete)
 * @access  Private (Admin)
 */
router.delete('/users/:id',
  [
    param('id').isMongoId().withMessage('Invalid user ID format')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { id } = req.params;

      // Find user
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Soft delete (set isActive to false)
      user.isActive = false;
      user.deletedAt = new Date();
      await user.save();

      res.json({
        success: true,
        message: 'User deleted successfully'
      });

    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete user'
      });
    }
  }
);

/**
 * @route   GET /api/users/export
 * @desc    Export users data as CSV
 * @access  Private (Admin)
 */
router.get('/users/export', async (req, res) => {
  try {
    const { format = 'csv' } = req.query;
    
    const users = await User.find({ isActive: true })
      .select('name email role isActive createdAt')
      .sort({ createdAt: -1 })
      .lean();

    if (format === 'csv') {
      const csv = users.map(user => 
        `"${user.name}","${user.email}","${user.role}","${user.isActive}","${user.createdAt}"`
      ).join('\n');
      
      const headers = '"Name","Email","Role","Active","Created At"\n';
      const csvContent = headers + csv;
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
      res.send(csvContent);
    } else {
      res.json({
        success: true,
        data: { users }
      });
    }

  } catch (error) {
    console.error('Export users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export users'
    });
  }
});

/**
 * @route   GET /api/stats
 * @desc    Get user statistics
 * @access  Private (Admin)
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $facet: {
          totalUsers: [
            { $count: 'count' }
          ],
          activeUsers: [
            { $match: { isActive: true } },
            { $count: 'count' }
          ],
          usersByRole: [
            { $group: { _id: '$role', count: { $sum: 1 } } }
          ],
          usersByMonth: [
            {
              $group: {
                _id: {
                  year: { $year: '$createdAt' },
                  month: { $month: '$createdAt' }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } }
          ]
        }
      }
    ]);

    const [result] = stats;

    res.json({
      success: true,
      data: {
        totalUsers: result.totalUsers[0]?.count || 0,
        activeUsers: result.activeUsers[0]?.count || 0,
        usersByRole: result.usersByRole,
        usersByMonth: result.usersByMonth
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics'
    });
  }
});

module.exports = router;