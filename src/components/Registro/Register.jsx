import React, { useState } from 'react';
import F from '../../assets/FFun.png'
import {Icon} from '@iconify/react'
import { useNavigate } from 'react-router-dom';

export default function Register({ setUserData }) {
  const [userData, setLocalUserData] = useState({ username: '', password: '', email: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Crea una instancia de useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ... Validaciones y solicitud ...

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User registered successfully!');
        setLocalUserData({ username: '', password: '', email: '' });
        setUserData({ username: '', password: '', email: '' });
        navigate('/login'); // Asegúrate de que '/login' sea la ruta correcta para tu componente Login
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // ... Manejo de errores ...
    }

    setLoading(false);
  };

  return (
    <div>
      <div className='flex justify-center items-center my-8 bg-white'>
        <img className='w-9 h-12' src={F} alt="" />
      </div>
      <form onSubmit={handleSubmit} className=''>
        
        <h2 className='register text-center my-2 font-bold text-2xl'>REGISTRATE</h2>
       
        <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col my-4'>
          <label className='font-bold my-2'>
            Usuario <span className='text-red-500'>*</span>
          </label>
          <input className='border border-gray-400 h-12 w-72 rounded-lg' name="username" value={userData.username} onChange={handleInputChange} />
        </div>

       <div className='flex flex-col'>
        <label className='font-bold my-2'>
            Email <span className='text-red-500'>*</span>
          </label>
          <input className='border border-gray-400 h-12 w-72 rounded-lg' name="email" value={userData.email} onChange={handleInputChange} />
       </div>

       <div className='flex flex-col'>
       <label className='font-bold my-2'>
          Contraseña <span className='text-red-500'>*</span>
        </label>
        <input
            className='border border-gray-400 h-12 w-72 rounded-lg'
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            type="password"
          />
       </div>
        </div>
        <div className='font-normal bg-orange-500 shadow-xl text-white text-center border w-80 rounded-md p-2 m-auto mt-16 mb-4'>
        <button className='tracking-wider' type="submit">
          REGISTRAR
        </button>
        </div>
        <p className='text-center font-medium'>O</p>
        <div className='flex justify-center items-center m-4 gap-8 text-3xl'>
          <Icon icon="devicon:google" />
          <Icon icon="logos:facebook" />
          <Icon className='text-4xl' icon="mdi:github" />
        </div>
      </form>
    </div>
  );
}
