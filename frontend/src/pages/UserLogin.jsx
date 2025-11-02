import React, { useState } from 'react'

import logo from '../assets/logo.png';
import {UserDataContext} from '../context/UserContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserLogin = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [userData, setUserData] = useState({})
   const [passwordError, setPasswordError] = useState('')

   const navigate = useNavigate()

   const [user, setUser] = React.useContext(UserDataContext)


   const submitHandler = async (e)=>{
    e.preventDefault();

      const userData = {
        email:email,
        password:password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)

      
      if(response.status === 200){
        const data = response.data

        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
       }


      setEmail('')
      setPassword('')
   }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
     <div>
           <img src={logo} alt="Uber Logo" className="w-16 mb-10" />
    <form onSubmit={(e)=>{
      submitHandler(e)
    }}>
      <h3 className='text-lg font-medium mb-2'>What's your email</h3>

      <input
       required 
       value={email}
       onChange={(e)=>{
        setEmail(e.target.value)
       }}
       className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
       type="email" 
       placeholder='email@email.com' 
       />

      <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

      <input 
      required 
       value={password}
       onChange={(e)=>{
        const value = e.target.value
        setPassword(value)
        if (value.length > 0 && value.length < 6) {
          setPasswordError('Password must be at least 6 characters')
        } else {
          setPasswordError('')
        }
       }}
      className={`bg-[#eeeeee] mb-1 rounded px-4 py-2 border w-full text-lg placeholder:text-base ${passwordError ? 'border-red-500' : ''}`}
      type='password' 
      placeholder='password' 
      />
      {passwordError && <p className='text-red-500 text-sm mb-6'>{passwordError}</p>}
      {!passwordError && <div className='mb-7'></div>}

      <button 
      className='bg-[#111] text-white font-semibold mb-3 rounded-xl px-4 py-2  w-full text-lg placeholder:text-base'
      >Login</button>

     <p className='text-center font-semibold'>New here?<Link to='/signup' className='text-blue-600'>Create new Account</Link></p> 
    </form>
     </div>

     <div>
      <Link
      to='/captain-login'
         className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded-xl px-4 py-2  w-full text-lg placeholder:text-base'
      >
        Sign in as Captain
      </Link>
     </div>
    </div>
  )
}

export default UserLogin
