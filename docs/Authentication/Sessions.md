# Authentication: Session Management

## Cache Layer (Redis)
- **Active Sessions**: Tracked in Redis using key format `session:<user_id>:<device_uuid>`.
- **Exam Session Lock**: When taking an exam, the student session binds to their current connection context.
- **Revocation**: Password resets and manual logouts clear all Redis keys matching the user profile prefix.
