import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContextProvider from './components/userContext/userContext';
import UrlContextProvider from './components/baseURLContext/urlContext';
import AdminContextProvider from './components/adminContext/adminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AdminContextProvider>
        <UserContextProvider>
            <UrlContextProvider>
                <App />
            </UrlContextProvider>
        </UserContextProvider>
    </AdminContextProvider>
);

