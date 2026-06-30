# Authentication: Login Flow

## Mechanism
1. The user inputs their School Code, Username/Roll Number, and Password.
2. The system checks the tenant `School` table via the `School Code` to resolve `school_id`.
3. Checks the `users` table for matching username and `school_id`.
4. Compares hashed password using `bcrypt`.
5. Upon verification, issues access (JWT) and refresh tokens.
