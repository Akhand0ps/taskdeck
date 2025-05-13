# TaskDeck - Task Management Application

## Overview
TaskDeck is a full-stack task management application that allows users to create, manage, and share tasks. Built with React.js for the frontend and Node.js/Express for the backend.

## Features

### Authentication
- User registration with first and last name
- Secure login with JWT
- Protected routes
- Automatic token handling
- Profile management

### Task Management
- Create personal tasks
- Toggle task completion status
- Make tasks public/private
- Edit task details
- Delete tasks
- Search and filter tasks
- Sort tasks by date, status, or visibility

### Public Tasks
- View other users' public tasks
- Browse tasks by user
- View task completion status

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Router DOM for routing
- Axios for API requests

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT for authentication
- bcrypt for password hashing

## Project Structure
```
taskdeck/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── axios.js      # Axios configuration
│   └── ...
└── backend/               # Node.js backend
    ├── controllers/      # Route controllers
    ├── models/          # Database models
    ├── routes/          # API routes
    ├── middleware/      # Custom middleware
    └── services/        # Business logic
```

## Getting Started

### Prerequisites
- Node.js v16 or higher
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskdeck
```

2. Install Backend Dependencies:
```bash
cd backend
npm install
```

3. Configure Backend Environment:
Create `.env` file in backend directory:
```env
PORT=4000
DB_CONNECT=mongodb://localhost:27017/taskdeck
JWT_SECRET=your_jwt_secret
SALT=your_salt_value
```

4. Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```

5. Configure Frontend Environment:
Create `.env` file in frontend directory:
```env
VITE_BASE_URL=http://localhost:4000
```

### Running the Application

1. Start Backend Server:
```bash
cd backend
npm run dev
```

2. Start Frontend Development Server:
```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - Logout user

### Task Routes
- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get all user tasks
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle public status
- `PATCH /api/tasks/:id/complete` - Toggle completion status
- `GET /api/tasks/public/:userId` - Get user's public tasks
- `GET /api/tasks/public` - Get all public tasks

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:
```javascript
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

## Error Handling
- Frontend form validation
- Backend data validation
- JWT verification
- Protected route redirects
- Loading states
- Error messages display

## Available Scripts

### Backend
```bash
npm run dev    # Start development server
npm start      # Start production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.