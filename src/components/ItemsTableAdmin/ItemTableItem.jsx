import React from 'react';
import styles from './ItemTableAdmin.module.css';

import { useAuthContext } from '../../hooks/useAuthContext.jsx';

const ItemTableItem = ({ foodItems, itemGroup }) => {
    const { user } = useAuthContext();
    const { items, setItems } = foodItems;
    

    const deleteHandler = async () => {
        const response = await fetch(`http://13.232.148.171/api/fooditems/item/${itemGroup._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (response.ok) {
            const json = await response.json();
            const updatedItems = items.items.filter(item => json._id !== item._id);
            const updatedList = { ...items, items: updatedItems };
            setItems(updatedList);
        }
        else {
            const json = await response.json();
            console.log(json);
        }
    };

    return (
        <div className={styles.box}>
            <div className={styles.name}>{itemGroup.name}</div>
            <div className={styles.price_delete}>
                <div className={styles.price}>Rs. {itemGroup.price}</div>
                <div className={styles.delete_btn} onClick={deleteHandler}>Delete</div>
            </div>
        </div>
    )
}

export default ItemTableItem;