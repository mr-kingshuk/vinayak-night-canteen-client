import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar.jsx';

const ProtectingRouteMerchant = ({ component }) => {
    const [isMerchant, setIsMerchant] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user)
            setIsMerchant(false);
        else {
            const checkAdmin = async () => {
                const response = await fetch('http://localhost:3000/api/isMerchant', {
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

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch"
    }

    const routing = {
        type: "Merchant",
        routes: [
            { key: 1, route: "/merchant/orders", name: "Order Details" },
            { key: 2, route: "/merchant/workers", name: "Worker IDs" },
            { key: 3, route: "/merchant/cancelled_orders", name: "Cancelled Orders" },
            { key: 4, route: "/merchant/items_category", name: "Items and Category" }
        ]
    }

    if (isMerchant)
        return <div style={style}><AdminSidebar routing={routing} />{component}</div>;
    else
        return (<h1>404 NOT FOUND</h1>);
}

export default ProtectingRouteMerchant;