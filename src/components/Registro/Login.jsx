import React, { useState } from 'react';
import F from '../../assets/FFun.png'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
 

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData ? responseData.token : null;
  
        // Guarda el token en el estado o en el almacenamiento local
        // (usa tu propio estado o almacenamiento según sea necesario)
        setLoginData((prevData) => ({
          ...prevData,
          token: token,
        }));
        localStorage.setItem('token', token);

        navigate('/home'); // Utiliza 'navigate' para redirigir en RR-Dom v6

       
        // Maneja otras acciones de éxito, como redirigir a una nueva página
        console.log('Login successful!');
      } else {
        // Maneja errores, por ejemplo, muestra un mensaje de error
        console.error('Login failed');
        
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      console.error('Detalles del error:', error.response);
      console.log('Login failed');
    }
  };
  
  
  return (
    <div >
      <div className='flex justify-center items-center my-8'>
          <img className='w-9 h-12' src={F} alt="" />
        </div>
      <form onSubmit={handleSubmit}>

      <h2 className='register text-center my-4 font-bold text-2xl'>INICIAR SESIÓN</h2>
      <div className='flex flex-col justify-center items-center'>

     
          <div className='flex flex-col my-2'>
          <label className='font-bold my-2'>
            Usuario <span className='text-red-500'>*</span>
          </label>
          <input
          className='border border-gray-400 h-12 w-72 rounded-lg'
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
          />
          </div>
  
        <div className='flex flex-col my-4'>
        <label className='font-bold my-2'>
          Password <span className='text-red-500'>*</span>
        </label>
        <input
          className='border border-gray-400 h-12 w-72 rounded-lg'
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            type="password"
          />
        </div>
  
        <div className='btn-iniciar-sesion font-normal shadow-xl text-white text-center border w-80 rounded-md p-2 m-auto mt-10 mb-4'>
        <button className='tracking-wider' type="submit">
          INICIAR SESIÓN
        </button>
        </div>
        <p className='text-center font-medium mt-3 mb-3'>O</p>
        <div className='flex justify-center items-center m-2 gap-8 text-3xl'>
          <Icon icon="devicon:google" />
          <Icon icon="logos:facebook" />
          <Icon className='text-4xl' icon="mdi:github" />
        </div>
        </div>
      </form>
    </div>
  );
  
};

export default Login;
