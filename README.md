# Todo Application

A simple full-stack Todo application.

## Backend
- Built using Spring Boot (Java + Maven)
- Provides REST APIs for authentication and todo operations
- Uses JWT tokens for secure access

## Frontend
- Built using HTML, CSS, and JavaScript
- Contains pages for user registration and login
- After login, todos can be managed through the UI

## How to Run Backend
1. Open the `backend` folder in IntelliJ or Eclipse.
2. Make sure Java and Maven are installed.
3. Run the Spring Boot application (main class) or use:
   mvn spring-boot:run
4. The backend will start at:
   http://localhost:8080

## How to Run Frontend
1. Open the `frontend` folder.
2. To register a new user, open:
   register.html
3. To login, open:
   login.html
4. Make sure the backend is running before using these pages.

## Features
- User Registration
- User Login with JWT Authentication
- Create, View, Edit and Delete Todos (after login)
- Simple and clean UI design

## Folder Structure
todo-application/
  backend/     ← Spring Boot code
  frontend/    ← HTML, CSS, JS pages (register, login, todo UI)
