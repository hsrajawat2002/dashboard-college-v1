
import { Outlet } from "react-router-dom";
import { SidebarAdmin } from "./sidebar_admin";
import "./usersidebar.css" ;

  export function AdminSidebar() {

    return (
      <div className="flex gap-2">
        <div className="sidebar_container shadow-xl shadow-blue-400/90">
          <SidebarAdmin/>
        </div>
        <div className="main_container p-5">
            <div className="rounded-xl shadow-sm border-2 h-full w-full p-2 overflow-y-auto container-sidebar-overflow">
              <Outlet/>

            </div>
        </div>
      </div>
    );
  }


