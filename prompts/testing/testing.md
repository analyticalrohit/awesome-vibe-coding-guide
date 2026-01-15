# Testing and Debugging Prompts

## Unit Testing Templates

### React Component Testing
```markdown
Generate comprehensive unit tests for this React component:

COMPONENT CODE:
```jsx
[COMPONENT_CODE]
```

TESTING FRAMEWORK:
- Testing Library: React Testing Library
- Test Runner: Jest
- Mocking: Jest mocks
- Coverage: Istanbul

TEST REQUIREMENTS:
- Achieve 100% code coverage
- Test all user interactions
- Test edge cases and error states
- Test accessibility features
- Test responsive behavior

TEST SCENARIOS:
1. Component renders without crashing
2. Props are handled correctly
3. User interactions work as expected
4. Error states are handled
5. Loading states display correctly
6. Accessibility features work
7. Edge cases are covered

MOCK STRATEGY:
- External API calls: Mock service responses
- Child components: Mock with test doubles
- Custom hooks: Mock return values
- Event handlers: Mock functions
- Timers: Use fake timers

OUTPUT:
1. Complete test suite
2. Test utilities and helpers
3. Mock implementations
4. Coverage configuration
5. Documentation

EXAMPLE TEST:
```javascript
describe('UserComponent', () => {
  it('renders user information correctly', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    render(<UserComponent user={user} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const handleClick = jest.fn();
    render(<UserComponent onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```
```

### API Testing
```markdown
Generate comprehensive tests for this API endpoint:

API CODE:
```javascript
[API_CODE]
```

TEST FRAMEWORK:
- Testing: Jest + Supertest
- Database: MongoDB Memory Server
- Mocking: Jest mocks
- Coverage: nyc

TEST SCENARIOS:
1. Successful requests
2. Validation errors
3. Authentication errors
4. Authorization errors
5. Database errors
6. Rate limiting
7. Edge cases

MOCK STRATEGY:
- Database: Use in-memory database
- External services: Mock API calls
- Authentication: Mock JWT verification
- File system: Mock file operations

OUTPUT:
1. Complete test suite
2. Test database setup
3. Mock implementations
4. Test utilities
5. Coverage report

EXAMPLE TEST:
```javascript
describe('POST /api/users', () => {
  it('creates user successfully', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'SecurePass123',
      name: 'Test User'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe(userData.email);
  });

  it('returns validation error for invalid email', async () => {
    const invalidData = {
      email: 'invalid-email',
      password: '123',
      name: ''
    };

    const response = await request(app)
      .post('/api/users')
      .send(invalidData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.errors).toHaveLength(3);
  });
});
```
```

## Integration Testing Templates

### Full Application Testing
```markdown
Create integration tests for this application:

APPLICATION CODE:
```javascript
[APPLICATION_CODE]
```

TEST FRAMEWORK:
- Testing: Jest
- HTTP: Supertest
- Database: Test database
- Browser: Puppeteer (for E2E)

TEST SCENARIOS:
1. User registration flow
2. User login flow
3. CRUD operations
4. File upload/download
5. Email notifications
6. Payment processing
7. Error handling

TEST ENVIRONMENT:
- Separate test database
- Test email service
- Mock payment gateway
- Test file storage

OUTPUT:
1. Integration test suite
2. Test environment setup
3. Database seeding
4. Test utilities
5. Documentation

EXAMPLE TEST:
```javascript
describe('User Registration Flow', () => {
  beforeEach(async () => {
    await clearDatabase();
    await seedTestData();
  });

  it('completes full registration process', async () => {
    // Step 1: Register user
    const registrationResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'newuser@example.com',
        password: 'SecurePass123',
        name: 'New User'
      })
      .expect(201);

    // Step 2: Verify email
    const emailToken = await getEmailVerificationToken('newuser@example.com');
    await request(app)
      .get(`/api/auth/verify-email/${emailToken}`)
      .expect(200);

    // Step 3: Login
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'newuser@example.com',
        password: 'SecurePass123'
      })
      .expect(200);

    expect(loginResponse.body.data.user.isEmailVerified).toBe(true);
  });
});
```
```

## End-to-End Testing Templates

### User Journey Testing
```markdown
Create E2E tests for user journeys:

APPLICATION: Web application URL
FRAMEWORK: Cypress or Playwright

USER JOURNEYS:
1. Registration and onboarding
2. Login and dashboard navigation
3. Product browsing and search
4. Shopping cart and checkout
5. Payment processing
6. Order history and tracking
7. Profile management
8. Password reset

TEST ENVIRONMENT:
- Staging environment
- Test user accounts
- Test payment methods
- Test email addresses

TEST DATA:
- User credentials
- Product data
- Address information
- Payment details

OUTPUT:
1. E2E test suite
2. Page object models
3. Test data management
4. Environment configuration
5. CI/CD integration
6. Documentation

EXAMPLE TEST:
```javascript
describe('E-commerce User Journey', () => {
  it('completes full purchase process', () => {
    // Visit homepage
    cy.visit('https://staging.example.com');
    
    // Search for product
    cy.get('[data-testid="search-input"]').type('laptop');
    cy.get('[data-testid="search-button"]').click();
    
    // Select product
    cy.get('[data-testid="product-card"]').first().click();
    
    // Add to cart
    cy.get('[data-testid="add-to-cart"]').click();
    
    // Go to cart
    cy.get('[data-testid="cart-icon"]').click();
    
    // Proceed to checkout
    cy.get('[data-testid="checkout-button"]').click();
    
    // Fill shipping information
    cy.get('[data-testid="shipping-form"]').within(() => {
      cy.get('[name="firstName"]').type('John');
      cy.get('[name="lastName"]').type('Doe');
      // ... fill other fields
    });
    
    // Complete purchase
    cy.get('[data-testid="place-order"]').click();
    
    // Verify order confirmation
    cy.get('[data-testid="order-confirmation"]').should('be.visible');
    cy.get('[data-testid="order-number"]').should('contain', 'ORD-');
  });
});
```
```

## Performance Testing Templates

### Load Testing
```markdown
Create performance tests for this API:

API CODE:
```javascript
[API_CODE]
```

TESTING TOOL: k6 or Artillery

PERFORMANCE CRITERIA:
- Response time: < 200ms for 95th percentile
- Throughput: 1000 requests per second
- Error rate: < 1%
- Concurrent users: 1000

TEST SCENARIOS:
1. Load test with increasing users
2. Stress test to find breaking point
3. Spike test with sudden load increase
4. Endurance test over extended period
5. Scalability test with multiple instances

METRICS TO MEASURE:
- Response times (avg, p95, p99)
- Throughput (requests/sec)
- Error rate
- Resource utilization (CPU, memory)
- Database performance

OUTPUT:
1. Performance test scripts
2. Test configuration
3. Results analysis
4. Performance report
5. Optimization recommendations

EXAMPLE TEST:
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 },
    { duration: '5m', target: 300 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<200', 'p(99)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const response = http.get('https://api.example.com/users');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  
  sleep(1);
}
```
```

## Debugging Templates

### Error Analysis
```markdown
Help me debug this error:

ERROR MESSAGE:
```
[ERROR_MESSAGE]
```

STACK TRACE:
```
[STACK_TRACE]
```

CODE CONTEXT:
```javascript
[CODE_CONTEXT]
```

ENVIRONMENT:
- Node.js version: [NODE_VERSION]
- Framework: [FRAMEWORK]
- Database: [DATABASE]
- OS: [OPERATING_SYSTEM]

STEPS TO REPRODUCE:
1. [STEP_1]
2. [STEP_2]
3. [STEP_3]

WHAT I'VE TRIED:
- [ATTEMPT_1]
- [ATTEMPT_2]
- [ATTEMPT_3]

Provide:
1. Root cause analysis
2. Step-by-step debugging approach
3. Code fixes
4. Prevention strategies
5. Testing recommendations
```

### Performance Debugging
```markdown
Help me debug this performance issue:

APPLICATION: [APPLICATION_TYPE]
ISSUE: [PERFORMANCE_ISSUE]

METRICS:
- Response time: [RESPONSE_TIME]
- CPU usage: [CPU_USAGE]
- Memory usage: [MEMORY_USAGE]
- Database queries: [QUERY_COUNT]

CODE PROFILING:
```javascript
[PROFILING_RESULTS]
```

ENVIRONMENT:
- Server specs: [SERVER_SPECS]
- Database: [DATABASE_INFO]
- Load: [LOAD_INFORMATION]

Provide:
1. Performance bottleneck identification
2. Optimization strategies
3. Code improvements
4. Database optimization
5. Caching strategies
6. Monitoring recommendations
```

## Security Testing Templates

### Security Audit
```markdown
Create security tests for this application:

APPLICATION: [APPLICATION_TYPE]
TECHNOLOGY: [TECH_STACK]

SECURITY AREAS TO TEST:
1. Authentication and authorization
2. Input validation
3. SQL injection prevention
4. XSS protection
5. CSRF protection
6. Rate limiting
7. Data encryption
8. API security

TESTING TOOLS:
- OWASP ZAP
- Burp Suite
- SQLMap
- Custom security tests

OUTPUT:
1. Security test suite
2. Vulnerability assessment
3. Security recommendations
4. Remediation steps
5. Security monitoring
6. Documentation

EXAMPLE SECURITY TEST:
```javascript
describe('Security Tests', () => {
  it('prevents SQL injection attacks', async () => {
    const maliciousInput = "' OR '1'='1";
    
    const response = await request(app)
      .post('/api/users')
      .send({
        email: maliciousInput,
        password: 'password123',
        name: 'Test User'
      })
      .expect(400);
    
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
  });

  it('prevents XSS attacks', async () => {
    const xssPayload = '<script>alert("XSS")</script>';
    
    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Post',
        content: xssPayload
      })
      .expect(201);
    
    // Verify content is sanitized
    const post = await Post.findById(response.body.data.id);
    expect(post.content).not.toContain('<script>');
  });
});
```
```