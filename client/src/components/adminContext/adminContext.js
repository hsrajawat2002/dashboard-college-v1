import React, { createContext, useState } from 'react'

export const AdminLogincontext = createContext(null);

const AdminContextProvider = ({ children }) => {

    const [adminId,setAdminId] = useState("");
    const [adminPresent,setAdminPresent]=useState(false);

    return (
        <>
            <AdminLogincontext.Provider value={{adminId,setAdminId,adminPresent,setAdminPresent}}>
                {children}
            </AdminLogincontext.Provider>
        </>
    )
}

export default AdminContextProvider;
