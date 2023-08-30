import React, { useContext } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  // ListItemSuffix,
  // Chip,
  // Accordion,
  // AccordionHeader,
  // AccordionBody,
} from "@material-tailwind/react";
import {
  // PresentationChartBarIcon,
  // ShoppingBagIcon,
  // UserCircleIcon,
  // Cog6ToothIcon,
  // InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

// import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
// import { userLogincontext } from "../userContext/userContext";
import { AdminLogincontext } from "../adminContext/adminContext";
 
export function SidebarAdmin(){
  
  const {adminId,setAdminPresent}=useContext(AdminLogincontext);
  
  const navigate=useNavigate();
  // const [open, setOpen] = React.useState(0);

  // const changeState=()=>{
  //   setAdminPresent(false);
  // }
 
 <Link to = '/' />
  // const handleOpen = (value) => {
  //   setOpen(open === value ? 0 : value);
  // };

    return(
        <Card className="h-screen sidebar_container p-4 w-fit">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
           ADMIN ID:{adminId}
          </Typography>
        </div>
        <List>
          
          <Link to={'complaintCard'}>
            <ListItem >
              <ListItemPrefix>
                {/* <PresentationChartBarIcon className="h-5 w-5" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                  Complaints
                </Typography>
            </ListItem>
          </Link>
          
          <Link to={'houseKeeping'}>
            <ListItem>
              <ListItemPrefix>
                {/* <ShoppingBagIcon className="h-5 w-5" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                  House Keeping
                </Typography>
            </ListItem>
          </Link>
          
          
          <ListItem onClick={()=>{setAdminPresent(false); navigate('/');}}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal" >
                Log Out
              </Typography>
          </ListItem>
        </List>
      </Card>
    );
}
