# API Specifications: Teacher Management

## Endpoints

### 1. Create Teacher
* **Method**: `POST`
* **Route**: `/api/teachers`
* **Access**: School Admin
* **Description**: Create a teacher account with Teacher ID and initial password.

### 2. List Teachers
* **Method**: `GET`
* **Route**: `/api/teachers`
* **Access**: School Admin
* **Description**: List all teachers in this school with assigned classes and subjects.

### 3. Assign Class & Subject
* **Method**: `POST`
* **Route**: `/api/teachers/:id/assign`
* **Access**: School Admin
* **Description**: Set class and subject mapping for a teacher.
