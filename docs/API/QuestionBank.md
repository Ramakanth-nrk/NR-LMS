# API Specifications: Question Bank

## Endpoints

### 1. Add Question
* **Method**: `POST`
* **Route**: `/api/questions`
* **Access**: Teacher
* **Description**: Create and add a new question to the bank. Supports all seven question types.

### 2. List & Filter Questions
* **Method**: `GET`
* **Route**: `/api/questions`
* **Access**: Teacher
* **Description**: Filter question bank by standard, subject, chapter, and difficulty level.

### 3. Update Question
* **Method**: `PUT`
* **Route**: `/api/questions/:id`
* **Access**: Teacher / Admin
* **Description**: Update an existing question's text, options, correct answers, or metadata.
