import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";

import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../pages/Homepage/Navbar/Navbar.jsx';

const ProtectingRouteUser = ({ children }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    })

    return (
        <>
            <Navbar />
            {children}
        </>);
}

export default ProtectingRouteUser;