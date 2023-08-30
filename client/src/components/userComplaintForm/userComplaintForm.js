import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
  } from "@material-tailwind/react";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { userLogincontext } from "../userContext/userContext";
import { urlcontext } from "../baseURLContext/urlContext";

   
  export function UserComplaintForm() {

    const {institute_id_global}=useContext(userLogincontext);
    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const [userData,setUserData]=useState({
      title:"",
      description:"",
      location:"",
      img_link:""
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
      const {  title,  description,  location,  img_link} = userData;
      const urlHere=`${Base_URL}user/${institute_id_global}/register-complaint`;

      console.log(urlHere);
      if(!title || !description || !location){
        Swal.fire(
          'Fill all the required fields',
          'Try again and fill all the fields',
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
              body: JSON.stringify({  title,  description,  location,  img_link}),
              credentials : "include"
          });
            
          await res;

          if (res.status === 200) {
              console.log("this ", institute_id_global);
              setUserData({
                title:"",
                description:"",
                location:"",
                img_link:""
              });
              Swal.fire(
                'Complaint Registered',
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
        Register New Complaint
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input required size="lg" label="Title" name="title" value={userData.title} onChange={handleChange}/>
            <Input required size="lg" label="Location If any" name="location" value={userData.location} onChange={handleChange}/>
            <Input size="lg" label="Image Link If any" name="img_link" value={userData.img_link} onChange={handleChange}/>
            <Textarea required type="text" size="lg" label="Description *" name="description" value={userData.description} onChange={handleChange}/>

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