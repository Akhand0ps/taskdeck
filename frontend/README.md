# TaskDeck Frontend Documentation

## Overview
TaskDeck is a task management application built with React and Tailwind CSS that allows users to create, manage, and share tasks.

## Tech Stack
- React (with Vite)
- Tailwind CSS
- Axios
- React Router DOM

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm/yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to frontend directory
cd taskdeck/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_BASE_URL=http://localhost:4000
```

## Features

### Authentication
- **Register**: Create new account with first name, last name, email, and password
- **Login**: Sign in with email and password
- **Logout**: Securely end session
- **Protected Routes**: Authenticated access to app features

### Task Management
- **Create Tasks**: Add new tasks with title, description, and privacy setting
- **View Tasks**: See all your tasks in a grid layout
- **Edit Tasks**: Modify task details and status
- **Delete Tasks**: Remove unwanted tasks
- **Toggle Status**: Mark tasks as complete/incomplete
- **Privacy Control**: Make tasks public or private

### Public Tasks
- View other users' public tasks
- Browse tasks by user
- See task completion status

### Search & Sort
- Search tasks by title or description
- Sort tasks by:
  - Date
  - Status
  - Visibility

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar
│   └── ProtectedRoute.jsx  # Auth route wrapper
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # User dashboard
│   ├── CreateTask.jsx  # Task creation
│   ├── MyTasks.jsx     # User's tasks
│   ├── PublicTasks.jsx # Public tasks view
│   ├── Profile.jsx     # User profile
│   └── EditTask.jsx    # Task editing
├── axios.js           # Axios configuration
├── App.jsx            # Root component
└── main.jsx          # Entry point
```

## Components

### Protected Route
```jsx
<ProtectedRoute>
  <Component />
</ProtectedRoute>
```
Wraps routes that require authentication.

### Navbar
```jsx
<Navbar />
```
Navigation component with links to all main sections.

## API Integration

### Authentication Headers
```javascript
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

### API Endpoints
- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/auth/profile` - Get user profile
- `/api/auth/logout` - User logout
- `/api/tasks` - Task CRUD operations
- `/api/tasks/public` - Public tasks operations

## Styling
- Tailwind CSS for responsive design
- Custom color schemes:
  - Primary: Blue-600
  - Success: Green-600
  - Warning: Yellow-600
  - Danger: Red-600

## Error Handling
- Form validation
- API error messages
- Protected route redirects
- Loading states

## Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```