# Business Rules: Exams & Testing

1. **Scheduling Constraints**: 
   - Students can only enter an exam during its active scheduling window.
   - The exam countdown starts individually for each student upon entering the session.
2. **Auto-Save Frequency**: Answers must auto-save to Redis every 30 seconds.
3. **Anti-Cheat Restrictions**:
   - Web application must enforce full-screen mode on launch.
   - Every tab-switch/window blur must be recorded. Exceeding 3 alerts notifies the teacher.
   - Copy-paste capabilities must be explicitly disabled on the browser.
4. **Auto-Submit Trigger**: When the exam timer hits zero, the current answers must lock and automatically submit.
