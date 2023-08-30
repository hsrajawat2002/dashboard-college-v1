import React, { useContext } from 'react';
import { TERipple } from 'tw-elements-react';
import { Pending } from './pending';
import { Complete } from './complete';
import { userLogincontext } from '../userContext/userContext';
import { urlcontext } from '../baseURLContext/urlContext';
import final_blue from '../rs_images/final_blue.jpg'
import final_green from '../rs_images/final_green.jpg'
import { AdminLogincontext } from '../adminContext/adminContext';

export function CleaningCard({room_no, cleaning_date,time_begin_hour,time_begin_minute,time_end_hour,time_end_minute, _id,completed,setClick}) {
  const d= cleaning_date.split('T')[0];
  
  const {institute_id_global}=useContext(userLogincontext);
  const {Backend_Base_URL}=useContext(urlcontext);
  const {adminPresent}=useContext(AdminLogincontext);
  const Base_URL=Backend_Base_URL;

  const sendData=async(e)=>{
    const {value}=e.target;
    const urlHere=`${Base_URL}user/${institute_id_global}/update-cleaning/${value}`
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
        className="w-88 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <a href="#!">
          <img
            className="rounded-t-lg w-full h-32 object-cover"
            src={completed==="no"?final_blue:final_green}
            alt="" />
        </a>
        <div className="p-6">
          <div className='flex justify-center text-xl'>{completed==="no"?<Pending/>:<Complete/>}</div>
          <h5
            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Room No. : {room_no}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Date: {d} <br/>
            Time availability- <br/>
            From {time_begin_hour}:{time_begin_minute} to {time_end_hour}:{time_end_minute} 
          </p>
          <TERipple>
            {(completed==="no" && adminPresent===false) && <button value={_id} onClick={sendData}
              type="button"
              className="inline-block bg-blue-700 rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              Done ?
            </button>}
          </TERipple>
        </div>
      </div>
  );
}