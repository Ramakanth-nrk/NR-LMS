# UI Specification: Exam Engine & Scheduling

## Screen Flow

### 1. Upcoming Exams Roster (Student View)
- **Layout**: Grid of upcoming exams showing subject tags, scheduled date, and active countdown timer.
- **Controls**: "Enter Exam" button (Disabled until the schedule begins).

### 2. Live Exam Interface (Student View)
- **Layout**: Split layout.
  - Sidebar: Question navigator map (Completed, current, flagged, unvisited).
  - Main: Question content display, selection radio/checkbox fields, or free-text editor.
- **Controls**: "Flag for Review", "Next", "Previous", and "Submit Exam" buttons. Persistent header displaying remaining time with warning alerts on low time.

### 3. Exam Creator Wizard (Teacher View)
- **Steps**:
  1. Metadata configuration (Title, duration, date, batch).
  2. Question selection (Import from question bank / draft custom).
  3. Final verification & release scheduler.
