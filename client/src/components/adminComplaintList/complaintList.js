import React, { useEffect, useState,useContext } from 'react'
// import { userLogincontext } from "../userContext/userContext";
import { urlcontext } from "../baseURLContext/urlContext";
import { ComplaintsCard } from '../complaints_items/complaintCard';
// import { AdminLogincontext } from '../adminContext/adminContext';


export function AdminComplaintList(){

    const [list,setList]=useState([]);
    const [click,setClick]=useState(true);
    // const [call,setCall]=useState(true);
    //const list=[{title:"A",description:"b"},{title:"c",description : "C"}];

    // const {}=useContext(AdminLogincontext);
    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const urlHere=`${Base_URL}admin/get-complaints`;

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
        let r=true;
        if(r){
            getList();
            console.log("hellow");
        }
        return r=>!r // eslint-disable-next-line
    },[click]);

  return (
        <div className='flex flex-wrap gap-12'>
            {list.length>0 && list.map((e,i)=>(<ComplaintsCard setClick={setClick} {...e} key={i}/>))}
        </div>
  );
}
