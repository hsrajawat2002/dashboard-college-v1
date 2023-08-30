import React, { useEffect, useState,useContext } from 'react'
// import { userLogincontext } from "../userContext/userContext";
import { urlcontext } from "../baseURLContext/urlContext";
// import { ComplaintsCard } from '../complaints_items/complaintCard';
import {CleaningCard} from '../cleaning_requests/cleaningCard';
// import { AdminLogincontext } from '../adminContext/adminContext';


export function AdminCleaningList(){
 
    const [list,setList]=useState([]);
    //const list=[{title:"A",description:"b"},{title:"c",description : "C"}];

    // const {}=useContext(AdminLogincontext);
    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const urlHere=`${Base_URL}admin/get-cleaning-requests`;

    const getList= ()=>{
        fetch(urlHere, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials : "include"
        }).then(res=>res.json()).then(data=>setList(data));
    }

    useEffect(()=>{
        getList(); // eslint-disable-next-line
    },[]);

  return (
        <div className='flex flex-wrap gap-12'>
            {list.length>0 && list.map((e,i)=>(<CleaningCard {...e} key={i}/>))}
        </div>
  );
}
