import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { useAuthContext } from '../hooks/useAuthContext';

const ProtectingRouteGuest = ({ component, fallback }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
   
    useEffect(() => {
        if(user)
           navigate(fallback);
        }, [user])
        
    return component;
}

export default ProtectingRouteGuest;