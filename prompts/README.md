# Prompt Templates for Vibe Coding

This directory contains proven prompt templates for different development scenarios. These templates have been tested and optimized for AI-assisted development.

## How to Use These Templates

1. **Choose the appropriate template** for your task
2. **Fill in the placeholders** with your specific requirements
3. **Add context** about your project structure and constraints
4. **Iterate** based on the AI's response

## Template Categories

- [`component/`](component/) - Component development prompts
- [`api/`](api/) - API development prompts  
- [`testing/`](testing/) - Testing and quality assurance prompts
- [`debugging/`](debugging/) - Debugging and troubleshooting prompts
- [`planning/`](planning/) - Project planning and architecture prompts

## Quick Start Templates

### Component Creation
```markdown
Create a [COMPONENT_TYPE] component in [FRAMEWORK] that:

CONTEXT:
- Framework: React/Vue/Angular
- State management: [STATE_SOLUTION]
- Styling: [STYLING_APPROACH]
- Accessibility: [ACCESSIBILITY_REQUIREMENTS]

FUNCTIONALITY:
- Accepts these props: [LIST_PROPS]
- Handles these events: [LIST_EVENTS]
- Manages state for: [STATE_REQUIREMENTS]

REQUIREMENTS:
- Follow existing patterns in [FILE_REFERENCE]
- Include TypeScript types
- Add comprehensive error handling
- Include loading states
- Make it accessible

OUTPUT:
- Component code
- CSS/styling
- Unit tests
- Usage examples
- Documentation
```

### API Endpoint Creation
```markdown
Create an API endpoint for [FUNCTIONALITY]:

FRAMEWORK: Express/FastAPI/Django
METHOD: [HTTP_METHOD]
ROUTE: [ENDPOINT_PATH]

REQUEST:
- Headers: [REQUIRED_HEADERS]
- Body: [REQUEST_BODY_STRUCTURE]
- Query params: [QUERY_PARAMETERS]
- Path params: [PATH_PARAMETERS]

RESPONSE:
- Success status: [SUCCESS_CODE]
- Success body: [RESPONSE_STRUCTURE]
- Error codes: [ERROR_CODES_AND_MESSAGES]

BUSINESS LOGIC:
- Validate input using [VALIDATION_LIBRARY]
- Check permissions: [PERMISSION_REQUIREMENTS]
- Process data: [PROCESSING_STEPS]
- Log events: [LOGGING_REQUIREMENTS]

DATABASE:
- Use [DATABASE] with [ORM]
- Implement proper indexing
- Handle concurrent access
- Include transaction support

SECURITY:
- Rate limiting: [RATE_LIMITS]
- Input validation: [VALIDATION_RULES]
- Authentication: [AUTH_REQUIREMENTS]
- Authorization: [PERMISSION_CHECKS]
```

### Testing Generation
```markdown
Generate comprehensive tests for [COMPONENT/FUNCTION]:

TARGET:
```javascript
[CODE_TO_TEST]
```

TEST REQUIREMENTS:
- Test framework: [TEST_FRAMEWORK]
- Coverage target: [COVERAGE_PERCENTAGE]
- Test types: [UNIT/INTEGRATION/E2E]

TEST SCENARIOS:
- Normal operation: [NORMAL_CASES]
- Edge cases: [EDGE_CASES]
- Error conditions: [ERROR_CASES]
- Performance: [PERFORMANCE_REQUIREMENTS]

MOCK STRATEGY:
- External dependencies: [MOCK_APPROACH]
- Database: [DATABASE_MOCKING]
- API calls: [API_MOCKING]

OUTPUT:
- Test file with all scenarios
- Helper functions
- Test utilities
- Documentation
```

## Tips for Better Prompts

1. **Be Specific**: Include exact requirements, constraints, and examples
2. **Provide Context**: Share relevant code, project structure, and goals
3. **Use Examples**: Show the AI what good output looks like
4. **Iterate**: Don't settle for the first response, refine and improve
5. **Test**: Always test the generated code in your environment

## Contributing

Have a prompt template that works well? Submit a pull request! We're looking for:

- Proven templates that generate high-quality code
- Examples from real projects
- Specialized templates for specific frameworks or tools
- Creative approaches to common problems