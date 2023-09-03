import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import "./usersidebar.css" ;

  export function UserSidebar({socket}) {
    

    return (
      <div className="flex gap-2">
        <div className="side_container shadow-xl shadow-blue-400/90">
          <Sidebar socket={socket} />
        </div>
        <div className="h-screen w-full p-5">
            <div className="rounded-xl shadow-sm border-2 h-full w-full p-2 overflow-y-auto container-sidebar-overflow">
              <Outlet/>

            </div>
        </div>
      </div>
    );
  }


