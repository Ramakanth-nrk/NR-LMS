# API Specifications: Authentication

## Endpoints

### 1. Login
* **Method**: `POST`
* **Route**: `/api/auth/login`
* **Access**: Public
* **Description**: Login with username (roll number, teacher ID, or email) and password. Returns JWT access token and refresh token.

### 2. Refresh Token
* **Method**: `POST`
* **Route**: `/api/auth/refresh`
* **Access**: Public
* **Description**: Exchange a valid refresh token for a new short-lived JWT access token.

### 3. Logout
* **Method**: `POST`
* **Route**: `/api/auth/logout`
* **Access**: Authenticated Users
* **Description**: Invalidate the current session and clear refresh tokens in Redis.

### 4. Reset Password
* **Method**: `POST`
* **Route**: `/api/auth/reset-password`
* **Access**: Admin+ (Super Admin, School Admin)
* **Description**: Admin resets a user's password to a temporary or new password.
