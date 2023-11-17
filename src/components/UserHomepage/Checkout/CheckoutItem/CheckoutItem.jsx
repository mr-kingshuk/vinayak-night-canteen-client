import React from 'react';

import styles from './CheckoutItem.module.css';
import { useOrderContext } from '../../../../hooks/useOrderContext';

const CheckoutItem = ({ item }) => {
    const { dispatch } = useOrderContext();

    const increment = () => {
        dispatch({ type: 'increment', payload: item });
    }
    const decrement = () => {
        dispatch({ type: 'decrement', payload: item });
    }
    return (
        <div className={styles.container}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.quantity}>
                <div onClick={decrement} className={styles.decrement}>-</div>
                <div>{item.quantity}</div>
                <div onClick={increment} className={styles.increment}>+</div>
            </div>
            <div className={styles.price}>Rs. {item.quantity*item.price}</div>
        </div>
    )
};

export default CheckoutItem;