import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../pages/Homepage/Navbar/Navbar.jsx';

const ProtectingRouteUser = ({ component }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
     if(!user)
        navigate("/login");
    }, [user])
       
    return <><Navbar />{component}</>;
}

export default ProtectingRouteUser;