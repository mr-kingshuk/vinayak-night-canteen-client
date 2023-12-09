import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrdersRow.module.css';
import moment from 'moment/moment';

const OrdersRow = ({ order }) => {
    const navigate = useNavigate();
    const date = moment(order.createdAt).format('Do MMMM, YYYY');
    const time = moment(order.createdAt).format('h:mm A');
    const [dateTime, setDateTime] = useState({ date, time });

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