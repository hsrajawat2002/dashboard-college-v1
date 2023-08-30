import React from "react";
import { UserSidebar } from "../usersidebar/usersidebar";

export function UserLayout({socket}){
    return(
        <div>
            <UserSidebar socket={socket}/>
        </div>
    );
}