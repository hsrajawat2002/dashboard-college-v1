import React, { createContext, useState } from 'react'

export const urlcontext = createContext(null);

const UrlContextProvider = ({ children }) => {

    const [Backend_Base_URL] = useState("http://localhost:3001/");
    // const [Backend_Base_URL] = useState("https://v1-college-dashboard.onrender.com/");
    
    return (
        <>
            <urlcontext.Provider value={{Backend_Base_URL}}>
                {children}
            </urlcontext.Provider>
        </>
    )
}
export default UrlContextProvider;
