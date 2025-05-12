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