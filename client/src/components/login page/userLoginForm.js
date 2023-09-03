import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import "./loginCar.css";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { urlcontext } from "../baseURLContext/urlContext";
import { userLogincontext } from "../userContext/userContext";
import { useNavigate } from "react-router-dom";

   
  export function LoginRegistrationForm({handleClick}) {

    const navigate=useNavigate();
    const {institute_id_global,setInstitute_id}=useContext(userLogincontext);

    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const [userData,setUserData]=useState({
      institute_id:"",
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
      const { institute_id, password} = userData;
      const urlHere=`${Base_URL}login-user`;

      console.log(urlHere);

      try {
          const res = await fetch(urlHere, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({institute_id, password}),
              credentials : "include"
          });
            
          await res;
          // console.log(res);

          if (res.status === 200) {
              // const data= res.json();
              setInstitute_id(institute_id);
              console.log("this ", institute_id_global);
              setUserData({...userData,
                institute_id:"",
                password:""
              });
              Swal.fire(
                'Login successfull',
                '',
                'success'
              );
              console.log("200 done ");
              navigate('userlayout/');
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
        Enter your details to Login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-80">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Institute ID" name="institute_id" value={userData.institute_id} onChange={handleChange} />
            <Input type="password" size="lg" label="Password" name="password" value={userData.password} onChange={handleChange}/>
          </div>
            <Button className="mt-6 bg-blue-500" fullWidth onClick={sendData}>
              Sign In
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <p className="font-medium text-blue-800" onClick={handleClick}>
                Register
              </p>
            </Typography>
          </form>
        </Card>
      </div>
    );
  }