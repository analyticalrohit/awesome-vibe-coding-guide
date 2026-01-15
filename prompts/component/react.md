# Component Development Prompts

## React Component Templates

### Form Component with Validation
```markdown
Create a comprehensive React form component for [FORM_TYPE] that includes:

FRAMEWORK: React 18 with TypeScript
STYLING: Tailwind CSS with custom classes
VALIDATION: React Hook Form with Zod schema
STATE: React hooks (useState, useEffect)

FORM REQUIREMENTS:
- Fields: [LIST_FORM_FIELDS]
- Validation rules: [VALIDATION_RULES]
- Error messages: [ERROR_MESSAGES]
- Success behavior: [SUCCESS_ACTION]

FEATURES:
- Real-time validation with debouncing
- Loading states during submission
- Error handling and user feedback
- Accessibility (ARIA labels, keyboard navigation)
- Responsive design for mobile/desktop
- Auto-save functionality (optional)

TECHNICAL REQUIREMENTS:
- TypeScript interfaces for all props and state
- Custom hook for form logic
- Reusable form field components
- Proper error boundary handling
- Unit tests with React Testing Library

OUTPUT:
1. Main form component
2. Individual field components
3. Validation schema
4. Custom hooks
5. CSS/styling
6. Unit tests
7. Usage examples
8. Documentation

EXAMPLE USAGE:
```jsx
<UserRegistrationForm 
  onSuccess={(userData) => console.log('User registered:', userData)}
  onError={(error) => console.error('Registration failed:', error)}
  initialData={optionalInitialData}
/>
```

STYLE GUIDE:
- Follow existing patterns in src/components/forms/
- Use consistent spacing and colors
- Include hover/focus states
- Add smooth transitions
```

### Data Table Component
```markdown
Create a comprehensive React data table component with:

FRAMEWORK: React 18 with TypeScript
STYLING: Material-UI or Tailwind CSS
DATA MANAGEMENT: React Query or SWR

CORE FEATURES:
- Sortable columns: [SORTABLE_COLUMNS]
- Searchable: Global search and column filters
- Pagination: Server-side with page size options
- Row selection: Single/multi-select with bulk actions
- Inline editing: Edit cells directly in table
- Export: CSV, Excel, PDF formats

ADVANCED FEATURES:
- Column resizing and reordering
- Row expansion with detail view
- Column visibility toggle
- Responsive design (mobile-friendly)
- Loading states and skeleton screens
- Error handling with retry

PERFORMANCE:
- Virtual scrolling for large datasets
- Memoized components
- Lazy loading of data
- Debounced search

ACCESSIBILITY:
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast mode

OUTPUT:
1. Main table component
2. Column components
3. Pagination component
4. Search/filter components
5. Export utilities
6. TypeScript interfaces
7. Unit tests
8. Documentation

DATA STRUCTURE:
```typescript
interface TableColumn {
  id: string;
  label: string;
  field: string;
  type: 'text' | 'number' | 'date' | 'boolean';
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
}

interface TableData {
  id: string | number;
  [key: string]: any;
}
```

USAGE EXAMPLE:
```jsx
<DataTable
  columns={userColumns}
  data={userData}
  onSort={(column, direction) => handleSort(column, direction)}
  onSearch={(query) => handleSearch(query)}
  onRowSelect={(selectedRows) => handleSelection(selectedRows)}
  pagination={{
    page: currentPage,
    pageSize: pageSize,
    total: totalRecords,
    onPageChange: handlePageChange
  }}
/>
```
```

### Modal/Dialog Component
```markdown
Create a flexible React modal component with:

FRAMEWORK: React 18 with TypeScript
ANIMATION: Framer Motion or CSS transitions
STYLING: Tailwind CSS or styled-components

CORE FEATURES:
- Multiple sizes: small, medium, large, full-screen
- Positions: center, top, bottom, left, right
- Backdrop: Click to close, opacity control
- Keyboard: ESC to close, focus trap
- Scroll: Body scroll lock, internal scrolling

ANIMATION OPTIONS:
- Fade in/out
- Slide from directions
- Scale/zoom
- Custom animations

ACCESSIBILITY:
- Focus management
- ARIA labels and roles
- Screen reader announcements
- Keyboard navigation
- High contrast support

OUTPUT:
1. Main modal component
2. Modal header/footer components
3. Backdrop component
4. Animation utilities
5. Focus management hook
6. TypeScript interfaces
7. Usage examples
8. Documentation

USAGE PATTERNS:
```jsx
// Basic usage
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
</Modal>

// Advanced usage
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit User"
  size="large"
  position="center"
  backdrop={true}
  keyboard={true}
  animation="slide"
  onAfterOpen={() => console.log('Modal opened')}
  onAfterClose={() => console.log('Modal closed')}
>
  <ModalHeader>
    <h2>Edit User</h2>
  </ModalHeader>
  <ModalBody>
    <UserForm user={currentUser} />
  </ModalBody>
  <ModalFooter>
    <button onClick={() => setIsOpen(false)}>Cancel</button>
    <button onClick={handleSave}>Save</button>
  </ModalFooter>
</Modal>
```
```

## Vue Component Templates

### Vue 3 Composition API Component
```markdown
Create a Vue 3 component using Composition API for [COMPONENT_TYPE]:

FRAMEWORK: Vue 3 with Composition API
SCRIPT: TypeScript
STYLING: Scoped CSS with CSS variables
STATE: Vue reactivity system

COMPONENT STRUCTURE:
```vue
<template>
  <!-- Component template -->
</template>

<script setup lang="ts">
// Composition API logic
</script>

<style scoped>
/* Component styles */
</style>
```

FEATURES:
- Reactive state management
- Computed properties
- Watchers and lifecycle hooks
- Props validation
- Event emission
- Slots support

REQUIREMENTS:
- TypeScript interfaces for props and emits
- Proper type definitions
- Error handling
- Loading states
- Accessibility features

OUTPUT:
1. Complete Vue component
2. TypeScript interfaces
3. Composable utilities
4. Unit tests
5. Documentation
6. Usage examples
```

## Component Testing Prompts

### React Testing Library Tests
```markdown
Generate comprehensive tests for this React component:

COMPONENT CODE:
```jsx
[COMPONENT_CODE]
```

TEST REQUIREMENTS:
- Framework: React Testing Library
- Coverage: 100% code coverage
- Test types: Unit, integration, accessibility

TEST SCENARIOS:
- Component rendering
- User interactions
- Props validation
- Error states
- Loading states
- Accessibility features

MOCK STRATEGY:
- External API calls
- Child components
- Custom hooks
- Event handlers

OUTPUT:
1. Complete test suite
2. Test utilities and helpers
3. Mock implementations
4. Coverage report
5. Documentation
```

## Specialized Component Prompts

### Chart/Graph Component
```markdown
Create a React chart component using [CHART_LIBRARY]:

LIBRARY: Chart.js, D3.js, or Recharts
DATA: Dynamic data with real-time updates

CHART TYPE: [CHART_TYPE]
FEATURES:
- Interactive tooltips
- Zoom and pan
- Responsive design
- Multiple data series
- Custom styling
- Export functionality

DATA FORMAT:
```typescript
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}
```

OUTPUT:
1. Chart component
2. Data transformation utilities
3. Custom hooks for data fetching
4. Styling and theming
5. Usage examples
```

### File Upload Component
```markdown
Create a comprehensive file upload component:

FRAMEWORK: React with TypeScript
UPLOAD: Direct to cloud storage (AWS S3, Cloudinary)

FEATURES:
- Drag and drop support
- Multiple file selection
- File type validation
- Size limits
- Progress tracking
- Preview for images
- Error handling
- Retry mechanism

SECURITY:
- File type validation
- Size limits
- Virus scanning
- Secure upload URLs

OUTPUT:
1. Upload component
2. File validation utilities
3. Upload progress tracking
4. Error handling
5. Security measures
6. Documentation
```