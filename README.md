

---

# Employee Management App

A full-stack Employee Management Application with a secure login system, employee list management, and data editing capabilities. This app has a React-powered frontend and a Node.js/Express backend, with MongoDB for database storage.

## Features

- **User Authentication**: Secure login and registration with encrypted passwords.
- **Employee Management**: Easily view, add, and edit employee data.
- **Secure Sessions**: Uses JWT and cookies for secure session management.

## Technologies Used

### Frontend

- **Vite**: Fast, opinionated frontend tool.
- **React**: Component-based UI library.
- **Tailwind CSS**: Utility-first CSS framework.
- **ShadCN**: Custom component library for enhanced UI.
- **Axios**: HTTP client for API communication.
- **Context API**: State management.
- **js-cookie**: Cookie handling library.
- **Local Storage**: Persistent storage for user sessions.

### Backend

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Axios**: Server-side HTTP requests.
- **Bcrypt**: Password hashing for authentication.
- **Mongoose**: MongoDB object modeling.
- **JWT**: JSON Web Token for user sessions.
- **cookie-parser**: Middleware for parsing cookies.

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
The frontend server will start at `http://localhost:5173`.

## Usage

1. Open the app at `http://localhost:5173`.
2. Register/Login to manage employee data.
3. Navigate to **Employee List** for viewing, adding, or editing employee details.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

--- 
