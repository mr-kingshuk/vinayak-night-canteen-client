import React, {useState, useEffect, useRef } from 'react';
import styles from './ReceivedOrders.module.css';

import Modal from './Modal/Modal.jsx';
import { useAuthContext } from '../../hooks/useAuthContext.jsx';

const ReceivedOrders = ({ order, setOrders }) => {
    const modalRef = useRef();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const handler = (event) => {
          if (!modalRef.current.contains(event.target))
            setModal(false);
        };
    
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
      });

    return (
        <div>
            <div className={styles.rowout} onClick={() => setModal(!modal)} style={{background : modal ? "lightgray" : "white"}} ref={modalRef}>
                <div className={styles.id}>{order.orderNumber}</div>
                <div className={styles.name}>{order.userId.name}</div>
                <div className={styles.phone}>{order.userId.phoneNo}</div>
                <div className={styles.time}>{new Date(order.createdAt).toLocaleTimeString()}</div>
                <div className={styles.hostel}>{order.hostel}</div>
            </div>
            {modal && <Modal order={order} setOrders={setOrders} /> }

        </div>
    )
};

export default ReceivedOrders;