# Business Rules: Authentication

1. **Role-Based Access**: Every API route and client-side view must enforce strict Role-Based Access Control (RBAC). 
2. **Access Expirations**: JWT access tokens must expire in exactly 15 minutes. Refresh tokens must expire in 7 days and must be cached in Redis with user IDs.
3. **Session Invalidation**: When a user logs out or resets their password, all active sessions and refresh tokens for that user must be invalidated immediately in Redis.
4. **Rate Limiting**: The login endpoint must restrict verification attempts to a maximum of 5 attempts per IP address per 15 minutes.
