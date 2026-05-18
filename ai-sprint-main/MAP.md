# Project Structure Map

ai-sprint/
├── src/
│ ├── assets/ # Images, icons, and static files
│ ├── components/ # Reusable UI components
│ │ ├── common/ # Generic components used across the app
│ │ │ ├── forms/ # Reusable form components (UI Kit)
│ │ │ │ ├── Form.tsx # Main form wrapper
│ │ │ │ ├── FormInput.tsx # Custom text input with validation support
│ │ │ │ ├── FormSelect.tsx # Custom dropdown select
│ │ │ │ └── FormTextarea.tsx# Custom textarea (e.g., for Project Goal)
│ │ │ ├── inputs/ # Specific purpose inputs
│ │ │ │ └── SearchInput.tsx # Search bar with debounce functionality
│ │ │ ├── Button.tsx # Primary/Secondary reusable buttons
│ │ │ ├── Modal.tsx # Reusable popup modal wrapper
│ │ │ └── Spinner.tsx # Loading indicator
│ │ ├── layout/ # App layout components
│ │ │ ├── Navbar.tsx # Top navigation bar (Profile, Notifications)
│ │ │ └── MainLayout.tsx# Main wrapper for page content
│ │ ├── projects/ # Project-specific components
│ │ │ ├── ProjectCard.tsx # Project card displayed in the Dashboard
│ │ │ └── CreateProjectModal.tsx # AI task generator modal
│ │ └── board/ # Kanban board components
│ │ ├── KanbanColumn.tsx # Board column (Backlog, In Progress, etc.)
│ │ └── TaskCard.tsx # Individual task card
│ │
│ ├── features/ # State management (Redux Toolkit slices)
│ │ ├── auth/ # Authentication state
│ │ │ ├── authSlice.ts # Auth state, reducers, and extraReducers (login/register status)
│ │ │ └── authActions.ts # Async thunks for auth API calls (e.g., loginUser, registerUser)
│ │ ├── projects/ # Projects list and generation state
│ │ │ ├── projectsSlice.ts # Projects state, including AI generation loading steps
│ │ │ └── projectsActions.ts# Async thunks for fetching projects and AI task generation
│ │ └── tasks/ # Kanban tasks state (Drag & Drop handling)
│ │ ├── tasksSlice.ts # Tasks state, handles optimistic UI updates for drag & drop
│ │ └── tasksActions.ts # Async thunks for CRUD operations and syncing task status
│ │
│ ├── pages/ # Main application pages
│ │ ├── auth/ # Authentication pages
│ │ │ ├── Login.tsx
│ │ │ └── Register.tsx
│ │ ├── Dashboard.tsx # Main dashboard displaying all projects
│ │ └── ProjectBoard.tsx # Specific project's Kanban board view
│ │
│ ├── hooks/ # Custom React hooks
│ │ ├── useAppDispatch.ts # Typed Redux dispatch hook
│ │ ├── useAppSelector.ts # Typed Redux selector hook
│ │ └── useDebounce.ts # Custom hook for delaying search input API calls
│ │
│ ├── services/ # API integration and external requests
│ │ ├── api.ts # Axios/Fetch configuration (Interceptors, Base URL)
│ │ ├── authService.ts # Login/Register API calls
│ │ ├── projectService.ts # Fetch/Create projects API calls (Includes AI request)
│ │ └── taskService.ts # Task updates API calls (e.g., status change on drop)
│ │
│ ├── types/ # TypeScript interfaces and types
│ │ ├── user.types.ts # User and Auth response types
│ │ ├── project.types.ts # Project data structure types
│ │ └── task.types.ts # Task and Kanban board data structure types
│ │
│ ├── utils/ # Helper functions
│ │ ├── formatters.ts # Date/String formatting utilities
│ │ └── validators.ts # Form validation schemas (e.g., Zod or Yup schemas)
│ │
│ ├── App.tsx # Main component and Application Routing setup
│ ├── main.tsx # Application entry point (Redux Provider setup)
│ └── store.ts # Redux store configuration
