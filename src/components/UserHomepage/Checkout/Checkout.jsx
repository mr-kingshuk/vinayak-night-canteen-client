import React from 'react';
import styles from './Checkout.module.css';

import { useOrderContext } from '../../../hooks/useOrderContext.jsx';
import CheckoutItem from './CheckoutItem/CheckoutItem.jsx';

const Checkout = () => {
    const { orderItems } = useOrderContext();
    return (
        <div className={styles.outer}>
            <div className={styles.heading}>Your Order Summary:</div>
            <hr />
            <div className={styles.table}>
                {orderItems.map((item) => <CheckoutItem item={item} key={item._id}/>)}
            </div>
        </div>
    )
};

export default Checkout;