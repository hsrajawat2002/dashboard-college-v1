import React, { useContext } from 'react';
import { TERipple } from 'tw-elements-react';
import { userLogincontext } from '../userContext/userContext';
import { urlcontext } from '../baseURLContext/urlContext';

const lostUurl="https://media.istockphoto.com/id/173017288/photo/red-sign-lost-and-found-sign-nailed-to-a-brick-wall.jpg?s=612x612&w=0&k=20&c=Wrmxa5TI0XdTNVB_r0rP6MePslD8kwA0s9-FXjgc3y0=";

export function UserLostAndFoundCard({itemName,lostDate,description,location_,img_link,gdrive_link,contact_details,_id,institute_id,setClick}) {

  const d=lostDate.split('T')[0];

  const {institute_id_global}=useContext(userLogincontext);
  const {Backend_Base_URL}=useContext(urlcontext);
  const Base_URL=Backend_Base_URL;

  const sendData=async(e)=>{
    const urlHere=`${Base_URL}user/${institute_id_global}/delete-item/${_id}`

    try {
      setClick((prev)=>!prev);
      console.log("dele");
      console.log(urlHere);
      await fetch(urlHere, {
          method: "DELETE",
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
        className="w-72 sm:w-fit block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <a href="#!">
          <img
            className="rounded-t-lg w-full h-40 object-cover"
            src={gdrive_link===""?lostUurl:img_link}
            alt="" />
        </a>
        <div className="p-6">
          <h5
            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Item Name: {itemName}
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Lost Date:  {d} <br/>
            Lost Location: {location_} <br/>
            Description: {description} <br/>
            Contact: {contact_details} <br/>
            Institute Id: {institute_id}
          </p>

          <TERipple>
          {institute_id===institute_id_global && <button value={_id} onClick={sendData}
              type="button"
              className="inline-block bg-blue-700 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              Item Found
            </button>}
          </TERipple>
        </div>
      </div>
  );
}