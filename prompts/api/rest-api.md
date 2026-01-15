# API Development Prompts

## RESTful API Templates

### CRUD API with Validation
```markdown
Create a complete RESTful API for [RESOURCE_NAME] with:

FRAMEWORK: Express.js with TypeScript
VALIDATION: express-validator
DATABASE: MongoDB with Mongoose
AUTHENTICATION: JWT

MODEL DEFINITION:
```typescript
interface [Resource] {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
```

ENDPOINTS:
1. GET /api/[resources] - List with pagination, filtering, sorting
2. GET /api/[resources]/:id - Get single resource
3. POST /api/[resources] - Create new resource
4. PUT /api/[resources]/:id - Update resource
5. DELETE /api/[resources]/:id - Soft delete resource

FEATURES:
- Pagination with cursor-based or offset
- Filtering by multiple fields
- Sorting by any field
- Search functionality
- Field selection
- Population of related data

VALIDATION RULES:
- Required fields: [REQUIRED_FIELDS]
- Field types and formats
- Length constraints
- Unique field validation
- Business logic validation

SECURITY:
- Authentication required for all write operations
- Authorization based on user roles
- Rate limiting per endpoint
- Input sanitization
- SQL injection prevention

OUTPUT:
1. Complete controller file
2. Route definitions
3. Validation middleware
4. Database model
5. Error handling
6. Unit tests
7. API documentation
8. Postman collection
```

### Authentication API
```markdown
Create a comprehensive authentication API:

FRAMEWORK: Express.js with TypeScript
DATABASE: PostgreSQL with TypeORM
AUTHENTICATION: JWT with refresh tokens
SESSION: Redis for token blacklisting

ENDPOINTS:
1. POST /api/auth/register - User registration
2. POST /api/auth/login - User login
3. POST /api/auth/refresh - Token refresh
4. POST /api/auth/logout - User logout
5. POST /api/auth/forgot-password - Password reset request
6. POST /auth/reset-password/:token - Password reset
7. GET /api/auth/verify-email/:token - Email verification
8. GET /api/auth/me - Get current user

FEATURES:
- Email verification
- Password reset via email
- Account lockout after failed attempts
- Rate limiting per endpoint
- Session management
- Token blacklisting
- Multi-factor authentication (optional)

SECURITY MEASURES:
- Password hashing with bcrypt
- JWT token signing and verification
- CSRF protection
- Input validation and sanitization
- Rate limiting
- Account lockout
- Secure headers

VALIDATION:
- Email format validation
- Password strength requirements
- Rate limiting per IP
- CAPTCHA for repeated failures

OUTPUT:
1. Authentication controller
2. JWT utility functions
3. Email service
4. Rate limiting middleware
5. Validation middleware
6. User model
7. Security middleware
8. Unit tests
9. Documentation
```

### File Upload API
```markdown
Create a file upload API with:

FRAMEWORK: Express.js with TypeScript
STORAGE: AWS S3 or local storage
PROCESSING: Sharp for image processing
VALIDATION: Multer for file handling

ENDPOINTS:
1. POST /api/upload/single - Single file upload
2. POST /api/upload/multiple - Multiple file upload
3. GET /api/files/:id - Get file metadata
4. DELETE /api/files/:id - Delete file
5. GET /api/files/download/:id - Download file

FILE TYPES SUPPORTED:
- Images: JPG, PNG, GIF, WEBP
- Documents: PDF, DOC, DOCX
- Videos: MP4, AVI, MOV
- Audio: MP3, WAV, FLAC

FEATURES:
- File type validation
- Size limits per file type
- Image resizing and optimization
- Thumbnail generation
- File compression
- Virus scanning (optional)
- CDN integration

VALIDATION:
- File type whitelist
- File size limits
- MIME type verification
- Filename sanitization
- Duplicate file detection

SECURITY:
- File type validation
- Size limits
- Virus scanning
- Secure file naming
- Access control
- Rate limiting

PROCESSING:
- Image resizing (multiple sizes)
- Format conversion
- Quality optimization
- Metadata removal
- Watermarking (optional)

OUTPUT:
1. Upload controller
2. File processing utilities
3. Storage service
4. Validation middleware
5. Security checks
6. Image processing
7. Unit tests
8. Documentation
```

### Real-time API with WebSockets
```markdown
Create a real-time API using WebSockets:

FRAMEWORK: Express.js with Socket.io
AUTHENTICATION: JWT for socket connections
DATABASE: Redis for pub/sub

WEBSOCKET EVENTS:
1. connection - User connection
2. disconnect - User disconnection
3. join-room - Join chat room
4. leave-room - Leave chat room
5. send-message - Send chat message
6. typing - User typing indicator
7. notification - Real-time notifications

FEATURES:
- Real-time messaging
- Presence detection
- Typing indicators
- Message history
- User status (online/offline)
- Room-based communication
- Private messaging
- Message encryption (optional)

SCALABILITY:
- Redis adapter for multiple servers
- Room-based scaling
- Message queuing
- Connection pooling

SECURITY:
- JWT authentication
- Rate limiting per user
- Message validation
- XSS prevention
- Connection limits

OUTPUT:
1. Socket.io server setup
2. Event handlers
3. Authentication middleware
4. Redis integration
5. Message handling
6. User presence
7. Scalability setup
8. Unit tests
9. Documentation
```

## GraphQL API Templates

### GraphQL Schema and Resolvers
```markdown
Create a GraphQL API with:

FRAMEWORK: Apollo Server with TypeScript
DATABASE: MongoDB with Mongoose
AUTHENTICATION: JWT

SCHEMA DEFINITION:
```graphql
type User {
  id: ID!
  email: String!
  name: String!
  role: Role!
  isActive: Boolean!
  createdAt: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
  createdAt: String!
}

type Query {
  users(limit: Int, offset: Int): [User!]!
  user(id: ID!): User
  posts(limit: Int, offset: Int, authorId: ID): [Post!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
  
  createPost(input: CreatePostInput!): Post!
  updatePost(id: ID!, input: UpdatePostInput!): Post!
  deletePost(id: ID!): Boolean!
}
```

FEATURES:
- Type-safe resolvers
- DataLoader for N+1 queries
- Authentication and authorization
- Input validation
- Error handling
- Subscriptions (optional)

OUTPUT:
1. GraphQL schema
2. Type definitions
3. Resolvers
4. DataLoader setup
5. Authentication
6. Validation
7. Unit tests
8. Documentation
```

## Microservices API Templates

### API Gateway Pattern
```markdown
Create an API Gateway for microservices:

FRAMEWORK: Express.js with TypeScript
GATEWAY: Express-gateway or custom implementation
SERVICES: Multiple microservices

FEATURES:
- Request routing
- Load balancing
- Rate limiting
- Authentication/authorization
- Request/response transformation
- Circuit breaker pattern
- Service discovery
- Monitoring and logging

ROUTING:
- /api/users -> User service
- /api/products -> Product service
- /api/orders -> Order service
- /api/notifications -> Notification service

MIDDLEWARE:
- Authentication
- Rate limiting
- Request logging
- Error handling
- CORS handling
- Request validation

OUTPUT:
1. Gateway configuration
2. Route definitions
n3. Middleware setup
4. Service registry
5. Load balancing
6. Circuit breaker
7. Monitoring
8. Documentation
```

## API Documentation Templates

### OpenAPI/Swagger Documentation
```markdown
Create comprehensive API documentation:

SPECIFICATION: OpenAPI 3.0
TOOL: Swagger UI or ReDoc

DOCUMENTATION REQUIREMENTS:
- All endpoints documented
- Request/response examples
- Authentication schemes
- Error responses
- Rate limiting info
- Version information

STRUCTURE:
```yaml
openapi: 3.0.0
info:
  title: API Name
  version: 1.0.0
  description: API description
servers:
  - url: https://api.example.com/v1
paths:
  /users:
    get:
      summary: Get all users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsersResponse'
```

OUTPUT:
1. OpenAPI specification
2. Swagger UI setup
3. Request/response examples
4. Authentication docs
5. Error code documentation
6. Getting started guide
```