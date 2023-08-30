import React, { useEffect, useState,useContext } from 'react'
import { userLogincontext } from "../userContext/userContext";
import { urlcontext } from "../baseURLContext/urlContext";
import { UserLostAndFoundCard } from '../lost_and_found/lostAndFoundCard';


export function LostList(){

    const [list,setList]=useState([]);
    const [mylist,setMylist]=useState([]);
    const [click,setClick]=useState(true);

    const {institute_id_global}=useContext(userLogincontext);
    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const urlHere=`${Base_URL}user/${institute_id_global}/get-lost-items`;

    const getList= ()=>{
        fetch(urlHere, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials : "include"
        }).then(res=>res.json()).then((data)=>{
            // setList(data);
            const n=data.filter((e)=>{return e.institute_id===institute_id_global});
            setMylist(n);
            const n1=data.filter((e)=>{return e.institute_id!==institute_id_global});
            setList(n1);
        });
    }

    useEffect(()=>{
        getList(); // eslint-disable-next-line
    },[click]);

  return (
        <div className='flex flex-wrap gap-12'>
            {mylist.length>0 && mylist.map((e,i)=>(<UserLostAndFoundCard setClick={setClick} {...e} key={i}/>))}
            {list.length>0 && list.map((e,i)=>(<UserLostAndFoundCard {...e} key={i}/>))}
            
        </div>
  );
}
