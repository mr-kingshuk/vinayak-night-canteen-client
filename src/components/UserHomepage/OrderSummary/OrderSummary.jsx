import React, { useState, useEffect } from 'react';
import styles from './OrderSummary.module.css';

import { useOrderContext } from '../../../hooks/useOrderContext.jsx';

const OrderSummary = () => {
    const { orderItems } = useOrderContext();
    const [total, setTotal] = useState({ price: 0, items: 0 });

    useEffect(() => {
        let totalPrice = 0;
        let totalItems = 0;
        orderItems.map((order) => {
            totalPrice += order.quantity * order.price;
            totalItems += order.quantity;
        });
        setTotal({ price: totalPrice, items: totalItems });
    }, [orderItems]);


    if (orderItems.length > 0)
        return (
            <div className={styles.order_summary}>
                <div className={styles.details}>
                    <div className={styles.price}>Total : Rs. {total.price}</div>
                    <div className={styles.additional}>
                        Additional, Delivery Charges : Rs. 10 
                        <br /> 
                        Packaging Charges : Rs. 10 applys. 
                    </div>
                </div>
                <div className={styles.btn}>
                    <div className={styles.summary_btn}>Order Summary</div>
                    <div className={styles.items}>{total.items}</div>
                </div>
            </div>
        )
    return;
};

export default OrderSummary;