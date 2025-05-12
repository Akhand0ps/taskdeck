# TaskDeck API Documentation

## Base URL
```
http://localhost:4000/api
```

## Authentication Endpoints

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
```json
{
  "fullname": {
    "firstname": "string", // min 3 characters
    "lastname": "string"   // min 3 characters
  },
  "email": "string",
  "password": "string"    // min 6 characters
}
```
- **Success Response**: 
```json
{
  "token": "jwt_token",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
```

### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "string",
  "password": "string"    // min 6 characters
}
```
- **Success Response**:
```json
{
  "token": "jwt_token",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
```

### Get User Profile
- **URL**: `/auth/profile`
- **Method**: `GET`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Success Response**:
```json
{
  "user": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string"
}
```

### Logout User
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Success Response**:
```json
{
  "message": "Logged out successfully"
}
```
- **Notes**: 
  - Invalidates the current JWT token
  - Clears the cookie if present
  - Adds token to blacklist

## Tasks Endpoints

### Get Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Success Response**:
```json
"Hello from tasks"
```

### Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Body**:
```json
{
  "title": "string",
  "description": "string"
}
```
- **Success Response**:
```json
{
  "message": "Task created successfully",
  "task": {
    "title": "string",
    "description": "string",
    "isCompleted": false,
    "isPublic": false,
    "owner": "user_id"
  }
}
```

### Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Success Response**:
```json
[
  {
    "title": "string",
    "description": "string",
    "isCompleted": false
  }
]
```

### Get Single Task
- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Success Response**:
```json
{
  "task": {
    "title": "string",
    "description": "string",
    "isCompleted": false,
    "isPublic": false,
    "owner": "user_id"
  }
}
```

### Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Body**:
```json
{
  "title": "string",
  "description": "string"
}
```
- **Success Response**:
```json
{
  "message": "Task updated successfully",
  "task": {
    "title": "string",
    "description": "string",
    "isCompleted": false,
    "isPublic": false,
    "owner": "user_id"
  }
}
```

### Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Success Response**:
```json
{
  "message": "Task deleted successfully"
}
```

### Toggle Public Status
- **URL**: `/tasks/:id/toggle`
- **Method**: `PATCH`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Success Response**:
```json
{
  "message": "Task updated successfully",
  "task": {
    "title": "string",
    "description": "string",
    "isCompleted": false,
    "isPublic": true,
    "owner": "user_id"
  }
}
```

### Toggle Complete Status
- **URL**: `/tasks/:id/complete`
- **Method**: `PATCH`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Success Response**:
```json
{
  "message": "Task updated successfully",
  "task": {
    "title": "string",
    "description": "string",
    "isCompleted": true,
    "isPublic": false,
    "owner": "user_id"
  }
}
```

### View Public Tasks of a User
- **URL**: `/tasks/public/:userId`
- **Method**: `GET`
- **Headers**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```
- **Success Response**:
```json
[
  {
    "title": "string",
    "description": "string",
    "isCompleted": false
  }
]
```

## Error Responses

### Validation Errors
```json
{
  "errors": [
    {
      "msg": "error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Authentication Errors
```json
{
  "message": "Invalid email or password"
}
```

### Server Errors
```json
{
  "message": "Internal server error"
}
```