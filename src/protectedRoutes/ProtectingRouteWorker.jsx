import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar.jsx';
import styles from './Admin.module.css';

const ProtectingRouteWorker = ({ component }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [isWorker, setIsWorker] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user)
            setIsWorker(false);
        else {
            const checkAdmin = async () => {
                const response = await fetch(`${API_BASE_URL}/api/isWorker`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (response.ok) {
                    const json = await response.json();
                    setIsWorker(true);
                }
                else {
                    const json = await response.json();
                    setIsWorker(false);
                }
            }
            checkAdmin();
        }
    });

    const routing = {
        type: "Worker",
        routes: [
            { key: 1, route: "/workers/items", name: "Items Turn Off" },
            { key: 2, route: "/workers/received", name: "Received Orders" },
        ]
    }

    if (isWorker)
        return <div className={styles.outer}><AdminSidebar routing={routing} />{component}</div>;
    else
        return (<h1>404 NOT FOUND</h1>);
}

export default ProtectingRouteWorker;