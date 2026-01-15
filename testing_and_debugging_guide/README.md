# Testing and Debugging Guide for Vibe Coding

## Overview
Testing and debugging are critical components of AI-assisted development. This guide covers strategies for leveraging AI tools to create robust test suites, identify and fix bugs efficiently, and maintain code quality throughout the development process.

## 🚀 Quick Start Testing Checklist

- [ ] Set up automated testing framework
- [ ] Create unit tests for all functions
- [ ] Implement integration tests
- [ ] Add end-to-end tests for critical workflows
- [ ] Configure continuous testing
- [ ] Set up error monitoring
- [ ] Create debugging workflows

## 1. AI-Assisted Testing Strategies

### Testing Pyramid with AI

#### Unit Tests (Base - 70%)
```javascript
// Example: AI-Generated Unit Test
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securePassword123'
      };
      
      const user = await UserService.createUser(userData);
      
      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password); // Should be hashed
    });

    it('should throw error for invalid email', async () => {
      const invalidData = { email: 'invalid-email', name: 'Test' };
      
      await expect(UserService.createUser(invalidData))
        .rejects.toThrow('Invalid email format');
    });

    it('should handle database errors gracefully', async () => {
      // Mock database failure
      jest.spyOn(database, 'query').mockRejectedValue(new Error('DB Connection failed'));
      
      await expect(UserService.createUser(validData))
        .rejects.toThrow('Failed to create user');
    });
  });
});
```

#### Integration Tests (Middle - 20%)
```javascript
// Example: AI-Generated Integration Test
describe('API Integration Tests', () => {
  let app;
  let authToken;

  beforeAll(async () => {
    app = await createTestApp();
    authToken = await generateTestAuthToken();
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'newuser@example.com',
          name: 'New User',
          password: 'securePassword123'
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe('newuser@example.com');
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ email: 'invalid' });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });
});
```

#### End-to-End Tests (Top - 10%)
```javascript
// Example: AI-Generated E2E Test
describe('User Registration Flow', () => {
  it('should complete full registration process', async () => {
    // Visit registration page
    await page.goto('http://localhost:3000/register');
    
    // Fill registration form
    await page.type('#email', 'testuser@example.com');
    await page.type('#name', 'Test User');
    await page.type('#password', 'securePassword123');
    await page.type('#confirmPassword', 'securePassword123');
    
    // Submit form
    await page.click('#submit-button');
    
    // Wait for success page
    await page.waitForSelector('.success-message');
    
    // Verify email was sent
    const email = await getLastEmail('testuser@example.com');
    expect(email.subject).toContain('Welcome');
    
    // Verify user can login
    await page.goto('http://localhost:3000/login');
    await page.type('#email', 'testuser@example.com');
    await page.type('#password', 'securePassword123');
    await page.click('#login-button');
    
    // Verify dashboard loads
    await page.waitForSelector('.dashboard');
    expect(page.url()).toContain('/dashboard');
  });
});
```

### AI Test Generation Prompts

#### Unit Test Generation
```markdown
Generate comprehensive unit tests for this function:

FUNCTION TO TEST:
```javascript
const calculateDiscount = (price, discountPercentage, userType) => {
  if (price <= 0) throw new Error('Price must be positive');
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0-100');
  }
  
  let finalDiscount = discountPercentage;
  
  // VIP users get additional 10% discount
  if (userType === 'vip') {
    finalDiscount = Math.min(discountPercentage + 10, 100);
  }
  
  return price * (1 - finalDiscount / 100);
};
```

TEST REQUIREMENTS:
- Test all normal cases
- Test all edge cases
- Test error conditions
- Mock external dependencies
- Achieve 100% code coverage
- Use Jest testing framework
- Follow AAA pattern (Arrange, Act, Assert)

Include setup and teardown if needed.
```

#### Integration Test Generation
```markdown
Generate integration tests for this API endpoint:

ENDPOINT: POST /api/orders

REQUEST BODY:
{
  "userId": "string",
  "items": [
    {
      "productId": "string",
      "quantity": "number",
      "price": "number"
    }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "zipCode": "string",
    "country": "string"
  }
}

BUSINESS LOGIC:
- Validate all required fields
- Check product availability
- Calculate total price
- Apply discounts if applicable
- Create order record
- Send confirmation email
- Update inventory

TEST SCENARIOS:
- Successful order creation
- Invalid product ID
- Insufficient inventory
- Invalid shipping address
- User not found
- Unauthorized access
- Database connection failure

Use Jest and Supertest for testing.
```

## 2. Test-Driven Development with AI

### Red-Green-Refactor Cycle with AI

#### Step 1: Write Failing Test (Red)
```javascript
// Before implementing the feature
describe('User Authentication', () => {
  it('should authenticate user with valid credentials', async () => {
    const result = await authService.login('user@example.com', 'password123');
    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
  });
});
```

#### Step 2: Implement Minimum Code (Green)
```javascript
// AI generates minimal implementation
class AuthService {
  async login(email, password) {
    // Minimal implementation to pass test
    return {
      token: 'mock-token',
      user: { email, id: '1' }
    };
  }
}
```

#### Step 3: Refactor (AI-Assisted)
```javascript
// AI helps refactor to production code
class AuthService {
  async login(email, password) {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }
}
```

### AI Prompt for TDD Cycle
```markdown
I'm practicing Test-Driven Development. I've written this failing test:

[TEST CODE]

Please help me:
1. Write the minimal code to make this test pass
2. Then refactor it to be production-ready
3. Add any additional tests that would improve coverage
4. Include proper error handling

The implementation should:
- Follow SOLID principles
- Include proper TypeScript types
- Handle edge cases
- Be well-documented
```

## 3. Debugging with AI Assistance

### Systematic Debugging Process

#### Step 1: Error Analysis
```markdown
Analyze this error message and provide:
1. Possible causes
2. Debugging steps
3. Prevention strategies

ERROR MESSAGE:
"TypeError: Cannot read property 'map' of undefined"
STACK TRACE:
[Stack trace here]

CODE CONTEXT:
```javascript
const processUserData = (users) => {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
};
```

EXPECTED BEHAVIOR:
- Function should process array of user objects
- Should return array of processed user data
- Should handle empty arrays gracefully
```

#### Step 2: Root Cause Investigation
```javascript
// AI-suggested debugging code
const processUserData = (users) => {
  console.log('Input users:', users);
  console.log('Type of users:', typeof users);
  console.log('Is array:', Array.isArray(users));
  
  if (!users) {
    console.error('Users is null or undefined');
    return [];
  }
  
  if (!Array.isArray(users)) {
    console.error('Users is not an array:', users);
    return [];
  }
  
  return users.map((user, index) => {
    console.log(`Processing user at index ${index}:`, user);
    
    if (!user || typeof user !== 'object') {
      console.error(`Invalid user at index ${index}:`, user);
      return null;
    }
    
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }).filter(Boolean); // Remove null entries
};
```

#### Step 3: Solution Implementation
```javascript
// Production-ready solution
const processUserData = (users) => {
  // Input validation
  if (!users || !Array.isArray(users)) {
    console.warn('processUserData expects an array, received:', typeof users);
    return [];
  }
  
  return users
    .filter(user => user && typeof user === 'object')
    .map(user => ({
      id: user.id || generateId(),
      name: user.name || 'Unknown User',
      email: user.email || 'no-email@example.com'
    }));
};
```

### Common Debugging Scenarios

#### Scenario 1: Async/Await Issues
```markdown
Debug this async code that's not working as expected:

PROBLEM CODE:
```javascript
const fetchUserData = async (userId) => {
  const user = await getUser(userId);
  const posts = await getUserPosts(user.id);
  const comments = await getPostComments(posts.map(p => p.id));
  
  return { user, posts, comments };
};
```

ERROR:
"Cannot read property 'map' of undefined"

EXPECTED:
Should fetch user, their posts, and comments on those posts.

Provide:
1. Analysis of what's wrong
2. Fixed code with proper error handling
3. Improved version with better practices
```

#### Scenario 2: Memory Leaks
```markdown
Investigate this code for potential memory leaks:

CODE:
```javascript
class EventManager {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}
```

USAGE:
```javascript
const manager = new EventManager();
manager.on('userAction', handleUserAction);
// Later...
manager.off('userAction', handleUserAction);
```

Identify:
1. Potential memory leak sources
2. Proper cleanup strategies
3. Best practices for event management
```

## 4. Error Monitoring and Logging

### Comprehensive Error Handling
```javascript
// Global error handler
class ErrorManager {
  constructor() {
    this.errors = [];
    this.setupGlobalHandlers();
  }
  
  setupGlobalHandlers() {
    // Client-side
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.handleError({
          message: event.message,
          source: event.filename,
          line: event.lineno,
          column: event.colno,
          error: event.error,
          timestamp: new Date().toISOString()
        });
      });
      
      window.addEventListener('unhandledrejection', (event) => {
        this.handleError({
          message: 'Unhandled Promise Rejection',
          error: event.reason,
          timestamp: new Date().toISOString()
        });
      });
    }
    
    // Node.js
    if (typeof process !== 'undefined') {
      process.on('uncaughtException', (error) => {
        this.handleError({
          message: 'Uncaught Exception',
          error: error,
          timestamp: new Date().toISOString()
        });
        process.exit(1);
      });
      
      process.on('unhandledRejection', (reason, promise) => {
        this.handleError({
          message: 'Unhandled Rejection',
          error: reason,
          timestamp: new Date().toISOString()
        });
      });
    }
  }
  
  handleError(errorInfo) {
    const error = {
      id: generateErrorId(),
      ...errorInfo,
      userAgent: navigator?.userAgent,
      url: window?.location?.href,
      stack: errorInfo.error?.stack
    };
    
    this.errors.push(error);
    console.error('Error captured:', error);
    
    // Send to monitoring service
    this.sendToMonitoring(error);
  }
  
  sendToMonitoring(error) {
    // Send to services like Sentry, LogRocket, etc.
    if (window.Sentry) {
      window.Sentry.captureException(error.error);
    }
    
    // Send to custom logging endpoint
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(error)
    }).catch(console.error);
  }
}
```

### Structured Logging
```javascript
// Advanced logging system
class Logger {
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.logLevel = process.env.LOG_LEVEL || 'info';
  }
  
  formatMessage(level, message, meta = {}) {
    return {
      timestamp: new Date().toISOString(),
      level,
      service: this.serviceName,
      message,
      meta: {
        ...meta,
        pid: process.pid,
        hostname: os.hostname()
      }
    };
  }
  
  info(message, meta) {
    if (this.shouldLog('info')) {
      console.log(JSON.stringify(this.formatMessage('info', message, meta)));
    }
  }
  
  error(message, meta) {
    if (this.shouldLog('error')) {
      console.error(JSON.stringify(this.formatMessage('error', message, meta)));
    }
  }
  
  debug(message, meta) {
    if (this.shouldLog('debug')) {
      console.debug(JSON.stringify(this.formatMessage('debug', message, meta)));
    }
  }
  
  shouldLog(level) {
    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    return levels[level] <= levels[this.logLevel];
  }
}
```

## 5. Performance Testing

### Load Testing with AI
```javascript
// Performance test generator
describe('Performance Tests', () => {
  it('should handle 1000 concurrent requests', async () => {
    const startTime = Date.now();
    const requests = [];
    
    // Generate 1000 concurrent requests
    for (let i = 0; i < 1000; i++) {
      requests.push(
        request(app)
          .get('/api/users')
          .expect(200)
      );
    }
    
    await Promise.all(requests);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Should complete within reasonable time
    expect(duration).toBeLessThan(5000); // 5 seconds
  });
  
  it('should maintain response time under load', async () => {
    const responseTimes = [];
    
    for (let i = 0; i < 100; i++) {
      const startTime = Date.now();
      
      await request(app)
        .get('/api/products')
        .expect(200);
      
      const responseTime = Date.now() - startTime;
      responseTimes.push(responseTime);
    }
    
    const averageResponseTime = responseTimes.reduce((a, b) => a + b) / responseTimes.length;
    expect(averageResponseTime).toBeLessThan(200); // 200ms average
  });
});
```

## 6. Continuous Testing

### Automated Testing Pipeline
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run unit tests
      run: npm run test:unit
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Generate coverage report
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v2
```

## Next Steps

Now that you have comprehensive testing and debugging strategies:
1. Implement the testing strategies in your current project
2. Set up automated testing pipelines
3. Learn version control and deployment best practices
4. Create monitoring and alerting systems

Remember: Testing is not just about finding bugs—it's about preventing them and ensuring your AI-assisted code meets production standards.