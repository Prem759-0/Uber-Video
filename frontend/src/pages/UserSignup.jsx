import React, { useState  } from 'react'

import logo from '../assets/logo.png';
import {UserDataContext} from '../context/UserContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserSignup = () => {
   const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [firstName, setFirstName] = useState('')
     const [lastName, setLastName] = useState('')
     const [userData, setUserData] = useState('')
     const [passwordError, setPasswordError] = useState('')

     const navigate = useNavigate()

     const [user, setUser] = React.useContext(UserDataContext)

  
     const submitHandler = async (e)=>{
      e.preventDefault();
       const newUser = {
        fullname:{
              firstname:firstName,
              lastname:lastName
            },
            email:email,
            password:password
       }
        
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

       if(response.status === 201){
        const data = response.data

        setUser(data.user)
          localStorage.setItem('token', data.token)
        navigate('/home')
       }

        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
     }

  return (
    <div>
       <div className='p-7 h-screen flex flex-col justify-between'>
     <div>
           <img src={logo} alt="Uber Logo" className="w-16 mb-10" />
    <form onSubmit={(e)=>{
      submitHandler(e)
    }}>

        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-6'>
             <input
                  required 
                   className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                   type="text" 
                    placeholder='First name' 
                    value={firstName}
                    onChange={(e)=>{
                      setFirstName(e.target.value)
                    }}
                />
             <input
                  required 
                   className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base'
                   type="text" 
                    placeholder='Last name' 
                     value={lastName}
                    onChange={(e)=>{
                      setLastName(e.target.value)
                    }}
                />
          </div>

      <h3 className='text-lg font-medium mb-2'>What's your email</h3>

      <input
       required 
        value={email}
                    onChange={(e)=>{
                      setEmail(e.target.value)
                    }}
       className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
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
      {passwordError && <p className='text-red-500 text-sm mb-5'>{passwordError}</p>}
      {!passwordError && <div className='mb-6'></div>}

      <button 
      className='bg-[#111] text-white font-semibold mb-3 rounded-xl px-4 py-2  w-full text-lg placeholder:text-base'
      >Create account</button>

     <p className='text-center font-semibold'>Already have a account?<Link to='/login' className='text-blue-600'>Login here</Link></p> 
    </form>
     </div>

     <div>
        <p className='text-[13px] leading-tight'>
         This site is protected by reCAPTCHA and  the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
     </div>
    </div>
    </div>
  )
}

export default UserSignup
