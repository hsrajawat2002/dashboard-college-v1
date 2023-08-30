import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import "./loginCar.css";
import { useContext, useState } from "react";
import { urlcontext } from "../baseURLContext/urlContext";
   
  export function SimpleRegistrationForm({handleClick}) {

    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const [userData,setUserData]=useState({
      first_name:"",
      last_name:"",
      email:"",
      contact_no:"",
      password:"",
      c_password:""
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
      const { first_name, last_name, email, contact_no, password, c_password} = userData;
      const urlHere=`${Base_URL}register-user`;
      
      if(!first_name || !last_name || !email || !contact_no || !password || !c_password){
        Swal.fire(
          'Fill all the required fields',
          'Try again',
          'error'
        );
      }
      else if(contact_no.length>10 || contact_no.length<10){
        Swal.fire(
          'Enter the correct contact no.',
          '',
          'warning'
        );
      }
      else if(password.length<8){
        Swal.fire(
          'Weak password',
          'enter a longer password for enhanced security',
          'warning'
        );
      }
      else if(password!==c_password){
        Swal.fire(
          "Password didn't match with the confirm password",
          '',
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
              body: JSON.stringify({ first_name, last_name, email, contact_no, password})
          });
          await res;
          if (res.status === 200) {
              setUserData({...userData,
                first_name:"",
                last_name:"",
                email:"",
                contact_no:"",
                password:"",
                c_password:""
              });
              Swal.fire(
                'Registration Successfull',
                'GO to Sign In',
                'success'
              );
              console.log("200 done ");
          }
          else if(res.status===400){
            Swal.fire(
              'User Already Registered',
              'Go to Sign In',
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
    }

    return (
      <div className="registerForm flex justify-center items-center">
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Register Yourself!
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input required size="lg" label="First Name" name="first_name" value={userData.first_name} onChange={handleChange} />
            <Input required size="lg" label="Last Name" name="last_name" value={userData.last_name} onChange={handleChange} />
            <Input required size="lg" label="Institute Email" name="email" value={userData.email} onChange={handleChange} />
            <Input required type="password" size="lg" label="Password" name="password" value={userData.password} onChange={handleChange} />
            <Input required type="password" size="lg" label="Confirm password" name="c_password" value={userData.c_password} onChange={handleChange} />
            <Input required type="number" size="lg" label="Contact no." name="contact_no" value={userData.contact_no} onChange={handleChange} />
          </div>
            <Button className="mt-6 bg-blue-500" fullWidth onClick={sendData}>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <p className="font-medium text-blue-800" onClick={handleClick}>
                Sign In
              </p>
            </Typography>
          </form>
        </Card>
      </div>
    );
  }