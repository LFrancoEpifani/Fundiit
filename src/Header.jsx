import React from 'react'
import Home from './components/Home/Home'
import { EventProvider } from './eventContext'
import { useState } from 'react'
import Flyers from './Flyers'
import Register from './components/Registro/Register'
import Login from './components/Registro/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


export default function Header() {
  

  const [formUser, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showRegister, setShowRegister] = useState(true);
  const [loginData, setLoginData] = useState({
    token: localStorage.getItem('token') || null,
  });
  

  const handleAddUser = () => {
    addUser(formUser, setUsers, setUserData);
  };

  const handleToggleForm = () => {
    setShowRegister(!showRegister);
  };

  const hideRegister = () => {
    setShowRegister(false);
  };
  

  const [users, setUsers] = useState();

  return (
    <div className=''>
          <EventProvider>
      <Router>
      <Routes>
        <Route
          path="/"
          element={
            showRegister ? (
              <Register
                setShowRegister={setShowRegister}
                userData={formUser}
                setUserData={setUserData}
                handleAddUser={handleAddUser}
                setUsers={setUsers}
              />
            ) : (
              <Login 
              setLoginData={setLoginData}/>
            )
          }
        />
        <Route path='/flyers' element={<Flyers/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/home" element={<Home token={loginData.token}/>} />
      </Routes>

      
     <div className='relative'>
     <p className='btn-switch absolute bottom-168 left-82'>
  {showRegister
    ? "¿Ya tienes cuenta? "
    : "¿No tienes cuenta? "}
  <span
    onClick={handleToggleForm}
    className='login text-md'
  >
    {showRegister ? 'Iniciar sesión' : 'Registrarse'}
  </span>
</p>
     </div>

    </Router>
          </EventProvider>
    </div>
  )
}