import{
    Input
} from "@material-tailwind/react"

import React, { useEffect, useRef, useState } from "react";
// import nameurl from "../nameurl";
import "./chat.css";
import Swal from 'sweetalert2'


const ChatComponent=({socket})=>{
    const [data,setData]=useState([]);
    const [messageList,setMessageList]=useState([]);
    // const {name,setName}=useState([]);
    
    const ref = useRef(null);
    
    useEffect(() => {
        if (messageList.length) {
          ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, [messageList.length]);
    

    const handlemessage=()=>{
        console.log("sent");
        if(!data){
            Swal.fire(
                '',
                'Cannot Send empty message',
                'warning'
            );
        }
        else{
            socket.emit("send-message",{message:data});
            setData('');
        }
    }

    useEffect(()=>{
        console.log("rrr");
        socket.on("recieve-message",(data)=>{
            setMessageList((prev)=>[...prev,data]);
            console.log("harry");
        });
        return ()=>socket.off("recieve-message")
    },[socket]);

    useEffect(() => {
        console.log("harry 123");
        socket.on("messages-all" ,(data) => {
            console.log("here it is");
            if(data){setMessageList(data); console.log("called");};
        });
        return ()=> socket.off("messagesall");
    }
    ,[socket])

    return(
        <div className="w-full h-full flex flex-col justify-center p-2">

            <div className="flex w-full justify-center items-center text-xl font-bold">Anonymous Discussions</div>

            <div className="rounded-xl chat-body-container flex justify-center">
                <div className="w-1/2 rounded-xl border-2 overflow-y-auto chat-container p-2 scroll-auto bg-gradient-to-br from-purple-50 to-blue-100">
                    {messageList?.map((e,i)=>(
                        <div key={i} className="chat chat-start "><div className="chat-bubble w-48 bg-blue-700">{e.message}</div></div>
                    ))}
                    <div ref={ref} />

                    {/* <div className="chat chat-start"><div className="chat-bubble w-48">It's over Anakin,also i have give I have the high ground.</div></div> */}
                </div>
            </div>


            <div className="rounded-xl  form-container flex justify-center">
                <div className="w-1/2 flex justify-center ">
                    <div className="h-full flex justify-center items-center input-container pl-2">
                        <Input size="lg" label="write new message" type="text" value={data} name="data" onChange={(e)=>setData(e.target.value)}/>
                    </div>
                    <div className="h-full flex justify-center items-center svg-container">
                        <svg onClick={handlemessage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 tick-sign">
                          <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                        </svg>
                    </div>

                </div>
            </div>
            {/* <div className="inline-block">
                {messageList?.map((e,i)=>(<div key={i}>{e.message}</div>))}
            </div>
            <input type="text" value={data} name="data" onChange={(e)=>setData(e.target.value)}/>
            <button onClick={handlemessage}>click</button> */}
        </div>

    );
}

export default ChatComponent;