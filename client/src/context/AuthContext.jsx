import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const login = () => {
        setIsLoggedIn(true);
    }
    const logout = () => {
        setIsLoggedIn(false);
        removeCookie('jwt');
    }
    React.useEffect(() => {
        if (cookies.jwt !== undefined) {
            login()
        }
    }, []); 

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};