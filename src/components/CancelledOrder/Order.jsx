import React, { useState, useEffect, useRef } from 'react';
import styles from './Order.module.css';
import moment from 'moment/moment';

import Modal from './Modal.jsx';

const Order = ({ order }) => {
    const modalRef = useRef();
    const [modal, setModal] = useState(false);

    //Convert UTC time of MongoDb createdAt to IST 
    const date = moment(order.createdAt).format('Do MMMM, YYYY');
    const time = moment(order.createdAt).format('h:mm A');
    const [dateTime, setDateTime] = useState({ date, time });

    useEffect(() => {
        const handler = (event) => {
            if (!modalRef.current.contains(event.target))
                setModal(false);
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    });

    return (
        <div ref={modalRef}>
            <div className={styles.rowout} onClick={() => !modal && setModal(!modal)} style={{ background: modal ? "lightgray" : "white" }} >
                <div className={styles.id}>{order.orderNumber}</div>
                <div className={styles.name}>{order.userId.name}</div>
                <div className={styles.phone}>{order.userId.phoneNo}</div>
                <div className={styles.date}>{dateTime.date}</div>
                <div className={styles.time}>{dateTime.time}</div>
                <div className={styles.hostel}>{order.hostel}</div>
            </div>
            {modal && <Modal order={order} />}
        </div>
    )
};

export default Order;