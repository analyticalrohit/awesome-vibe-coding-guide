# Quick Reference Cards

## Essential AI Prompting Patterns

### 1. The CLEAR Framework

**C**ontext - Provide background information
**L**anguage - Specify technical requirements  
**E**xamples - Show what you want
**A**ctions - Define what to do
**R**equirements - List constraints

### 2. Component Generation Pattern

```markdown
Create a [COMPONENT_TYPE] component that:

CONTEXT:
- Framework: [FRAMEWORK]
- Styling: [STYLING_APPROACH]
- State management: [STATE_SOLUTION]

FUNCTIONALITY:
- Accepts: [PROPS_LIST]
- Handles: [EVENTS_LIST]
- Manages: [STATE_REQUIREMENTS]

REQUIREMENTS:
- Follow patterns in [REFERENCE_FILE]
- Include TypeScript types
- Add comprehensive tests
- Make it accessible
```

### 3. API Generation Pattern

```markdown
Create an API endpoint for [FUNCTIONALITY]:

FRAMEWORK: [FRAMEWORK]
METHOD: [HTTP_METHOD]
ROUTE: [ENDPOINT_PATH]

REQUEST:
- Headers: [HEADERS]
- Body: [BODY_STRUCTURE]
- Params: [PARAMETERS]

RESPONSE:
- Success: [SUCCESS_RESPONSE]
- Errors: [ERROR_RESPONSES]

BUSINESS LOGIC:
- Validate: [VALIDATION_RULES]
- Process: [PROCESSING_STEPS]
- Handle: [EDGE_CASES]
```

## Common Git Commands

### Branch Management
```bash
git checkout -b feature/ai-generated-feature
git checkout main
git merge feature/ai-generated-feature
git branch -d feature/ai-generated-feature
```

### Commit Patterns
```bash
# Feature
git commit -m "feat(auth): add JWT authentication"

# Bug fix
git commit -m "fix: resolve login validation error"

# Documentation
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: improve error handling logic"
```

### Emergency Commands
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Find commit by message
git log --grep="commit message"

# Fix last commit message
git commit --amend -m "New message"
```

## Development Environment Setup

### Node.js Version Management
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node version
nvm install 18.17.0
nvm use 18.17.0

# Create .nvmrc
echo "18.17.0" > .nvmrc
```

### Package Management
```bash
# Install dependencies
npm install

# Install dev dependencies
npm install --save-dev [package]

# Update packages
npm update

# Clear cache
npm cache clean --force

# Check for outdated packages
npm outdated
```

### Port Management
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 [PID]

# Use different port
npm run dev -- --port 3001
```

## Testing Commands

### Jest Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test UserComponent.test.tsx

# Update snapshots
npm test -- -u
```

### React Testing Library
```javascript
// Query elements
screen.getByText('Submit')
screen.getByRole('button')
screen.getByLabelText('Email')

// Find elements (async)
await screen.findByText('Loaded')

// Query by test ID
screen.getByTestId('user-form')

// Check element presence
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()
```

## Debugging Commands

### Node.js Debugging
```bash
# Debug with Chrome DevTools
node --inspect-brk script.js

# Debug tests
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

### Console Debugging
```javascript
// Log variables
console.log('Variable:', variable);

// Log with context
console.log('User:', { id, name, email });

// Measure performance
console.time('operation');
// ... operation
console.timeEnd('operation');

// Stack trace
console.trace('Stack trace');
```

### Network Debugging
```bash
# Check network connectivity
ping google.com

# Check DNS
nslookup example.com

# Check open ports
netstat -an | grep 3000

# Monitor network traffic
sudo tcpdump -i eth0
```

## Performance Optimization

### Code Splitting
```javascript
// Dynamic import
const LazyComponent = React.lazy(() => import('./Component'));

// Route-based splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
```

### Memoization
```javascript
// React.memo for components
const MemoizedComponent = React.memo(Component);

// useMemo for expensive calculations
const result = useMemo(() => expensiveCalculation(data), [data]);

// useCallback for functions
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

### Debouncing
```javascript
// Lodash debounce
import { debounce } from 'lodash';

const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);
```

## Security Checklist

### Input Validation
```javascript
// Use validation libraries
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120)
});

// Sanitize input
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```

### Authentication
```javascript
// JWT token handling
const token = localStorage.getItem('token');
const decoded = jwt_decode(token);

// Check token expiration
if (decoded.exp < Date.now() / 1000) {
  // Token expired
}
```

### Rate Limiting
```javascript
// Express rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Common Error Solutions

### Module Not Found
```bash
# Install missing module
npm install [module-name]

# Check if module is in dependencies
npm ls [module-name]

# Clear module cache
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check TypeScript errors
npx tsc --noEmit

# Strict mode check
npx tsc --strict --noEmit

# Check specific file
npx tsc src/file.ts --noEmit
```

### Build Errors
```bash
# Clear build cache
rm -rf dist build .next

# Check for circular dependencies
npx madge --circular --extensions ts,tsx src/

# Memory issues
node --max-old-space-size=4096 node_modules/.bin/webpack
```

## AI Tool Quick Access

### Cursor Shortcuts
- `Cmd/Ctrl + I` - AI Chat
- `Cmd/Ctrl + Shift + I` - AI Edit
- `@` - Reference files
- `#` - Reference symbols

### GitHub Copilot
- `Tab` - Accept suggestion
- `Esc` - Dismiss suggestion
- `Ctrl + Enter` - Open Copilot panel

### ChatGPT/Claude Prompts
```markdown
# Quick component
Create a React component for [purpose] with [features]

# Quick API
Create an API endpoint for [functionality] using [framework]

# Quick test
Generate unit tests for this code: [code]

# Debug help
Help me debug this error: [error message]
```

## Emergency Recovery

### Git Recovery
```bash
# Recover deleted branch
git reflog
git checkout -b recovered-branch HEAD@{1}

# Recover deleted file
git checkout HEAD~1 -- path/to/file

# Reset to remote
git fetch origin
git reset --hard origin/main
```

### Database Recovery
```bash
# Backup database
pg_dump database_name > backup.sql

# Restore database
psql database_name < backup.sql

# MongoDB backup
mongodump --db database_name

# MongoDB restore
mongorestore --db database_name dump/database_name
```

### Application Recovery
```bash
# Restart application
pm2 restart all

# Check logs
pm2 logs

# Monitor resources
htop

# Check disk space
df -h
```

Keep this reference handy for quick access to common commands and patterns!