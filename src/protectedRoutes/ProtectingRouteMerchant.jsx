import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar.jsx';
import styles from './Admin.module.css';

const ProtectingRouteMerchant = ({ component }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [isMerchant, setIsMerchant] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user)
            setIsMerchant(false);
        else {
            const checkAdmin = async () => {
                const response = await fetch(`${API_BASE_URL}/api/isMerchant`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (response.ok) {
                    const json = await response.json();
                    setIsMerchant(true);
                }
                else {
                    const json = await response.json();
                    setIsMerchant(false);
                }
            }
            checkAdmin();
        }
    });

    const routing = {
        type: "Merchant",
        routes: [
            { key: 1, route: "/merchant/orders", name: "Order Details" },
            { key: 2, route: "/merchant/store", name: "Store Details" },
            { key: 3, route: "/merchant/cancelled_orders", name: "Cancelled Orders" },
            { key: 4, route: "/merchant/items_category", name: "Items and Category" },
        ]
    }

    if (isMerchant)
        return <div className={styles.outer}><AdminSidebar routing={routing} />{component}</div>;
    else
        return (<h1>404 NOT FOUND</h1>);
}

export default ProtectingRouteMerchant;