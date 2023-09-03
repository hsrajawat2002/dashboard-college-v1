import React from 'react'
import { CarouselCustomNavigation } from './LoginCarousel'
import { AdminLoginForm } from './adminForm'


export function AdminLogin(){

  return (
    <div className='flex justify-center items-center'>
        <div className='sm:hidden'><CarouselCustomNavigation/></div>
        <AdminLoginForm/>
    </div>  
    )
}
