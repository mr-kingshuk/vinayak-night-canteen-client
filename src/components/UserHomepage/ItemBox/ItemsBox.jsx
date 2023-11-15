import React from 'react';
import styles from './ItemBox.module.css';

import { useOrderContext } from '../../../hooks/useOrderContext.jsx';
import ItemTableItem from '../../ItemsTableAdmin/ItemTableItem';

const ItemsBox = ({ itemGroup }) => {
    const { orderItems, dispatch } = useOrderContext();
    const item = orderItems.find(element => element._id === itemGroup._id);

    const increment = () => {
        dispatch({ type: 'increment', payload: itemGroup });
    }
    const decrement = () => {
        dispatch({ type: 'decrement', payload: itemGroup });
    }

    return (
        <div className={styles.box}>
            <div className={styles.details}>
                <div className={styles.name}>{itemGroup.name}</div>
                <div className={styles.price}>Rs. {itemGroup.price}</div>
            </div>
            <div className={styles.submit_btn}>
                {
                    item ?
                        <>
                            <div onClick={decrement} className={styles.minus}>-</div>
                            <div className={styles.minus}>{item.quantity}</div>
                            <div onClick={increment} className={styles.minus}>+</div>
                        </>
                        :
                        <div onClick={increment}>Add</div>
                }
            </div>
        </div>
    )
}

export default ItemsBox;