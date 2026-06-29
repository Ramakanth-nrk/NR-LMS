
EDUFLOW LMS
Learning Management System
Classes 1 to 10 • Full Platform Blueprint


Confidential • Startup Blueprint Document • 2024

Version 1.0

1. Platform Overview
NR LMS is a multi-tenant, role-based Learning Management System designed for schools serving students from Class 1 to Class 10. The platform supports the full academic lifecycle: user management, question bank creation, exam scheduling, automated grading, and result analytics.

The system is built around four user roles, each with a dedicated dashboard and permissions model. A single Super Admin (the platform owner) controls the entire ecosystem, creating and managing school-level administrators who in turn manage teachers and students.

Core mission
Enable any school to go fully digital for assessments within days, with zero technical knowledge required from teachers or students.

1.1  Key Capabilities
•	Multi-school, multi-tenant platform — one installation serves unlimited schools
•	Role hierarchy: Super Admin → School Admin → Teacher → Student
•	Seven question types with auto-grading for objective questions
•	Weekly tests, unit tests, mid-terms, and annual exams
•	Real-time exam engine with countdown timer and anti-cheat measures
•	Dashboards with charts, class statistics, and student performance trends
•	PDF result cards with class rank and subject-wise breakdown
•	Teacher can teach multiple standards and subjects simultaneously

2. User Roles & Permissions
The platform enforces strict role-based access control (RBAC). Every API call is validated against the user's role before data is returned.

2.1  Role Hierarchy

Role	Created By	Scope	Key Permissions
Super Admin	Hardcoded (you)	Entire platform	Create/remove admins, view all schools, change anything
School Admin	Super Admin	One school	Create teachers with ID+password, manage classes, view school stats
Teacher	School Admin	Assigned classes	Upload questions, create/schedule exams, grade subjective answers, view class results
Student	School Admin / CSV import	Own class	Take exams, view personal results, see rank and subject performance

2.2  Super Admin
The Super Admin is the platform owner. There is exactly one Super Admin account, protected by a separate secret login URL. Capabilities include:
•	Create, edit, suspend, or permanently delete any School Admin account
•	View platform-wide statistics: total schools, teachers, students, exams conducted
•	Reset any user password across the platform
•	Access audit logs for any school
•	Manage platform configuration: branding, feature flags, subscription limits
•	Impersonate any admin or teacher for debugging (with audit trail)

2.3  School Admin
Each school has one School Admin account. The admin is created by the Super Admin and receives login credentials via email. Responsibilities include:
•	Create teacher accounts with a unique Teacher ID and password
•	Create student accounts individually or via bulk CSV upload
•	Create class batches (e.g., Class 6-A, Class 6-B) and assign students
•	Assign teachers to specific classes and subjects
•	View school-wide exam results, pass rates, and class comparisons
•	Download report cards as PDF for any student or entire class
•	Manage the school academic calendar: term dates, exam windows

2.4  Teacher
A single teacher can be assigned to multiple classes and multiple subjects. For example, one teacher may teach Maths to Class 6 and Science to Class 8. The teacher sees each assignment as a separate card in their dashboard.
•	Build a question bank per subject, tagged by chapter and difficulty
•	Create exams by selecting questions from the bank or uploading new ones
•	Schedule exams with date, time, duration, and batch assignment
•	Monitor live exam progress: how many students have submitted
•	Auto-graded results available immediately after submission for MCQ/True-False/Fill-in
•	Review and grade short answer and essay questions with a marking interface
•	View class performance charts: average score, weak topics, improvement over time

2.5  Student
Students log in using their Roll Number and date of birth (or a password set by the admin). The student experience is kept intentionally simple.
•	See upcoming exams on the home screen with countdown timers
•	Enter an exam at the scheduled time — not before
•	Answer questions with auto-save every 30 seconds
•	View results immediately after the exam window closes
•	See subject-wise performance across all exams taken
•	View class rank and percentile for each exam

3. Technology Stack
The stack is chosen for speed of development, low hosting cost (startup-friendly), and scalability. All components are open-source or have generous free tiers.

3.1  Frontend

Technology	Version	Purpose	Why This Choice
Next.js	14 (App Router)	Main web framework	Server-side rendering for dashboards, fast page loads, file-based routing
TypeScript	5.x	Language	Type safety reduces bugs, essential for a large multi-role app
Tailwind CSS	3.x	Styling	Utility-first, fast to build, consistent design system
shadcn/ui	Latest	UI components	Copy-paste components, no dependency lock-in, accessible by default
React Query	v5	Data fetching	Smart caching, background refetch, loading/error states built-in
Zustand	4.x	State management	Lightweight, no boilerplate, replaces Redux for exam state
Recharts	2.x	Charts	React-native charts for dashboards and performance graphs
React Hook Form	7.x	Forms	High-performance form handling for question upload and exam creation

3.2  Backend

Technology	Purpose
Next.js API Routes (or Node.js + Express)	REST API — authentication, exam logic, result calculation, file uploads
Prisma ORM	Type-safe database queries, schema migrations, relations between all entities
JWT + Refresh Tokens	Stateless authentication, role embedded in token payload
bcrypt	Password hashing — never store plain-text passwords
Zod	Runtime validation of all API inputs — prevents malformed data
Bull / BullMQ	Background job queue — send emails, generate PDFs, calculate rankings async
Socket.io (optional)	Real-time exam monitoring for teacher dashboard — live submission count

3.3  Data Layer

Service	Role	Why
PostgreSQL	Primary relational database	Handles all structured data: users, questions, exams, results, relationships
Redis	Sessions + exam state cache	Stores active exam sessions, countdown timers, anti-cheat flags in memory for speed
Cloudflare R2	File storage	Stores question images, PDF results, profile photos — S3-compatible, much cheaper

3.4  Supporting Services

Service	Purpose
Resend.com	Transactional email — sends login credentials, result notifications
Puppeteer / React-PDF	PDF generation — result cards, mark sheets, admit cards
Vercel	Frontend hosting — zero config, global CDN, free tier sufficient for MVP
Railway / Render	Backend + PostgreSQL hosting — simple deployment, managed Postgres, affordable
Upstash Redis	Managed Redis — serverless, free tier for up to 10,000 commands/day
Sentry	Error tracking — catch bugs in production automatically
Posthog (optional)	Product analytics — track which features teachers and students use most

4. Database Schema
The database is designed around a school-tenant model. Every record is scoped to a school, and permissions are enforced both at the API layer and via Prisma query filters.

4.1  Core Tables

schools
Column	Type	Description
id	UUID (PK)	Unique school identifier
name	VARCHAR(200)	School name
code	VARCHAR(20) UNIQUE	Short code used in login URLs (e.g. 'dps-hyd')
admin_id	UUID (FK)	Reference to the school's admin user
created_at	TIMESTAMP	When the school was registered
is_active	BOOLEAN	Super Admin can suspend a school without deleting it

users
Column	Type	Description
id	UUID (PK)	Unique user identifier
school_id	UUID (FK)	Which school this user belongs to
role	ENUM	superadmin, admin, teacher, student
name	VARCHAR(200)	Full name
username	VARCHAR(100) UNIQUE	Login username (teacher ID, roll number, etc.)
password_hash	VARCHAR(255)	bcrypt hashed password
email	VARCHAR(255)	Optional — for sending notifications
is_active	BOOLEAN	Admin can deactivate without deleting
created_at	TIMESTAMP	Account creation time

classes
Column	Type	Description
id	UUID (PK)	Unique class identifier
school_id	UUID (FK)	Owning school
standard	INTEGER	Grade level: 1 through 10
section	VARCHAR(10)	Section name: A, B, C, etc.
academic_year	VARCHAR(10)	e.g. '2024-25'
created_at	TIMESTAMP	—

teacher_class_assignments
This is the key table that allows one teacher to teach multiple standards and subjects.
Column	Type	Description
id	UUID (PK)	—
teacher_id	UUID (FK)	References users table (role=teacher)
class_id	UUID (FK)	References classes table
subject_id	UUID (FK)	References subjects table
school_id	UUID (FK)	Denormalised for faster queries

questions
Column	Type	Description
id	UUID (PK)	—
school_id	UUID (FK)	Questions belong to a school
teacher_id	UUID (FK)	Who created the question
subject_id	UUID (FK)	Which subject
standard	INTEGER	Which class level this is for
chapter	VARCHAR(200)	Chapter or topic
type	ENUM	mcq_single, mcq_multi, true_false, fill_blank, match, short_answer, long_answer, image_based
question_text	TEXT	The question body
options	JSONB	Array of options for MCQ/match types
correct_answer	JSONB	Correct answer(s) — used for auto-grading
marks	INTEGER	Marks allocated to this question
difficulty	ENUM	easy, medium, hard
image_url	VARCHAR(500)	Optional image stored in R2
created_at	TIMESTAMP	—

exams
Column	Type	Description
id	UUID (PK)	—
school_id	UUID (FK)	—
class_id	UUID (FK)	Which class batch takes this exam
subject_id	UUID (FK)	—
teacher_id	UUID (FK)	Created by this teacher
title	VARCHAR(300)	e.g. 'Maths Weekly Test 3 - Fractions'
type	ENUM	weekly, unit, midterm, annual
scheduled_at	TIMESTAMP	When exam opens
duration_minutes	INTEGER	How long students have
total_marks	INTEGER	Sum of all question marks
passing_marks	INTEGER	Minimum to pass
randomise_questions	BOOLEAN	Shuffle question order per student
show_answers_after	BOOLEAN	Reveal correct answers after window closes
status	ENUM	draft, scheduled, live, completed, cancelled
created_at	TIMESTAMP	—

exam_questions  (junction)
Column	Type	Description
exam_id	UUID (FK)	—
question_id	UUID (FK)	—
order_index	INTEGER	Default display order (can be randomised per student)
marks_override	INTEGER	Override marks for this question in this exam

student_exam_sessions
Column	Type	Description
id	UUID (PK)	—
exam_id	UUID (FK)	—
student_id	UUID (FK)	—
started_at	TIMESTAMP	When student actually entered the exam
submitted_at	TIMESTAMP	When submitted (null = not yet submitted)
tab_switches	INTEGER	Anti-cheat: count of times student left the tab
answers	JSONB	All answers saved here as student types (auto-saved)
is_auto_submitted	BOOLEAN	True if timer ran out and system submitted

results
Column	Type	Description
id	UUID (PK)	—
exam_id	UUID (FK)	—
student_id	UUID (FK)	—
total_marks_obtained	DECIMAL(6,2)	Marks scored
percentage	DECIMAL(5,2)	Calculated percentage
rank_in_class	INTEGER	Rank among all students in this class batch for this exam
passed	BOOLEAN	Whether student passed
graded_at	TIMESTAMP	When auto-grading or manual grading completed
question_scores	JSONB	Per-question breakdown: {question_id, marks_obtained, is_correct}

5. Question Types
Teachers can create seven types of questions. Objective types (MCQ, True/False, Fill in the blank, Match) are auto-graded. Subjective types (Short answer, Long answer) are queued for teacher review.

5.1  Question Type Reference

Type	Description	Auto-graded	Typical Use
Multiple Choice (Single)	4 options, exactly one correct	Yes	Factual recall, concept testing
Multiple Choice (Multi)	4+ options, two or more correct answers	Yes	Complex understanding, 'select all that apply'
True / False	Two options: True or False	Yes	Quick knowledge checks, misconception testing
Fill in the Blank	Student types a word or phrase into a blank	Yes (exact match + aliases)	Vocabulary, formulas, definitions
Match the Following	Two columns, student draws connections	Yes	Cause-effect, term-definition pairs
Short Answer	Free text, 2–5 sentences expected	No — teacher reviews	Explanation, reasoning, analysis
Long Answer / Essay	Extended free text, 100–500 words	No — teacher reviews	Descriptive answers, comprehension passages
Image-based	Any type above, with an image as part of the question	Depends on type	Science diagrams, map questions, geometry

5.2  Fill-in-the-Blank Grading
For fill-in-the-blank questions, teachers can provide multiple accepted answers (aliases) to handle spelling variations or abbreviations. Matching is case-insensitive by default.

Example
Question: The capital of France is _____.
Accepted answers: ['paris', 'Paris', 'PARIS']
A student typing 'paris' or 'Paris' will be marked correct automatically.

6. Exam Engine
The exam engine is the most technically critical part of the platform. It must be reliable (no answer loss), fair (enforced timer), and tamper-resistant (anti-cheat measures).

6.1  Exam Lifecycle

Stage	Trigger	What Happens
Draft	Teacher creates exam	Exam exists but is invisible to students. Teacher can add/remove questions.
Scheduled	Teacher sets date and publishes	Exam appears in student's upcoming list with countdown. No access yet.
Live	scheduled_at time reached	Exam opens automatically. Students can enter. Timer starts per student on entry.
Submission	Timer ends or student clicks Submit	Answers locked. Auto-grading runs immediately for objective questions.
Completed	All students submitted or window closed	Results visible. Subjective answers queued for teacher grading.
Results Released	Teacher marks subjective questions	Full results with rank released to students.

6.2  Anti-Cheat Measures
•	Fullscreen enforcement: browser is pushed to fullscreen on exam start
•	Tab-switch detection: every time a student switches tabs or minimises the window, it is logged with a timestamp. After 3 switches, the teacher is notified.
•	Copy-paste disabled: right-click and keyboard shortcuts for copy/paste are blocked in the exam UI
•	Question order randomisation: each student receives questions in a different random order
•	Option order randomisation: for MCQ questions, the answer options are shuffled per student
•	Auto-submit on timer expiry: if the timer reaches zero, the system submits whatever answers are saved — the student cannot continue
•	Session binding: the exam session is tied to the student's device and session token. Opening in a new tab/incognito requires re-authentication.

6.3  Auto-Save
Student answers are saved to Redis every 30 seconds and also on every question navigation. If the student's browser crashes or internet drops, they can re-enter the exam within the time window and all answers are restored. On final submission, answers are written from Redis to PostgreSQL and the session is marked closed.

6.4  Exam Types & Scheduling

Exam Type	Frequency	Scheduled By	Duration	Notes
Weekly Test	Every week, per subject	Teacher (repeating)	30–45 min	Usually 10–20 questions, chapter-specific
Unit Test	After each chapter	Teacher (manual)	45–60 min	Covers one complete chapter
Mid-Term	Twice per academic year	School Admin	2–3 hours	Covers multiple chapters, all subjects
Annual / Final	Once per year	School Admin	3 hours	Full syllabus, contributes to final grade

7. Dashboard Specifications

7.1  Super Admin Dashboard
Accessible only via a secret URL (e.g. /superadmin/login). Shows platform-wide health at a glance.

Dashboard widgets
•  Total schools registered  |  Active schools  |  Suspended schools
•  Total teachers across all schools  |  Total students
•  Total exams conducted this month / this year
•  Schools table: Name | Admin Name | Teachers | Students | Exams | Last Active | Actions
•  Action buttons: Edit Admin, Suspend School, Delete School
•  Platform audit log: who did what and when

7.2  School Admin Dashboard
The admin's home screen shows the school at a glance, with drill-down to teachers, classes, and results.

Dashboard widgets
•  School stats: total teachers, total students, total classes, exams this term
•  Teachers table: Teacher Name | Teacher ID | Classes Assigned | Subjects | Student Count
•     → Click a teacher to see their classes, each class's avg score, upcoming exams
•  Classes panel: Class 6-A (32 students), Class 6-B (30 students), ...
•     → Click a class to see student list and all exam results for that batch
•  Exam calendar: visual monthly calendar of all upcoming and past exams
•  Top performers: top 5 students school-wide this month
•  Pass rate chart: bar chart by class showing % of students passing each subject

7.3  Teacher Dashboard
Each teacher sees cards for each class-subject assignment. A Maths teacher teaching Class 6 and Class 8 sees two cards side by side.

Dashboard widgets
•  My classes: card grid showing each assignment (e.g. 'Class 6-A • Maths • 32 students')
•  Click a class card to see:
     - Student list with last exam score and overall average
     - All exams for this class: past results and upcoming
     - Class average chart: line chart over time
     - Weak topics: subjects or chapters where class average < 50%
•  Question bank: browse, filter, and edit questions by subject and chapter
•  Create exam: wizard to select questions, set schedule, and publish
•  Pending grading: list of short/long answer questions waiting for review

7.4  Student Dashboard
Kept intentionally minimal and mobile-friendly. Students should be able to take an exam from a basic Android phone.

Dashboard widgets
•  Upcoming exams: card list with subject, date, time, and countdown timer
•  My results: table of all past exams with score, percentage, rank, and pass/fail
•  Subject performance: radar chart showing average score per subject
•  Weekly streak: did the student take all their scheduled tests this week?
•  Notifications: exam reminders 24 hours and 1 hour before

8. API Structure
All API routes follow REST conventions. Authentication is via JWT Bearer token in the Authorization header. Role guards are applied at the middleware level.

8.1  Authentication Routes
Method	Route	Access	Description
POST	/api/auth/login	All	Login with username + password, returns JWT + refresh token
POST	/api/auth/refresh	All	Exchange refresh token for new JWT
POST	/api/auth/logout	All	Invalidate refresh token in Redis
POST	/api/auth/reset-password	Admin+	Admin resets a user's password

8.2  User Management Routes
Method	Route	Access	Description
POST	/api/schools	Super Admin	Create a new school and admin
GET	/api/schools	Super Admin	List all schools with stats
DELETE	/api/schools/:id	Super Admin	Remove a school and all its data
POST	/api/teachers	Admin	Create a teacher account with ID and password
GET	/api/teachers	Admin	List all teachers in this school
POST	/api/students	Admin	Create a student account
POST	/api/students/bulk	Admin	Bulk import students via CSV
GET	/api/classes	Admin/Teacher	List classes with student counts

8.3  Question & Exam Routes
Method	Route	Access	Description
POST	/api/questions	Teacher	Add a question to the bank
GET	/api/questions	Teacher	List questions with filters (subject, chapter, type)
POST	/api/exams	Teacher	Create a new exam (draft)
PATCH	/api/exams/:id/publish	Teacher	Schedule and publish an exam
GET	/api/exams/:id/live	Student	Get live exam (questions, timer info)
POST	/api/exams/:id/submit	Student	Submit exam answers
PATCH	/api/exams/:id/autosave	Student	Auto-save answers during exam
GET	/api/results/:examId	Teacher/Admin	Get all results for an exam with ranks
GET	/api/results/student/:id	Student/Teacher	Get a student's result history
POST	/api/results/grade	Teacher	Grade a subjective answer

9. Build Plan & Roadmap
Recommended build sequence for a small team (1–3 developers). Each phase produces working, shippable software. Test with a real school pilot from Phase 2 onward.

Phase 1  —  Foundation  (Weeks 1–4)
1.	Set up Next.js project with TypeScript, Tailwind CSS, and shadcn/ui
2.	Configure PostgreSQL with Prisma — run initial migrations for all core tables
3.	Implement authentication: login, JWT, refresh tokens, role middleware
4.	Build Super Admin flow: create school, create admin, view schools list
5.	Build Admin flow: create teacher with ID+password, create student, create class
6.	Email delivery: send credentials to new teacher via Resend

Phase 2  —  Exam Core  (Weeks 5–9)
7.	Question bank: create, list, filter questions — MCQ and True/False first
8.	Exam builder: select questions, set schedule, publish
9.	Student exam UI: fullscreen, timer, question navigation, auto-save to Redis
10.	Submit flow: lock answers, run auto-grader, write results to PostgreSQL
11.	Results page: show score, percentage, correct/incorrect per question
12.	Add remaining question types: Fill-in, Match, Short answer, Long answer

Phase 3  —  Dashboards  (Weeks 10–13)
13.	Teacher dashboard: class cards, student list, class average chart
14.	Admin dashboard: teacher list with drill-down, class overview, pass rate chart
15.	Student dashboard: upcoming exams, result history, subject radar chart
16.	Super Admin dashboard: school list, platform stats, audit log
17.	Subjective grading interface for teachers

Phase 4  —  Polish & Launch  (Weeks 14–16)
18.	PDF result card generation with class rank
19.	Anti-cheat: tab-switch detection, copy-paste block, fullscreen enforcement
20.	Exam scheduling: weekly recurring exams, mid-term and annual exam flows
21.	Mobile optimisation: test exam UI on Android Chrome at 360px width
22.	Bulk student CSV import
23.	Email and in-app exam reminders
24.	Load testing: simulate 200 concurrent students in an exam
25.	Security audit: SQL injection, XSS, CSRF, rate limiting

9.1  Effort Estimate

Phase	Duration	Team Size	Key Milestone
1: Foundation	4 weeks	1–2 developers	Any user can log in; admin can create a teacher
2: Exam Core	5 weeks	1–2 developers	A student can take an MCQ exam and see their score
3: Dashboards	4 weeks	1–2 developers	Admin and teacher can see full analytics
4: Polish	3 weeks	1–2 developers	Production-ready, pilot school go-live

10. Security & Compliance

10.1  Authentication Security
•	All passwords hashed with bcrypt (cost factor 12)
•	JWT access tokens expire in 15 minutes; refresh tokens expire in 7 days
•	Refresh tokens stored in Redis with user ID — invalidated immediately on logout or password reset
•	Rate limiting on login endpoint: max 5 attempts per IP per 15 minutes
•	Super Admin login behind a secret URL not linked from anywhere public

10.2  Data Security
•	All API routes validate role before returning data — no client-side role checking
•	School data is isolated: every database query scoped to school_id from the JWT
•	File uploads scanned for file type — only images allowed in question uploads
•	All data in transit encrypted via HTTPS (TLS 1.3)
•	Database backups every 24 hours, retained for 30 days

10.3  Exam Integrity
•	Questions and correct answers never sent to the client — only question text and options
•	Answer checking done server-side on submission
•	Exam session tokens are single-use — cannot be replayed
•	Anti-cheat events (tab switches, copy attempts) logged with timestamps for teacher review

11. Future Features (Post-Launch)
These are not in scope for the MVP but represent the natural growth path for the platform as a startup.

•	AI question generator: teacher inputs a topic and the AI generates 10 MCQ questions
•	AI essay grader: use an LLM to suggest a score and feedback for long answers
•	Parent portal: parents log in to view their child's results and exam schedule
•	Attendance module: teacher marks daily attendance per class
•	Homework assignment module: teacher assigns and collects written homework
•	Multi-language support: question text and UI in regional languages
•	Mobile app: React Native app for Android and iOS
•	Adaptive testing: question difficulty adjusts in real-time based on student performance
•	Certificate generation: auto-generate achievement certificates for top performers
•	Subscription billing: Super Admin manages school subscription plans and payment

12. Glossary

Term	Definition
Standard	The grade level of a class, 1 through 10. 'Class 6' = Standard 6.
Batch / Section	A division within a standard. Class 6-A and Class 6-B are two batches of Standard 6.
Question Bank	A teacher's library of reusable questions, organised by subject and chapter.
Exam Window	The time period during which an exam is open for students to enter and submit.
Auto-grading	Automatic marking of MCQ, True/False, Fill-in-blank, and Match questions by the system.
Subjective grading	Manual marking of short answer and long answer questions by the teacher.
RBAC	Role-Based Access Control — every action is restricted based on the user's role.
Redis	An in-memory database used for fast session storage and exam state caching.
JWT	JSON Web Token — a signed token that proves a user's identity and role without a database lookup.
R2	Cloudflare R2 — object storage service used to store uploaded files (images, PDFs).
DXA	Document XML Attribute unit used by Word documents. 1440 DXA = 1 inch.
Multi-tenant	One platform installation serves multiple separate schools, each with isolated data.

NR LMS • Confidential Startup Blueprint • 2024  •  All rights reserved
 13. Student Engagement Layer
Purpose: Increase student motivation and daily platform usage.
• Streak Counter – 'You've taken tests 5 weeks in a row!'
• Achievement Badges – First 90%+, Perfect Score, Top 3 in Class, Weekly Star.
• Optional Class Leaderboard controlled by teachers.
• Daily Challenge – One question every day.
• Reward Points and Student Levels.
14. Parent Portal
Parents can securely track their child's academic progress.
• Parent login
• Exam scores and class rank
• Attendance and homework
• Monthly PDF progress reports
• Upcoming exams
• Teacher announcements
• WhatsApp notifications for results, attendance, homework and announcements
• Email notifications
• Subject-wise analytics
Updated Vision
NR LMS is a complete AI-ready School Management and Learning Platform with assessments, analytics, student engagement, and parent communication.
