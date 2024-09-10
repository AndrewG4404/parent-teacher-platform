# Parent-Teacher Communication Platform

## Project Overview

This project is a web-based **Parent-Teacher Communication Platform** designed to facilitate communication and information sharing between teachers and parents. The platform allows teachers to manage and share important updates, such as assignments, grades, and events. Parents can log in to view this information and chat with teachers.

---

## Features

### Teacher Role:
- **Chat with Parents**: Communicate directly with parents via a built-in messaging system.
- **Add Assignments**: Upload assignments for students.
- **Add Grades**: Input and update student grades.
- **Add Events**: Schedule and share upcoming school events.

### Parent Role:
- **View Information**: Access all shared assignments, grades, and events in a read-only mode.
- **Messaging**: Engage in direct communication with teachers.

---

## Technologies Used

### Front-End:
- **HTML**
- **CSS**
- **Bootstrap**: For responsive and modern design.

### Back-End:
- **Python**: Manages server-side operations and handles data.

---

## Installation and Setup

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/parent-teacher-platform.git
2. Navigate to project directory:
   cd parent-teacher-platform
3. Install the necessary dependencies:
   pip install -r requirements.txt
4. Run the application:
   python app.py
5. Open your browser and go to http://localhost:5000 to access the platform.

## Project Structure

Below is an outline of the project's structure:
/parent-teacher-platform
    /client
        /public
        /src
            /components
                /Assignments
                    AssignmentForm.js
                    AssignmentList.js
                /Events
                    EventForm.js
                    EventList.js
                /Grades
                    GradeForm.js
                    GradeList.js
                /Messaging
                    Chat.js
                    ChatList.js
                    ChatWindow.js
            /contexts
                AuthContext.js
            App.js
        /server
            /middleware
            /models
                Assignment.js
                Event.js
                Grade.js
                Message.js
                User.js
            /routes
                assignment.js
                auth.js
                events.js
                grades.js
                messages.js
                users.js
    README.md
    app.py
    requirements.txt


## Usage Instructions:

1. Teacher Role:
    Log in as a teacher to:
    Start chat conversations with parents.
    Add new assignments, grades, and events through easy-to-use forms.
2. Parent Role:
    Log in as a parent to:
    View assignments, grades, and events posted by teachers.
    Use the chat feature to communicate with teachers.
## Contributing

1. Fork this repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Submit a pull request.

## Contact
For any questions about the project:
Email: gonzalezandrew528@gmail.com
GitHub: AndrewG4404







