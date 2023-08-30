import React, { useEffect, useState,useContext } from 'react'
import { userLogincontext } from "../userContext/userContext";
import { urlcontext } from "../baseURLContext/urlContext";
import { CleaningCard } from '../cleaning_requests/cleaningCard';


export function CleaningList(){

    const [list,setList]=useState([]);
    const [click,setClick]=useState(true);

    const {institute_id_global}=useContext(userLogincontext);
    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const urlHere=`${Base_URL}user/${institute_id_global}/get-cleaning-requests`;

    const getList= ()=>{
        // console.log("here called url");
        // console.log(urlHere);
        fetch(urlHere, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials : "include"
        }).then(res=>res.json()).then(data=>setList(data));
    }

    useEffect(()=>{
        let r=true;
        if(r){
            getList();
        }
        return r=>!r; // eslint-disable-next-line
    },[click]);

  return (
        <div className='flex flex-wrap gap-12'>
            {list.length>0 && list.map((e,i)=>(<CleaningCard setClick={setClick} {...e} key={i}/>))}
            
        </div>
  );
}
