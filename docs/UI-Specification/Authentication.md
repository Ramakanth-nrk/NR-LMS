# UI Specification: Authentication Screens

## Views & Layouts

### 1. Public Login Screen
- **Fields**: School Code, Username (Roll Number / Teacher ID), Password.
- **Actions**: Login (Submit), Forgot Password.
- **Design**: Clean, centered form with responsive grid layout optimized for mobile screens.

### 2. Super Admin Secret Login Screen
- **Path**: Custom hidden path (e.g., `/superadmin/login`).
- **Fields**: Email/Username, Password, TOTP 2FA code field (if enabled).
- **Design**: Minimalist layout.
