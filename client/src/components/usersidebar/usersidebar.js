
import { Outlet } from "react-router-dom";
// import { CleaningCard } from "../cleaning_requests/cleaningCard";
// import { ComplaintsCard } from "../complaints_items/complaintCard";
// import { UserLostAndFoundCard } from "../lost_and_found/lostAndFoundCard";
// import { UserClenaingRequestForm } from "../userCleaningRequestForm/userCleaningRequestForm";
// import { UserComplaintForm } from "../userComplaintForm/userComplaintForm";
// import { UserLostNFoundForm } from "../userLostAndFoundForm/userLostAndFoundForm";
import { Sidebar } from "./sidebar";
import "./usersidebar.css" ;
  // shadow-blue-gray-900/5

  export function UserSidebar({socket}) {
    

    return (
      <div className="flex gap-2">
        <div className="sidebar_container shadow-xl shadow-blue-400/90">
          <Sidebar socket={socket} />
        </div>
        <div className="main_container p-5">
            <div className="rounded-xl shadow-sm border-2 h-full w-full p-2 overflow-y-auto container-sidebar-overflow">
              <Outlet/>

            </div>
        </div>
      </div>
    );
  }


