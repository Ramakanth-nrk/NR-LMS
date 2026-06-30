# API Specifications: Student Management

## Endpoints

### 1. Create Student
* **Method**: `POST`
* **Route**: `/api/students`
* **Access**: School Admin
* **Description**: Create a single student account with Roll Number and details.

### 2. Bulk Import Students
* **Method**: `POST`
* **Route**: `/api/students/bulk`
* **Access**: School Admin
* **Description**: Import student roster via CSV file mapping to standard and sections.

### 3. List Students
* **Method**: `GET`
* **Route**: `/api/students`
* **Access**: Admin / Teacher
* **Description**: Retrieve a list of students, filterable by class standard and section.
