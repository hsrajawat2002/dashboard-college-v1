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
   
  export function UserLostNFoundForm() {
    
    const {institute_id_global}=useContext(userLogincontext);
    const {Backend_Base_URL}=useContext(urlcontext);
    const Base_URL=Backend_Base_URL;

    const [userData,setUserData]=useState({
      itemName:"",
      lostDate:"",
      description:"",
      gdrive_link:"",
      contact_details:"",
      location_:""
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
      const {itemName, lostDate, description, gdrive_link, contact_details,location_} = userData;
      const urlHere=`${Base_URL}user/${institute_id_global}/register-lost-item`;
      // console.log(contact_details.length);
      // console.log(urlHere);

      if(!itemName || !lostDate || !description || !contact_details || !location_){
        Swal.fire(
          'Fill all the required fields',
          '',
          'warning'
        );
      }
      else if(contact_details.length<10 || contact_details.length>10){
        Swal.fire(
          'Enter the contact details correctly',
          'check the mobile no. and try again',
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
              body: JSON.stringify({itemName, lostDate, description, gdrive_link, contact_details, location_}),
              credentials : "include"
          });
            
          await res;
        
          if (res.status === 200) {
              console.log("this ", institute_id_global);
              setUserData({
                itemName:"",
                lostDate:"",
                description:"",
                gdrive_link:"",
                contact_details:"",
                location_:""
            });
              Swal.fire(
                'Item Added',
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
        Enter Details of the Lost item
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Item Name" required value={userData.itemName} name="itemName" onChange={handleChange} />
            <Input type="date" size="lg" required label="Lost Date: " value={userData.lostDate} name="lostDate" onChange={handleChange} />
            <Input size="lg" required  label="Location" value={userData.location_} name="location_" onChange={handleChange}/>
            <Textarea type="text" required  size="lg" label="Description" value={userData.description} name="description" onChange={handleChange} />
            <Input size="lg" label="Gdrive Image Link: " value={userData.gdrive_link} name="gdrive_link" onChange={handleChange} />
            <Input type="number" size="lg" label="Contact no: " required  value={userData.contact_details} name="contact_details" onChange={handleChange} />

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