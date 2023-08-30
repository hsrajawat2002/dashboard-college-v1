import React, { createContext, useState } from 'react'

export const userLogincontext = createContext(null);

const UserContextProvider = ({ children }) => {

    const [institute_id_global,setInstitute_id] = useState("");

    return (
        <>
            <userLogincontext.Provider value={{institute_id_global, setInstitute_id }}>
                {children}
            </userLogincontext.Provider>
        </>
    )
}

export default UserContextProvider;
