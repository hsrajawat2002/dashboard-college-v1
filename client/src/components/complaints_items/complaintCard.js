import React, { useContext } from 'react';
import { Pending } from './pending';
import { Complete } from './complete';
import { TERipple } from 'tw-elements-react';
import final_blue from '../rs_images/final_blue.jpg'
import final_green from '../rs_images/final_green.jpg'
import { AdminLogincontext } from '../adminContext/adminContext';
import { urlcontext } from '../baseURLContext/urlContext';


export function ComplaintsCard({title,description,completed,date_,_id,setClick,institute_id}) {
  const d= date_.split('T')[0];
  const {adminPresent}=useContext(AdminLogincontext);

  const {Backend_Base_URL}=useContext(urlcontext);
  const Base_URL=Backend_Base_URL;

  const sendData=async(e)=>{
    // const {value}=e.target;
    const urlHere=`${Base_URL}admin/complete-complaint/${_id}`
    // console.log(urlHere);
    try {
      setClick((prev)=>!prev);
      await fetch(urlHere, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          credentials : "include"
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div
        className="w-72 min-w-min block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <a href="#!">
          <img
            className="rounded-t-lg w-full h-32 object-cover"
            src={(completed==="no")?final_blue:final_green}
            alt="" />
        </a>
        <div className="p-6">
          <div className='flex justify-center mb-4 text-xl'>
            {completed==="no"?<Pending/>:<Complete/>}
          </div>
          <h5
            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Title: {title}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Date added: {d} <br/>
            Institute ID :{institute_id}
          </p>
          {/* <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Priority:  
          </p> */}
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Description: {description}
          </p>
          <TERipple>
          {(completed==="no" && adminPresent===true) && 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-green-800" onClick={sendData}>
          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
        </svg>
          }
          </TERipple>
        </div>
      </div>
  );
}