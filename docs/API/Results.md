# API Specifications: Grading & Results

## Endpoints

### 1. Get Exam Results with Rankings
* **Method**: `GET`
* **Route**: `/api/results/:examId`
* **Access**: Teacher / Admin
* **Description**: Retrieve student performance breakdown and batch rankings for a specific exam.

### 2. Get Student Result History
* **Method**: `GET`
* **Route**: `/api/results/student/:id`
* **Access**: Student / Teacher / Parent
* **Description**: Get historical scores, ranking metrics, and subject percentages.

### 3. Submit Subjective Grade
* **Method**: `POST`
* **Route**: `/api/results/grade`
* **Access**: Teacher
* **Description**: Enter manual grades and comments for short/long answers.
