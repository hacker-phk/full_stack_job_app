import React from 'react'
import { Button } from './components/ui/button'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import AddEmployee from './pages/AddEmployee'
import EmployeeList from './Helpers/EmployeeList'
import EditUserPage from './pages/EditUserPage'
import Navbar from './Navbar'
import WelcomePage from './pages/WelcomePage'
import { useState } from 'react'
import NavbarBefore from './Helpers/NavbarBefore'
// import {UserProvider} from './context/UserContext.js'
function App() {
  const [username, setUsername] = useState('');
  return (
      
    <div>
      {
        localStorage.getItem('token') ? <Navbar username={username} setUsername={setUsername}/> : <NavbarBefore/>
      }
      
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage   setUsername={setUsername}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path='/employeelist' element={<EmployeeList />} />
        <Route path='/edit' element={<EditUserPage />}/>
        <Route path="*" element={<LoginPage />} />

      </Routes>
    </div>
      
  )
}

export default App