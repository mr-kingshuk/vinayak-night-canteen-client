import React, {useState, useEffect, useRef } from 'react';
import styles from './ReceivedOrders.module.css';
import Modal from './Modal/Modal.jsx';

import moment from 'moment/moment';

const ReceivedOrders = ({ order, orders, setOrders }) => {
    const modalRef = useRef();
    const [modal, setModal] = useState(false);

    return (
        <div ref={modalRef}>
            <div className={styles.rowout} onClick={() => setModal(!modal)} style={{background : modal ? "lightgray" : "white"}} >
                <div className={styles.id}>{order.orderNumber}</div>
                <div className={styles.name}>{order.userId.name}</div>
                <div className={styles.phone}>
                    <a href={`tel:${order.userId.phoneNo}`}>{order.userId.phoneNo}</a>
                </div>
                <div className={styles.time}>{moment(order.createdAt).format('h:mm A')}</div>
                <div className={styles.hostel}>{order.hostel}</div>
            </div>
            {modal && <Modal order={order} orders={orders} setOrders={setOrders} /> }
        </div>
    )
};

export default ReceivedOrders;