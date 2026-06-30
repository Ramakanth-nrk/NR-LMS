# API Specifications: Exams

## Endpoints

### 1. Create Exam (Draft)
* **Method**: `POST`
* **Route**: `/api/exams`
* **Access**: Teacher
* **Description**: Create a draft exam session with assigned batch, subject, and duration.

### 2. Publish & Schedule Exam
* **Method**: `PATCH`
* **Route**: `/api/exams/:id/publish`
* **Access**: Teacher
* **Description**: Publish a draft exam and set the scheduled time.

### 3. Get Live Exam Engine Info
* **Method**: `GET`
* **Route**: `/api/exams/:id/live`
* **Access**: Student
* **Description**: Fetch active questions, metadata, and synchronized countdown timer.

### 4. Auto-save Answers
* **Method**: `PATCH`
* **Route**: `/api/exams/:id/autosave`
* **Access**: Student
* **Description**: Periodically auto-save answers to cache (Redis) every 30 seconds.

### 5. Submit Exam
* **Method**: `POST`
* **Route**: `/api/exams/:id/submit`
* **Access**: Student
* **Description**: Lock answers and mark exam submission. Auto-grader runs immediately for objective sections.

### 6. Track Anti-cheat Alerts
* **Method**: `POST`
* **Route**: `/api/exams/:id/cheating`
* **Access**: Student
* **Description**: Log tab-switch events and other violations.
