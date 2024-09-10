// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            const { token, user } = response.data;
            console.log('Login token:', token);
            localStorage.setItem('token', token);
            setUser(user);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            throw new Error('Invalid credentials');
        }
    };

    const register = async (username, email, password, role) => {
        try {
            const response = await axiosInstance.post('/auth/register', { username, email, password, role });
            const { token, user } = response.data;
            console.log('Register token:', token);
            localStorage.setItem('token', token);
            setUser(user);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            throw new Error('Error creating account');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete axiosInstance.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('CheckAuth token:', token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await axiosInstance.get('/auth/me');
                setUser(response.data);
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
