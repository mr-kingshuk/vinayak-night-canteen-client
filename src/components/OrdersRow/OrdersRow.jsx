import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrdersRow.module.css';
import { parse, format } from 'date-fns';

const OrdersRow = ({ order }) => {
    const navigate = useNavigate();
    const date = new Date(order.createdAt).toLocaleDateString();
    const time = new Date(order.createdAt).toLocaleTimeString();
    const [dateTime, setDateTime] = useState({ date, time });

    useEffect(() => {
        const handleDay = (date) => {
            const parsedDate = parse(date, 'MM/dd/yyyy', new Date());
            const formattedDate = format(parsedDate, 'do MMMM, yyyy');
            return formattedDate;
        }
        const handleTime = (time) => {
            const parsedTime = parse(time, 'h:mm:ss a', new Date());
            const formattedTime = format(parsedTime, 'h:mm a');
            return formattedTime;
        }
        setDateTime({date : handleDay(dateTime.date), time : handleTime(dateTime.time)});
    }, [])

    return (
        <div className={styles.rows}>
            <div className={styles.id}>{order.orderNumber}</div>
            <div className={styles.date}>{dateTime.date}</div>
            <div className={styles.time}>{dateTime.time}</div>
            <div className={styles.hostel}>{order.hostel}</div>
            <div className={styles.status} style={{ "color": order.status === "Accepted" ? "#FFA500" : order.status === "Delivered" ? "#43A905" : "#CB072B" }}>{order.status}</div>
            <div className={styles.btn} onClick= {() => navigate(`/${order._id}`) }>
                <div className={styles.view_order}>View Order</div>
            </div>
        </div>
    )
};

export default OrdersRow;