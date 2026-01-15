# Troubleshooting Guide for Vibe Coding

This guide helps you resolve common issues encountered when using AI-assisted development tools.

## Common AI-Related Issues

### 1. AI Generates Incorrect Code

**Problem**: The AI produces code that doesn't work or doesn't match your requirements.

**Solutions**:

1. **Improve Your Prompt**:
   ```markdown
   ❌ "Create a login form"
   ✅ "Create a React login form with email validation, password show/hide toggle, 
   and proper error handling. Use TypeScript and follow the patterns in 
   src/components/forms/. Include unit tests."
   ```

2. **Provide More Context**:
   ```markdown
   CONTEXT:
   - Framework: React 18 with TypeScript
   - Styling: Tailwind CSS
   - State management: React Hook Form
   - Validation: Zod schema
   - Testing: React Testing Library
   
   CURRENT CODE STRUCTURE:
   ```jsx
   // src/components/forms/LoginForm.tsx
   [YOUR_CURRENT_CODE]
   ```
   
   REQUIREMENTS:
   - Follow existing patterns
   - Include proper TypeScript types
   - Add comprehensive error handling
   - Make it accessible
   ```

3. **Iterate and Refine**:
   ```markdown
   The code you generated has this issue: [SPECIFIC_ISSUE]
   
   Please fix it by:
   1. [SPECIFIC_FIX_1]
   2. [SPECIFIC_FIX_2]
   3. [SPECIFIC_FIX_3]
   
   Here's what the corrected behavior should look like:
   [EXAMPLE_OF_CORRECT_BEHAVIOR]
   ```

### 2. AI Loses Context

**Problem**: The AI forgets previous conversations or project context.

**Solutions**:

1. **Start New Conversations for New Features**:
   - Keep conversations focused on single features
   - Create new chats for unrelated tasks
   - Save important context in project documentation

2. **Use Consistent Context Setting**:
   ```markdown
   PROJECT CONTEXT:
   - Framework: [YOUR_FRAMEWORK]
   - Project structure: [PROJECT_STRUCTURE]
   - Current task: [CURRENT_TASK]
   - Previous relevant code: [RELEVANT_CODE]
   ```

3. **Create Context Files**:
   ```markdown
   # context.md
   ## Project Structure
   src/
   ├── components/     # React components
   ├── services/       # API services
   ├── utils/         # Utility functions
   └── types/         # TypeScript types
   
   ## Current Technology Stack
   - React 18 with TypeScript
   - Tailwind CSS for styling
   - React Query for data fetching
   - Zod for validation
   ```

### 3. AI Generates Inconsistent Code

**Problem**: The AI produces code that doesn't follow your project's patterns or style.

**Solutions**:

1. **Provide Style Guide Examples**:
   ```markdown
   CODE STYLE REQUIREMENTS:
   - Use functional components with hooks
   - Follow this naming convention:
     * Components: PascalCase (UserProfile)
     * Functions: camelCase (getUserData)
     * Constants: UPPER_SNAKE_CASE (API_URL)
   - Use TypeScript interfaces for props
   - Include JSDoc comments
   
   EXAMPLE CODE TO FOLLOW:
   ```jsx
   interface UserProps {
     id: string;
     name: string;
     email: string;
   }
   
   const UserCard: React.FC<UserProps> = ({ id, name, email }) => {
     /**
      * Handle user card click
      */
     const handleClick = () => {
       console.log(`User ${id} clicked`);
     };
     
     return (
       <div onClick={handleClick}>
         <h3>{name}</h3>
         <p>{email}</p>
       </div>
     );
   };
   ```

2. **Reference Existing Code**:
   ```markdown
   Follow the same patterns as src/components/UserCard.tsx:
   [COPY_EXISTING_CODE_HERE]
   
   Create a new component with the same:
   - Component structure
   - Styling approach
   - Error handling
   - Prop validation
   ```

## Development Environment Issues

### 1. Node.js Version Conflicts

**Problem**: Different Node.js versions causing compatibility issues.

**Solutions**:

1. **Use Node Version Manager (nvm)**:
   ```bash
   # Install and use specific Node version
   nvm install 18.17.0
   nvm use 18.17.0
   
   # Create .nvmrc file for project
   echo "18.17.0" > .nvmrc
   
   # Use version from .nvmrc
   nvm use
   ```

2. **Package.json Engines**:
   ```json
   {
     "engines": {
       "node": ">=18.0.0",
       "npm": ">=8.0.0"
     }
   }
   ```

### 2. Dependency Conflicts

**Problem**: Package dependencies causing errors or warnings.

**Solutions**:

1. **Clear and Reinstall**:
   ```bash
   # Remove node_modules and package-lock.json
   rm -rf node_modules package-lock.json
   
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   npm install
   ```

2. **Use npm-check-updates**:
   ```bash
   # Install globally
   npm install -g npm-check-updates
   
   # Check for updates
   ncu
   
   # Update package.json
   ncu -u
   
   # Install updates
   npm install
   ```

### 3. Port Already in Use

**Problem**: Development server can't start because port is already in use.

**Solutions**:

1. **Find and Kill Process**:
   ```bash
   # Find process using port 3000
   lsof -i :3000
   
   # Kill process (replace PID with actual process ID)
   kill -9 PID
   ```

2. **Use Different Port**:
   ```bash
   # Start on different port
   npm run dev -- --port 3001
   
   # Or set in package.json
   "scripts": {
     "dev": "next dev -p 3001"
   }
   ```

## Git and Version Control Issues

### 1. Merge Conflicts

**Problem**: Merge conflicts when pulling or merging branches.

**Solutions**:

1. **Resolve Conflicts**:
   ```bash
   # Pull latest changes
   git pull origin main
   
   # If conflicts occur, open conflicted files
   # Look for conflict markers:
   # <<<<<<< HEAD
   # Your changes
   # =======
   # Incoming changes
   # >>>>>>> main
   
   # Edit files to resolve conflicts
   # Remove conflict markers
   
   # Stage resolved files
   git add .
   
   # Complete merge
   git commit -m "Resolve merge conflicts"
   ```

2. **Use Merge Tools**:
   ```bash
   # Configure merge tool
   git config --global merge.tool vscode
   
   # Use merge tool
   git mergetool
   ```

### 2. Accidental Commits

**Problem**: Committed sensitive data or wrong files.

**Solutions**:

1. **Amend Last Commit**:
   ```bash
   # Remove sensitive file
   git rm --cached sensitive-file.txt
   
   # Amend commit
   git commit --amend -m "Updated commit message"
   
   # Force push (if already pushed)
   git push --force-with-lease
   ```

2. **Revert Commit**:
   ```bash
   # Find commit hash
   git log --oneline
   
   # Revert specific commit
   git revert COMMIT_HASH
   
   # Or reset to previous commit (dangerous)
   git reset --hard COMMIT_HASH
   git push --force-with-lease
   ```

## Testing Issues

### 1. Tests Failing Intermittently

**Problem**: Tests pass sometimes but fail other times.

**Solutions**:

1. **Fix Timing Issues**:
   ```javascript
   // ❌ Unreliable timing
   it('loads data', () => {
     render(<DataComponent />);
     expect(screen.getByText('Loaded')).toBeInTheDocument();
   });
   
   // ✅ Wait for element
   it('loads data', async () => {
     render(<DataComponent />);
     await waitFor(() => {
       expect(screen.getByText('Loaded')).toBeInTheDocument();
     });
   });
   ```

2. **Use Proper Test Utilities**:
   ```javascript
   // Wait for elements
   await waitFor(() => {
     expect(element).toBeInTheDocument();
   });
   
   // Find by text with wait
   const element = await screen.findByText('Loading...');
   
   // Wait for loading to finish
   await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
   ```

### 2. Mock Not Working

**Problem**: Mocks aren't being used or are causing issues.

**Solutions**:

1. **Proper Mock Setup**:
   ```javascript
   // Mock modules
   jest.mock('axios');
   jest.mock('../api/userService');
   
   // Mock implementation
   axios.get.mockResolvedValue({ data: mockData });
   
   // Clear mocks between tests
   beforeEach(() => {
     jest.clearAllMocks();
   });
   ```

2. **Mock Timers**:
   ```javascript
   // Use fake timers
   jest.useFakeTimers();
   
   // Advance timers
   jest.advanceTimersByTime(1000);
   
   // Clean up
   afterEach(() => {
     jest.useRealTimers();
   });
   ```

## Deployment Issues

### 1. Build Failures

**Problem**: Application fails to build for production.

**Solutions**:

1. **Check Build Logs**:
   ```bash
   # Run build with verbose output
   npm run build -- --verbose
   
   # Check TypeScript errors
   npx tsc --noEmit
   
   # Check for circular dependencies
   npx madge --circular --extensions ts,tsx src/
   ```

2. **Fix Common Build Issues**:
   ```bash
   # Clear build cache
   rm -rf .next dist build
   
   # Update dependencies
   npm update
   
   # Check for missing dependencies
   npm ls
   ```

### 2. Environment Variable Issues

**Problem**: Environment variables not working in production.

**Solutions**:

1. **Check Environment Setup**:
   ```bash
   # Create .env file (never commit this)
   touch .env
   
   # Add to .gitignore
echo ".env" >> .gitignore
   echo ".env.local" >> .gitignore
   ```

2. **Platform-Specific Setup**:
   ```bash
   # Vercel: Set in project settings
   # Netlify: Set in deploy settings
   # Heroku: Set with CLI
   heroku config:set API_KEY=your-key
   
   # Docker: Use environment variables
   docker run -e API_KEY=your-key myapp
   ```

## AI Tool-Specific Issues

### 1. Cursor IDE Issues

**Problem**: Cursor not generating expected code or behaving unexpectedly.

**Solutions**:

1. **Reset Cursor Settings**:
   ```bash
   # Clear Cursor cache
   rm -rf ~/.cursor
   
   # Restart Cursor
   # Reconfigure settings
   ```

2. **Improve Context**:
   - Use `@` to reference files
   - Use `#` to reference symbols
   - Include relevant code snippets
   - Use the `Start from Repo` feature

### 2. GitHub Copilot Issues

**Problem**: Copilot not providing relevant suggestions.

**Solutions**:

1. **Improve Context**:
   - Add more comments
   - Include type definitions
   - Use descriptive variable names
   - Add file headers with context

2. **Trigger Suggestions**:
   ```javascript
   // Write descriptive comments
   // This function calculates the total price including tax
   function calculateTotal(price, taxRate) {
     // Copilot will suggest implementation
   }
   ```

## Quick Fixes Reference

### Common Error Messages

| Error | Quick Fix |
|-------|-----------|
| `Module not found` | `npm install [missing-module]` |
| `Cannot find module` | Check import path and file extension |
| `TypeScript error` | Run `npx tsc --noEmit` to check types |
| `Port already in use` | Kill process or use different port |
| `Permission denied` | Run with `sudo` or fix file permissions |
| `Out of memory` | Increase Node.js memory limit |
| `Network error` | Check internet connection and proxy settings |

### Emergency Commands

```bash
# Kill process on port
kill -9 $(lsof -t -i:3000)

# Clear all caches
npm cache clean --force
rm -rf node_modules package-lock.json

# Reset Git to last commit
git reset --hard HEAD

# Find large files
du -h --max-depth=1 | sort -hr

# Check disk space
df -h

# Memory usage
free -h
```

## Getting Help

When stuck:

1. **Check Documentation**: Always check official docs first
2. **Search Error Messages**: Copy exact error messages
3. **Check GitHub Issues**: Look for similar issues
4. **Ask AI for Help**: Use detailed prompts with context
5. **Community Support**: Stack Overflow, Discord, Reddit
6. **Official Support**: GitHub issues, forums, support channels

Remember: Every developer faces these issues. The key is to learn from each problem and build your troubleshooting toolkit.