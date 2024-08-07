import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './ItemTurnOff.module.css';

const ItemTurnOff = ({ item }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { user } = useAuthContext();
    const [state, setState] = useState(item.isAvailable);

    const handleChange = async () => {
        setState(!state);
        const response = await fetch(`${API_BASE_URL}/api/fooditems/itemsChange/${item._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (response.ok) {
            const json = await response.json();
            setItems(json.items);
        }
        else {
            const json = await response.json();
            setItems(json);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.name}>{item.name}</div>
            <div onClick={handleChange} className={`${state ? styles.on : styles.off} ${styles.btn}`}>{state ? "On" : "Off" }</div>
        </div>
    )
};

export default ItemTurnOff;