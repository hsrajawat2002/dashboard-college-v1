import React, { useEffect, useState,useContext } from 'react'
import { userLogincontext } from "../userContext/userContext";
import { urlcontext } from "../baseURLContext/urlContext";
import { ComplaintsCard } from '../complaints_items/complaintCard';


export function ComplaintList(){

    const [list,setList]=useState([]);
    //const list=[{title:"A",description:"b"},{title:"c",description : "C"}];

    const {institute_id_global}=useContext(userLogincontext);
    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const urlHere=`${Base_URL}user/${institute_id_global}/get-complaints`;

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
            {list.length>0 && list.map((e,i)=>(<ComplaintsCard {...e} key={i}/>))}
        </div>
  );
}
