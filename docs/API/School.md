# API Specifications: School & Tenant Management

## Endpoints

### 1. Create School
* **Method**: `POST`
* **Route**: `/api/schools`
* **Access**: Super Admin
* **Description**: Register a new school tenant and create its initial School Admin account.

### 2. List Schools
* **Method**: `GET`
* **Route**: `/api/schools`
* **Access**: Super Admin
* **Description**: Retrieve a list of all registered school tenants along with status and statistics.

### 3. Delete School
* **Method**: `DELETE`
* **Route**: `/api/schools/:id`
* **Access**: Super Admin
* **Description**: Hard delete a school and all associated data across the database.

### 4. List Batches / Classes
* **Method**: `GET`
* **Route**: `/api/classes`
* **Access**: Admin / Teacher
* **Description**: Retrieve class standards and sections with student enrollment statistics.
