import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { userLogincontext } from "../userContext/userContext";
import { urlcontext } from "../baseURLContext/urlContext";

   
  export function UserClenaingRequestForm() {
    
    const {institute_id_global}=useContext(userLogincontext);
    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const [userData,setUserData]=useState({
      room_no:"",
      cleaning_date:"",
      time_begin_hour:"",
      time_begin_minute:"",
      time_end_hour:"",
      time_end_minute:"",
  });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((pre) => {
          return {
              ...pre,
              [name]: value
          }
      })
    };
    
    const handle_end = (e) => {
      setUserData((pre) => {
          return {
              ...pre,
              ["time_end_minute"]: e
          }
      })
    };
    
    const handle_begin = (e) => {
      setUserData((pre) => {
          return {
              ...pre,
              ["time_begin_minute"]: e
          }
      })
    };

    const sendData = async (e) => {
      e.preventDefault();
      const {room_no,cleaning_date,time_begin_hour,time_begin_minute,time_end_hour, time_end_minute} = userData;
      const urlHere=`${Base_URL}user/${institute_id_global}/register-cleaning-request`;

      if(!room_no || !cleaning_date || !time_begin_hour || !time_end_hour || !time_begin_minute || !time_end_minute){
          Swal.fire(
            'Fill all the required fields',
            'Try again',
            'warning'
          );
        }
        else if((time_begin_hour<0) || (time_begin_hour>23)  || (time_end_hour<0) || (time_end_hour>23) 
        ||(time_end_hour<time_begin_hour) ){
          Swal.fire(
            'Enter the hours correctly',
            'Try again',
            'warning'
          );
      }
      else{
        try {
            const res = await fetch(urlHere, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({room_no,cleaning_date,time_begin_hour,time_begin_minute,time_end_hour, time_end_minute}),
                credentials : "include"
            });

            await res;

            if (res.status === 200) {
                console.log("this ", institute_id_global);
                setUserData({
                  room_no:"",
                  cleaning_date:"",
                  time_begin_hour:"",
                  time_begin_minute:"",
                  time_end_hour:"",
                  time_end_minute:"",
              });
                Swal.fire(
                  'Request Added',
                  '',
                  'success'
                );
                console.log("200 done ");
            }
            else {
            
                Swal.fire(
                  'Something went wrong',
                  '',
                  'error'
                );
                console.log("not done");
            }
        } catch (error) {
            Swal.fire(
              'Something went wrong',
              'Try again and fill all the fields',
              'error'
            );
            console.log(error);
        }
      }
    }

    return (
      <div className="registerForm flex justify-center items-center">
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
        Add cleaning request
        </Typography> 
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" >
          <div className="mb-4 flex flex-col gap-6">
            <Input type="Number" size="lg" label="Room No." value={userData.room_no} name="room_no" onChange={handleChange} />
            <Input type="date" size="lg" label="Date: " value={userData.cleaning_date} name="cleaning_date" onChange={handleChange} />
            <Input type="Number" size="lg" label="Hours Start: " value={userData.time_begin_hour} name="time_begin_hour" onChange={handleChange} />
            <Select label="Minutes Start: " onChange={handle_begin}>
              <Option value="00">00</Option>
              <Option value="15">15</Option>
              <Option value="30">30</Option>
              <Option value="45">45</Option>
            </Select>
            <Input type="Number" size="lg" label="Hours end: " value={userData.time_end_hour} name="time_end_hour" onChange={handleChange} />
            <Select label="Minutes End: " onChange={handle_end}>
              <Option value="00">00</Option>
              <Option value="15">15</Option>
              <Option value="30">30</Option>
              <Option value="45">45</Option>
            </Select>
          </div>
            <div className="w-full h-full flex justify-center">
                <Button className="mt-6  bg-blue-500 w-36" onClick={sendData}>
                  Add
                </Button>
            </div>
            
          </form>
        </Card>
      </div>
    );
  }