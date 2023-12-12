import React, { useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';

const ProtectingRouteGuest = ({ children }) => {
    const {user} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            navigate('/');
        }
    })

    return <>{children}</>;
}

export default ProtectingRouteGuest;