import './App.css';
import React from "react";
import { Login } from "./components/login page/login";
import { FirstPage } from "./components/login page/firstPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AdminLogin } from './components/login page/adminLogin';
import { UserLayout } from './components/userlayout/userlayout';
import { UserComplaintForm } from './components/userComplaintForm/userComplaintForm';
import { UserLostNFoundForm } from './components/userLostAndFoundForm/userLostAndFoundForm';
import { UserClenaingRequestForm } from './components/userCleaningRequestForm/userCleaningRequestForm';
import { ComplaintList } from './components/complaintList/complaintList';
import { CleaningList } from './components/cleaningList/cleaningList';
import { LostList } from './components/lostItemList/lostList';
import { AdminSidebar } from './components/adminSidebar/adminSidebar';
import { AdminComplaintList } from './components/adminComplaintList/complaintList';
import { AdminCleaningList } from './components/adminCleaningList/adminCleaning';
import ChatComponent from './components/chat/chat';

import io from "socket.io-client";
const socket= io.connect("http://localhost:3001");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FirstPage/>} />
        <Route path="/userLogin/" element={<Login/>} />
        <Route path="/adminLogin/" element={<AdminLogin/>} />
        <Route path="/userLogin/userlayout/" element={<UserLayout socket={socket}/>}>
          <Route path='complaintCard' element={<ComplaintList/>}/>
          <Route path='complaintForm' element={<UserComplaintForm/>}/>
          <Route path='lostItemForm' element={<UserLostNFoundForm/>}/>
          <Route path='cleaningRequestForm' element={<UserClenaingRequestForm/>}/>
          <Route path='houseKeeping' element={<CleaningList/>}/>
          <Route path='lostNFound' element={<LostList/>}/>
          <Route path='discussion' element={<ChatComponent socket={socket}/>}/>
        </Route>
        
        
        <Route path="/adminLogin/adminLayout" element={<AdminSidebar/>}>
          <Route path='complaintCard' element={<AdminComplaintList/>} />
          <Route path='houseKeeping' element={<AdminCleaningList/>} />
        </Route>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
