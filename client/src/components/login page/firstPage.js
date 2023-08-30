import React from "react";
import img1 from "./iitjammu_4.jpg";
import { Button } from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom'


export function FirstPage(){
    const Navigate=useNavigate();
    const userhandleClick=()=>{
        Navigate('/userLogin');
    }
    const adminHandleClick =()=>{
        Navigate('adminLogin');
    }
    return (
        <div className="firstPageContainer">
            <img src={img1} alt="Logo" className="h-full w-full object-cover"/>
            <div className="buttonContainer flex justify-center items-center gap-16">
            <Button className="bg-blue-600 buttonFirst button" onClick={userhandleClick}>Student</Button>
            <Button className="bg-red-900 buttonFirst  button" onClick={adminHandleClick}>Admin</Button>
            </div>
        </div>
    )
}