import React, { useState, useEffect } from 'react';
import styles from './ItemTableAdmin.module.css';

import ItemTableItem from './ItemTableItem.jsx';
import ItemAdd from './ItemAdd.jsx';
import { useAuthContext } from '../../hooks/useAuthContext.jsx';

const ItemsTableAdmin = ({ itemsCat }) => {
    const { user } = useAuthContext();
    const { items, setItems } = itemsCat;

    const deleteHandler = async (categoryId) => {
        const response = await fetch(`http://13.232.148.171/api/fooditems/category/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (response.ok) {
            const json = await response.json();

            const updatedCategories = items.category.filter(item => json.category._id !== item._id);
            const updatedItems = items.items.filter(obj => !json.items.some(removeObj => removeObj._id === obj._id));
            const updatedList = { category: updatedCategories, items: updatedItems };
            setItems(updatedList);

        }
        else {
            const json = await response.json();
            console.log(json);
        }
    };

    if (items && items.category.length > 0) {
        return (
            <div className={styles.container}>
                {items.category.map((category) =>
                    <div className={styles.category}>
                        <div className={styles.heading}>
                            <h2>{category.name}</h2>
                            <div className={styles.delete_btn} onClick={() => deleteHandler(category._id)}>Delete</div>
                        </div>
                        <hr />
                        <div className={styles.items}>
                            {items.items.filter((itemGroup) => itemGroup.categoryId === category._id)
                                .map((itemGroup) => <ItemTableItem foodItems={{ items, setItems }} itemGroup={itemGroup} />)
                            }
                            <ItemAdd itemsCat={{ items, setItems }} categoryId={category._id} />
                        </div>
                    </div>
                )}
            </div>
        )
    }
    else
        return;
}

export default ItemsTableAdmin