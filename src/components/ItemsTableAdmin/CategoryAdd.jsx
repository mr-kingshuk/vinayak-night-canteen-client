import React, { useState } from 'react';
import styles from './ItemTableAdmin.module.css';

import { useAuthContext } from '../../hooks/useAuthContext.jsx';

const CategoryAdd = ({ itemsCat }) => {
    const { user } = useAuthContext();
    const { items, setItems } = itemsCat;
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        const response = await fetch("http://13.232.148.171/api/fooditems/category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            const json = await response.json();
            const updatedCategory = items.category.push(json);
            const updatedList = { ...items, updatedCategory };
            setItems(updatedList);
            setName("");
        }
        else {
            const errorData = await response.json();
            setError(errorData);
        }
    };
    return (
        <form
            onSubmit={onSubmitHandler}
            className={styles.form}>
            <div className={styles.textbox}>
                <div className={styles.error}>{error && error.err}</div>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Category Name"
                    className={error && styles.error_box} />
            </div>
            <button className={styles.submit_btn}>ADD</button>
        </form>
    )
}

export default CategoryAdd