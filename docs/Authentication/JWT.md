# Authentication: JWT Strategy

## Details
- **Access Tokens**: Short-lived (15 minutes). Contains user context: `id`, `school_id`, `role`, `username`.
- **Refresh Tokens**: Long-lived (7 days). Stored securely client-side in HTTP-only cookies to prevent XSS-based theft.
- **Signing**: Signed utilizing HS256 with custom environment secrets.
