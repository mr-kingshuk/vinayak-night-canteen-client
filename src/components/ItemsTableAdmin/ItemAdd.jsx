import React, { useState } from 'react';
import styles from './ItemTableAdmin.module.css';

import { useAuthContext } from '../../hooks/useAuthContext.jsx';

const ItemAdd = ({ itemsCat , categoryId}) => {
    const { user } = useAuthContext();
    const { items, setItems } = itemsCat;
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        const response = await fetch(`http://13.232.148.171/api/fooditems/item/${categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ name, price })
        });

        if (response.ok) {
            const json = await response.json();
            const updatedItem = [...items.items, json];
            const updatedList = { category: items.category, items: updatedItem };
            setItems(updatedList);
            setName("");
            setPrice("");
        }
        else {
            const errorData = await response.json();
            setError(errorData);
        }
    }

    return (
        <div className={styles.box}>
            <form className={styles.add_item} onSubmit={onSubmitHandler}>
                <div className={styles.error}>{error && error.err}</div>
                <div className={styles.fields}>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Item Name"
                        className={error && styles.error_box} />
                    <input
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="Price"
                        className={error && styles.error_box} />
                </div>
                <button className={styles.submit_btn}>Add Item</button>
            </form>
        </div>
    )
}

export default ItemAdd