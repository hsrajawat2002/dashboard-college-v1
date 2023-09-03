import React, { useState } from 'react'
import { CarouselCustomNavigation } from './LoginCarousel'
import { SimpleRegistrationForm } from './userRegisterForm'
import { LoginRegistrationForm } from './userLoginForm';
// import { Outlet } from 'react-router-dom';


export function Login(){
  const [loginVar,setLoginVar]=useState(0);
  const handleClick=()=>{
    setLoginVar((prev)=> !prev);
  }

  return (
    <div className='flex justify-center items-center'>
        <div className='sm:hidden'><CarouselCustomNavigation/></div>
        {loginVar?<SimpleRegistrationForm handleClick={handleClick}/>:<LoginRegistrationForm handleClick={handleClick}/>}
    </div>  
    )
}
