import React, { useEffect } from 'react';
import styles from './ItemBox.module.css';

import { useOrderContext } from '../../../hooks/useOrderContext.jsx';
import ItemTableItem from '../../ItemsTableAdmin/ItemTableItem';

const ItemsBox = ({ itemGroup }) => {
    const { orderItems, dispatch } = useOrderContext();
    const item = orderItems.find(element => element._id === itemGroup._id);

    const increment = () => {
        if(itemGroup.isAvailable)
            dispatch({ type: 'increment', payload: itemGroup });
    }
    const decrement = () => {
        dispatch({ type: 'decrement', payload: itemGroup });
    }

    useEffect(() => {
        if(!itemGroup.isAvailable){
            dispatch({ type: 'remove_single', payload : itemGroup});
        }
    }, [])
    

    return (
        <div className={`${styles.box} ${!itemGroup.isAvailable ? styles.inactive : null}`}>
            <div className={styles.details}>
                <div className={styles.name}>{itemGroup.name}</div>
                <div className={styles.price}>Rs. {itemGroup.price}</div>
            </div>
            <div className={styles.button}>
                <div className={`${styles.submit_btn} ${!itemGroup.isAvailable ? styles.inactive : null}`}>
                    {
                        item  && itemGroup.isAvailable ?
                            <>
                                <div onClick={decrement} className={styles.minus}>-</div>
                                <div className={styles.minus}>{item.quantity}</div>
                                <div onClick={increment} className={styles.minus}>+</div>
                            </>
                            :
                            <div onClick={increment} style={{ cursor: itemGroup.isAvailable ? 'pointer' : 'not-allowed', background: itemGroup.isAvailable ?  "#00EA6C" : "#6DDB9F"   }} className={styles.add_btn}>Add</div>
                    }
                </div>
                {!itemGroup.isAvailable ? <div className={styles.not_available}>Item Not Available.</div> : null}
            </div>
        </div>
    )
}

export default ItemsBox;