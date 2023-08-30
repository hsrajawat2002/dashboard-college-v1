import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";

import "./loginCar.css";
import { useContext, useState } from "react";
import { AdminLogincontext } from "../adminContext/adminContext";
import { urlcontext } from "../baseURLContext/urlContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
   
  export function AdminLoginForm() {

    const navigate=useNavigate();
    const {setAdminId, setAdminPresent}=useContext(AdminLogincontext);

    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const [userData,setUserData]=useState({
      admin_id:"",
      password:""
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

    const sendData = async (e) => {
      e.preventDefault();
      const { admin_id, password} = userData;
      const urlHere=`${Base_URL}login-admin`;

      console.log(urlHere);

      try {
          const res = await fetch(urlHere, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({admin_id,password}),
              credentials : "include"
          });
            
          await res;
          // console.log(res);

          if (res.status === 200) {
              // const data= res.json();
              setAdminId(admin_id);
              setAdminPresent(true);
              setUserData({...userData,
                admin_id_id:"",
                password:""
              });
              Swal.fire(
                'Login successfull',
                '',
                'success'
              );
              console.log("200 done ");
              navigate('adminLayout/');
          }
          else if(res.status===400){
            Swal.fire(
              'Enter correct credentials',
              '',
              'warning'
            );
            console.log("warning");
          } 
          else {
          
              Swal.fire(
                'Something went wrong',
                'Try again and fill all the fields',
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

    return (
      <div className="registerForm flex justify-center items-center">
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
        Enter credentials to Login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Admin ID" value={userData.admin_id} name="admin_id" onChange={handleChange}/>
            <Input type="password" size="lg" label="Password" value={userData.password} name="password" onChange={handleChange} />
          </div>
            <Button className="mt-6 bg-red-800" fullWidth onClick={sendData}>
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }