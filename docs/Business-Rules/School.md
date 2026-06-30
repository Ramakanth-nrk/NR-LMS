# Business Rules: School & Tenant Management

1. **Multi-Tenancy Isolation**: Each school's data must be completely isolated. Every SQL query must filter on the school's unique identifier (`school_id`).
2. **Account Creation Scope**: 
   - A Super Admin is the only role that can register schools and create School Admins.
   - School Admins create Teachers and Students.
3. **Suspension Policy**: When a Super Admin suspends a school, all users associated with that tenant must be blocked from logging in immediately, and their active sessions must be terminated.
