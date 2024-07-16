import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ ...decoded, email });
        }
    }, []);

    const login = (token, email) => {
        const decoded = jwtDecode(token);
        setUser({ ...decoded, email });
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
