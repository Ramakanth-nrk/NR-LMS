# Authentication: Role-Based Access Control (RBAC)

## Permissions Hierarchy

### 1. Super Admin
- Full cross-tenant permissions (CRUD on school admins, schools list, audit logs).

### 2. School Admin
- Read/Write scope limited to the active `school_id` tenant.
- Manage school configuration, class lists, teachers, and students.

### 3. Teacher
- Read/Write scope limited to assigned `standard` + `subject` within their `school_id`.
- Manage exams, question lists, and student grading.

### 4. Student
- Read-only details of active batch.
- Submit answers to live exams assigned to their class batch.
