# Business Rules: Student Management

1. **Unique Identifiers**: Every student must have a unique Roll Number within their school tenant.
2. **Bulk Upload Validation**: CSV imports for students must validate required fields (Name, Roll Number, Class Standard, Section) and report errors without executing partial/corrupt imports.
3. **Class Enrollment**: A student can only belong to one active class batch at a time for a given academic year.
