# Version Control and Deployment Guide for Vibe Coding

## Overview

Effective version control and deployment strategies are crucial for AI-assisted development. This guide covers Git workflows optimized for AI collaboration, automated deployment pipelines, environment management, and best practices for maintaining code quality while moving fast with AI assistance.

## 🚀 Quick Start Checklist

- [ ] Set up Git repository with proper branching strategy
- [ ] Configure automated testing in CI/CD pipeline
- [ ] Set up staging and production environments
- [ ] Configure deployment automation
- [ ] Set up monitoring and rollback procedures
- [ ] Implement proper secret management
- [ ] Configure code quality checks

## 1. Git Workflows with AI Assistance

### Branching Strategies for Vibe Coding

#### Feature Branch Workflow
```bash
# Create feature branch from main/develop
git checkout -b feature/ai-generated-authentication

# Make AI-assisted changes
# AI generates code, tests, and documentation

# Commit with AI-generated messages
git add .
git commit -m "feat(auth): implement user authentication system

- Add JWT-based authentication
- Implement login/logout functionality
- Add password reset feature
- Include comprehensive error handling
- Add unit tests for all auth functions

Closes #123"

# Push and create pull request
git push origin feature/ai-generated-authentication
```

#### AI-Optimized Commit Messages
```markdown
# Prompt for AI-generated commit messages
"Generate a conventional commit message for these changes:

FILES CHANGED:
- src/components/UserProfile.tsx
- src/services/userService.ts
- tests/userProfile.test.tsx

CHANGES:
- Added user profile editing functionality
- Implemented image upload for avatars
- Added form validation
- Updated tests

CONTEXT:
- Using React with TypeScript
- Project follows conventional commits
- Include appropriate emoji and formatting"
```

#### Commit Message Templates
```bash
# feat: new feature implementation
# fix: bug fix
# docs: documentation changes
# style: formatting changes
# refactor: code restructuring
# test: adding or modifying tests
# chore: maintenance tasks

# Example AI-generated commit
git commit -m "feat(user-profile): ✨ add comprehensive user profile management

🎯 Implement complete user profile functionality:
  • Add profile editing with real-time validation
  • Implement avatar image upload with compression
  • Add profile visibility settings
  • Include social media link integration

🔧 Technical improvements:
  • Optimize image upload with client-side compression
  • Implement debounced form validation
  • Add proper TypeScript types
  • Include comprehensive error handling

✅ Testing:
  • Add unit tests for profile service
  • Add integration tests for avatar upload
  • Test edge cases for form validation
  • Achieve 95% code coverage

📝 Documentation:
  • Update API documentation
  • Add JSDoc comments
  • Update README with profile features

Relates to: #234, #235
Closes: #236"
```

### AI-Assisted Code Review Process

#### Automated Code Review Checklist
```markdown
# AI Code Review Prompt
"Review this pull request and provide feedback on:

## Code Quality
- [ ] Code follows project conventions and style guide
- [ ] Functions are focused and single-purpose
- [ ] Variable and function names are descriptive
- [ ] Complex logic is well-documented

## Performance
- [ ] No unnecessary database queries
- [ ] Efficient algorithms used
- [ ] Proper use of caching
- [ ] No memory leaks or performance bottlenecks

## Security
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] Authentication/authorization checks

## Testing
- [ ] Unit tests cover all new functions
- [ ] Integration tests for API endpoints
- [ ] Edge cases are tested
- [ ] Test coverage meets requirements

## Documentation
- [ ] Code is well-commented
- [ ] API documentation updated
- [ ] README updated if needed
- [ ] JSDoc comments added"
```

#### Git Hooks for Quality Assurance
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🔍 Running pre-commit checks..."

# Run linter
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix linting errors."
    exit 1
fi

# Run type checking
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Type checking failed. Please fix type errors."
    exit 1
fi

# Run unit tests
npm run test:unit
if [ $? -ne 0 ]; then
    echo "❌ Unit tests failed. Please fix failing tests."
    exit 1
fi

echo "✅ Pre-commit checks passed!"
```

## 2. Automated Deployment Strategies

### Continuous Integration/Continuous Deployment (CI/CD)

#### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Build, Test, and Deploy

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

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
        ports:
          - 5432:5432
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run type checking
      run: npm run type-check
    
    - name: Run unit tests
      run: npm run test:unit
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
        JWT_SECRET: test-secret
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Generate test coverage
      run: npm run test:coverage
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      if: success()

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Deploy to staging
      env:
        DEPLOY_KEY: ${{ secrets.STAGING_DEPLOY_KEY }}
        API_ENDPOINT: ${{ secrets.STAGING_API_ENDPOINT }}
      run: |
        echo "🚀 Deploying to staging environment..."
        # Add your deployment commands here
        # Example: rsync, docker, or platform-specific commands
        curl -X POST "$API_ENDPOINT/deploy" \
          -H "Authorization: Bearer $DEPLOY_KEY" \
          -H "Content-Type: application/json" \
          -d '{"branch": "develop", "environment": "staging"}'
        echo "✅ Staging deployment completed!"

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Deploy to production
      env:
        DEPLOY_KEY: ${{ secrets.PRODUCTION_DEPLOY_KEY }}
        API_ENDPOINT: ${{ secrets.PRODUCTION_API_ENDPOINT }}
      run: |
        echo "🚀 Deploying to production environment..."
        # Add your production deployment commands
        curl -X POST "$API_ENDPOINT/deploy" \
          -H "Authorization: Bearer $DEPLOY_KEY" \
          -H "Content-Type: application/json" \
          -d '{"branch": "main", "environment": "production"}'
        echo "✅ Production deployment completed!"
```

#### Vercel Deployment Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "DATABASE_URL": "@database-url",
    "JWT_SECRET": "@jwt-secret",
    "API_KEY": "@api-key"
  },
  "build": {
    "env": {
      "DATABASE_URL": "@database-url"
    }
  },
  "functions": {
    "pages/api/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

### Multi-Environment Deployment Strategy

#### Environment Configuration
```javascript
// config/environments.js
const environments = {
  development: {
    apiUrl: 'http://localhost:3000',
    databaseUrl: process.env.DEV_DATABASE_URL,
    jwtSecret: process.env.DEV_JWT_SECRET,
    debug: true,
    logLevel: 'debug'
  },
  staging: {
    apiUrl: 'https://staging-api.example.com',
    databaseUrl: process.env.STAGING_DATABASE_URL,
    jwtSecret: process.env.STAGING_JWT_SECRET,
    debug: false,
    logLevel: 'info'
  },
  production: {
    apiUrl: 'https://api.example.com',
    databaseUrl: process.env.PRODUCTION_DATABASE_URL,
    jwtSecret: process.env.PRODUCTION_JWT_SECRET,
    debug: false,
    logLevel: 'error'
  }
};

module.exports = environments[process.env.NODE_ENV || 'development'];
```

#### Database Migration Strategy
```bash
#!/bin/bash
# migrate-and-deploy.sh

echo "🔄 Running database migrations..."

# Run migrations based on environment
case $NODE_ENV in
  "development")
    npm run migrate:dev
    ;;
  "staging")
    npm run migrate:staging
    ;;
  "production")
    echo "⚠️  Production migration - manual approval required"
    npm run migrate:production -- --dry-run
    read -p "Proceed with production migration? (y/N): " confirm
    if [[ $confirm == "y" || $confirm == "Y" ]]; then
        npm run migrate:production
    else
        echo "❌ Migration cancelled"
        exit 1
    fi
    ;;
  *)
    echo "❌ Unknown environment: $NODE_ENV"
    exit 1
    ;;
esac

echo "✅ Database migrations completed!"
```

## 3. Environment and Secret Management

### Secure Environment Configuration
```bash
# .env.example (safe to commit)
NODE_ENV=development
PORT=3000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
API_KEY=your_api_key_here

# Add to .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "*.key" >> .gitignore
echo "*.pem" >> .gitignore
```

### Secret Management with AI Tools
```markdown
# AI Prompt for Secret Management
"Help me set up secure secret management for my application:

REQUIREMENTS:
- Support multiple environments (dev, staging, prod)
- Secure storage of API keys, database credentials
- Easy rotation of secrets
- Audit trail for secret access
- Integration with CI/CD pipeline

CURRENT STACK:
- Node.js backend
- PostgreSQL database
- React frontend
- GitHub Actions for CI/CD
- Deploying to AWS/Vercel

Provide:
1. Recommended secret management service
2. Implementation steps
3. Code examples for accessing secrets
4. CI/CD integration approach
5. Best practices for secret rotation"
```

### AWS Secrets Manager Integration
```javascript
// aws-secrets-manager.js
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager({ region: 'us-east-1' });

class SecretsManager {
  static async getSecret(secretName) {
    try {
      const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
      
      if ('SecretString' in data) {
        return JSON.parse(data.SecretString);
      } else {
        const buff = Buffer.from(data.SecretBinary, 'base64');
        return JSON.parse(buff.toString('ascii'));
      }
    } catch (error) {
      console.error(`Error retrieving secret ${secretName}:`, error);
      throw error;
    }
  }
  
  static async getDatabaseCredentials() {
    const secret = await this.getSecret('myapp/database/credentials');
    return {
      host: secret.host,
      port: secret.port,
      database: secret.database,
      username: secret.username,
      password: secret.password
    };
  }
}

// Usage
const dbConfig = await SecretsManager.getDatabaseCredentials();
```

## 4. Monitoring and Rollback Strategies

### Health Checks and Monitoring
```javascript
// health-check.js
const express = require('express');
const router = express.Router();

// Basic health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Detailed health check with dependencies
router.get('/health/detailed', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {}
  };
  
  // Check database connection
  try {
    await database.ping();
    health.services.database = 'healthy';
  } catch (error) {
    health.services.database = 'unhealthy';
    health.status = 'unhealthy';
  }
  
  // Check Redis connection
  try {
    await redis.ping();
    health.services.redis = 'healthy';
  } catch (error) {
    health.services.redis = 'unhealthy';
    health.status = 'unhealthy';
  }
  
  // Check external API
  try {
    await externalAPI.healthCheck();
    health.services.externalAPI = 'healthy';
  } catch (error) {
    health.services.externalAPI = 'unhealthy';
    health.status = 'unhealthy';
  }
  
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

module.exports = router;
```

### Automated Rollback System
```bash
#!/bin/bash
# rollback.sh

ENVIRONMENT=$1
VERSION=$2

echo "🔄 Starting rollback process..."
echo "Environment: $ENVIRONMENT"
echo "Target Version: $VERSION"

# Validate inputs
if [ -z "$ENVIRONMENT" ] || [ -z "$VERSION" ]; then
    echo "❌ Usage: ./rollback.sh <environment> <version>"
    exit 1
fi

# Create backup of current deployment
echo "💾 Creating backup of current deployment..."
cp -r /var/www/myapp/current /var/www/myapp/backup-$(date +%Y%m%d-%H%M%S)

# Get the deployment from version control
echo "📥 Fetching version $VERSION..."
git fetch origin
git checkout $VERSION

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Run database rollback if needed
if [ -f "migrations/rollback-$VERSION.sql" ]; then
    echo "🔄 Running database rollback..."
    psql $DATABASE_URL -f migrations/rollback-$VERSION.sql
fi

# Restart services
echo "🔄 Restarting services..."
sudo systemctl restart myapp-$ENVIRONMENT

# Verify deployment
echo "🔍 Verifying deployment..."
sleep 30
curl -f http://localhost:3000/health || {
    echo "❌ Health check failed, initiating emergency rollback..."
    # Emergency rollback to previous version
    git checkout HEAD~1
    npm ci --production
    sudo systemctl restart myapp-$ENVIRONMENT
    exit 1
}

echo "✅ Rollback to version $VERSION completed successfully!"
echo "📊 Monitoring deployment health..."
# Add monitoring commands here
```

### Deployment Monitoring Dashboard
```javascript
// monitoring-dashboard.js
const monitoringData = {
  deployments: {
    current: {
      version: '1.2.3',
      deployedAt: '2024-01-15T10:30:00Z',
      deployedBy: 'john.doe',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '120ms'
    },
    previous: {
      version: '1.2.2',
      deployedAt: '2024-01-14T15:45:00Z',
      status: 'rolled_back',
      rollbackReason: 'Performance regression'
    }
  },
  metrics: {
    errorRate: '0.1%',
    responseTime: '120ms',
    cpuUsage: '45%',
    memoryUsage: '67%',
    diskUsage: '34%'
  },
  alerts: [
    {
      level: 'warning',
      message: 'Response time above threshold',
      timestamp: '2024-01-15T11:00:00Z'
    }
  ]
};
```

## 5. AI-Assisted Deployment Workflows

### Deployment Planning with AI
```markdown
# AI Prompt for Deployment Planning
"Help me create a deployment plan for my application:

APPLICATION DETAILS:
- Node.js backend with Express
- React frontend
- PostgreSQL database
- Redis for caching
- Deploying to AWS

CURRENT SETUP:
- Main branch protected
- Automated testing in CI/CD
- Staging and production environments
- Manual deployment process

GOALS:
- Zero-downtime deployments
- Automated rollback capability
- Database migration handling
- Health checks and monitoring
- Secret management

Provide:
1. Step-by-step deployment workflow
2. Rollback strategy
3. Database migration approach
4. Monitoring and alerting setup
5. Security considerations
6. Common issues and solutions"
```

### Automated Deployment Script
```bash
#!/bin/bash
# deploy.sh - AI-assisted deployment script

set -e  # Exit on any error

ENVIRONMENT=$1
VERSION=$2

echo "🚀 Starting deployment process..."
echo "Environment: $ENVIRONMENT"
echo "Version: $VERSION"
echo "Timestamp: $(date)"

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production)$ ]]; then
    echo "❌ Invalid environment. Use: development, staging, or production"
    exit 1
fi

# Validate version
if [ -z "$VERSION" ]; then
    echo "❌ Version is required"
    exit 1
fi

# Pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# Check if version exists in git
if ! git rev-parse "$VERSION" >/dev/null 2>&1; then
    echo "❌ Version $VERSION not found in git"
    exit 1
fi

# Check health of current deployment
if ! curl -f http://localhost:3000/health >/dev/null 2>&1; then
    echo "⚠️  Current deployment health check failed"
    read -p "Proceed anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create deployment backup
echo "💾 Creating deployment backup..."
BACKUP_DIR="/var/backups/myapp/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r /var/www/myapp/current "$BACKUP_DIR/"

# Database migration
echo "🔄 Running database migrations..."
if [ -f "migrations/migrate-$VERSION.sql" ]; then
    psql $DATABASE_URL -f "migrations/migrate-$VERSION.sql"
    echo "✅ Database migration completed"
else
    echo "ℹ️  No database migration needed"
fi

# Application deployment
echo "📦 Deploying application..."
cd /var/www/myapp
git fetch origin
git checkout "$VERSION"

# Install dependencies
npm ci --production

# Build application
if [ -f "package.json" ] && grep -q "build" package.json; then
    npm run build
fi

# Update configuration
if [ -f "config/$ENVIRONMENT.json" ]; then
    cp "config/$ENVIRONMENT.json" config/current.json
fi

# Restart application
echo "🔄 Restarting application..."
sudo systemctl restart myapp-$ENVIRONMENT

# Health check
echo "⏳ Waiting for application to start..."
sleep 30

echo "🔍 Performing health check..."
MAX_ATTEMPTS=10
ATTEMPT=1

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    if curl -f http://localhost:3000/health >/dev/null 2>&1; then
        echo "✅ Health check passed!"
        break
    else
        echo "⏳ Health check attempt $ATTEMPT failed, retrying in 10 seconds..."
        sleep 10
        ATTEMPT=$((ATTEMPT + 1))
    fi
done

if [ $ATTEMPT -gt $MAX_ATTEMPTS ]; then
    echo "❌ Health check failed after $MAX_ATTEMPTS attempts"
    echo "🔄 Initiating automatic rollback..."
    
    # Rollback to previous version
    PREVIOUS_VERSION=$(git describe --abbrev=0 --tags $(git rev-list --tags --skip=1 --max-count=1))
    git checkout "$PREVIOUS_VERSION"
    npm ci --production
    sudo systemctl restart myapp-$ENVIRONMENT
    
    echo "❌ Deployment failed, rolled back to $PREVIOUS_VERSION"
    exit 1
fi

# Post-deployment tasks
echo "📝 Running post-deployment tasks..."

# Clear cache if needed
if [ "$ENVIRONMENT" = "production" ]; then
    curl -X POST http://localhost:3000/api/cache/clear \
        -H "Authorization: Bearer $API_KEY" \
        -H "Content-Type: application/json"
fi

# Run smoke tests
if [ -f "tests/smoke.js" ]; then
    node tests/smoke.js
fi

# Update monitoring
curl -X POST "https://monitoring.example.com/api/deployments" \
    -H "Content-Type: application/json" \
    -d "{
        \"environment\": \"$ENVIRONMENT\",
        \"version\": \"$VERSION\",
        \"status\": \"success\",
        \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
    }"

echo "✅ Deployment completed successfully!"
echo "📊 Version: $VERSION"
echo "🌍 Environment: $ENVIRONMENT"
echo "⏰ Completed at: $(date)"
echo "🔗 Health check: http://localhost:3000/health"

# Cleanup old backups (keep last 10)
echo "🧹 Cleaning up old backups..."
find /var/backups/myapp/ -type d -name "20*" | sort -r | tail -n +11 | xargs rm -rf

echo "🎉 Deployment process completed!"
```

## Next Steps

Now that you have comprehensive version control and deployment strategies:

1. **Implement the CI/CD Pipeline**: Set up GitHub Actions or your preferred CI/CD tool
2. **Configure Monitoring**: Set up health checks and monitoring dashboards
3. **Practice Safe Deployments**: Start with staging environments before production
4. **Automate Rollbacks**: Implement automated rollback triggers
5. **Monitor and Optimize**: Continuously monitor deployment performance

Remember: The goal is to make deployments boring - they should happen frequently, automatically, and without drama. AI can help you achieve this by automating repetitive tasks and catching issues early in the pipeline.