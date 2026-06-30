
# Database Overview

NR LMS uses PostgreSQL as the primary relational database.

The application follows a Multi-Tenant Architecture where each school acts as a tenant.

Every business record belongs to a school.

Authentication is centralized while business data is isolated using `school_id`.

---

## Database Principles

* UUID Primary Keys
* Soft Delete Support
* Audit Fields
* Foreign Key Constraints
* Indexed Search Columns
* Timestamp Tracking
* Scalable Multi-Tenant Design


# Authentication Module

Responsible for

* User Login
* User Logout
* Authentication
* Authorization
* Session Management
* Password Management
* Refresh Tokens
* Audit Logging
* Role Based Access Control


# Authentication Tables

| Table            | Purpose                   |
| ---------------- | ------------------------- |
| users            | Stores all users          |
| roles            | Stores available roles    |
| permissions      | Stores permissions        |
| role_permissions | Maps permissions to roles |
| sessions         | Active login sessions     |
| refresh_tokens   | JWT refresh tokens        |
| audit_logs       | User activity logs        |


# users

Purpose

Stores every authenticated user in the system.

Includes

* Super Admin
* School Admin
* Teacher
* Student
* Parent

Every user has exactly one primary role.

Students use Student ID instead of Email for login.

Parents use Mobile Number.

Teachers use Email.

School Admin uses Email.

Super Admin uses Email.






| Role         | Login Identifier |
| ------------ | ---------------- |
| Super Admin  | Email            |
| School Admin | Email            |
| Teacher      | Email            |
| Student      | Student ID       |
| Parent       | Mobile Number    |




# users

Columns

id

school_id

role_id

student_id

employee_id

first_name

last_name

email

mobile

password

status

is_first_login

last_login_at

failed_login_attempts

password_changed_at

created_at

updated_at

deleted_at






# Users Table

Purpose

Stores all authenticated users.

Roles Supported

- Super Admin
- School Admin
- Teacher
- Student
- Parent

---

## Columns

| Column | Type | Nullable | Description |
|---------|------|----------|-------------|
| id | UUID | No | Primary Key |
| school_id | UUID | No | School Reference |
| role_id | UUID | No | User Role |
| student_id | VARCHAR(20) | Yes | Only for Students |
| employee_id | VARCHAR(20) | Yes | Only for Teachers |
| first_name | VARCHAR(100) | No | First Name |
| last_name | VARCHAR(100) | Yes | Last Name |
| email | VARCHAR(255) | Yes | Login Email |
| mobile | VARCHAR(20) | Yes | Parent Mobile |
| password | TEXT | No | Encrypted Password |
| status | ENUM | No | ACTIVE / INACTIVE / SUSPENDED |
| is_first_login | BOOLEAN | No | Force Password Change |
| last_login_at | TIMESTAMP | Yes | Last Login |
| failed_login_attempts | INTEGER | No | Login Attempts |
| password_changed_at | TIMESTAMP | Yes | Password Change Date |
| created_at | TIMESTAMP | No | Created Date |
| updated_at | TIMESTAMP | No | Updated Date |
| deleted_at | TIMESTAMP | Yes | Soft Delete |

---


## Business Rules

1. Student ID is generated automatically.

2. Teacher cannot manually edit Student ID.

3. Students login using Student ID.

4. Parents login using Mobile Number.

5. Teachers login using Email.

6. Super Admin login using Email.

7. Password is encrypted.

8. Soft Delete is enabled.

9. Every user belongs to exactly one school.

10. Every user has one primary role.