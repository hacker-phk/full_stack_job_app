Here’s the `README.md` ready for you to copy:

---

# Employee Management App

This is an Employee Management Application with functionalities for user login, registration, viewing employee lists, and managing employee data (add/edit). The application consists of a frontend built with Vite, React, Tailwind CSS, ShadCN, and other libraries, while the backend is powered by Node.js, Express, MongoDB, and JWT authentication.

## Features

- **User Authentication**: Login and registration with encrypted passwords.
- **Employee Management**: View, add, and edit employees.
- **Secure Storage**: JWTs and cookies are used for secure user sessions.

## Technologies Used

### Frontend
- **Vite**: Fast build tool for frontend.
- **React**: UI library for building interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ShadCN**: Component library for better UI components.
- **Axios**: Promise-based HTTP client for API requests.
- **Context API**: State management across the app.
- **js-cookie**: Library for handling cookies.
- **Local Storage**: For storing user session data.

### Backend
- **Node.js**: JavaScript runtime for backend.
- **Express**: Minimalist web framework for Node.js.
- **Axios**: For making HTTP requests from server to server.
- **Bcrypt**: Password hashing for secure user authentication.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT**: JSON Web Tokens for secure user sessions.
- **cookie-parser**: Middleware to handle cookies.

## Prerequisites

- **Node.js** (>= v14)
- **MongoDB** (local or MongoDB Atlas)

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd employee-management-app
```

### 2. Set Up Backend

Navigate to the `api` folder and install dependencies:
```bash
cd api
npm install
```

#### Environment Variables
Create a `.env` file in the `api` directory with the following variables:

```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### Run the Backend Server
```bash
npm start
```
The backend server will start at `http://localhost:5000`.

### 3. Set Up Frontend

Navigate to the `vite-project` folder and install dependencies:
```bash
cd ../vite-project
npm install
```

#### Run the Frontend Server
```bash
npm run dev
```
The frontend server will start at `http://localhost:5173` (default Vite port).

## Usage

1. **Open the app** in your browser at `http://localhost:5173`.
2. **Register/Login** to access the employee management features.
3. Navigate to the **Employee List** to view, add, or edit employee information.


```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

--- 

Let me know if there's anything else!
