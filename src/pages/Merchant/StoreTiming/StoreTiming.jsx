import React, { useState, useEffect } from 'react';
import styles from './StoreTiming.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext';

const StoreTiming = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { user } = useAuthContext();
    const [openTime, setOpenTime] = useState({ openHour: 0, openMin: 0 });
    const [closeTime, setCloseTime] = useState({ closeHour: 0, closeMin: 0 });
    const [loading, setLoading] = useState(false);

    const formatTime = (hour, min) => {
        // Ensure that the hour and minute values are two-digit strings
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMin = min.toString().padStart(2, '0');

        // Create the formatted time string in "hh:mm" format
        return `${formattedHour}:${formattedMin}`;
    };

    useEffect(() => {
        const getTime = async () => {
            const response = await fetch(`${API_BASE_URL}/api/timing/time`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if (response.ok) {
                const json = await response.json();
                setOpenTime({ openHour: json[0].openHour, openMin: json[0].openMin });
                setCloseTime({ closeHour: json[0].closeHour, closeMin: json[0].closeMin });
            }
            else {
                const json = await response.json();
                console.log(json);
            }
        }
        getTime();
    }, []);

    const onSubmitHandler = async () => {
        const body = {...openTime, ...closeTime};
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/timing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ body })
        });

        if (response.ok) {
            const json = await response.json();
            setLoading(false);
            alert("Store Timing changed");
        }
        else {
            const errorData = await response.json();
            setLoading(false);
        }
    };

    const handleOpenTime = (e) => {
        const inputValue = e.target.value;
        const [hours, minutes] = inputValue.split(':');
        setOpenTime({ openHour: Number(hours), openMin: Number(minutes) });
    }

    const handleCloseTime = (e) => {
        const inputValue = e.target.value;
        const [hours, minutes] = inputValue.split(':');

        setCloseTime({ closeHour: Number(hours), closeMin: Number(minutes) });
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>StoreTiming</h1>
            <div className={styles.setTime}>
                <div className={styles.time}>
                    <label htmlFor="timeInput1">Select Open Time:</label>
                    <input
                        type="time"
                        id="timeInput1"
                        value={formatTime(openTime.openHour, openTime.openMin)}
                        onChange={handleOpenTime}
                    />
                </div>
                <div className={styles.time}>
                    <label htmlFor="timeInput2">Select Close Time:</label>
                    <input
                        type="time"
                        id="timeInput2"
                        value={formatTime(closeTime.closeHour, closeTime.closeMin)}
                        onChange={handleCloseTime}
                    />
                </div>
            </div>
            <button style={{cursor: loading ? 'progress':'pointer'}} className={styles.submit_btn} onClick={onSubmitHandler}>Submit</button>
        </div>
    )
}

export default StoreTiming;