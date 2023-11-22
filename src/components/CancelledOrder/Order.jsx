import React, {useState, useEffect, useRef } from 'react';
import styles from './Order.module.css';
import { parse, format } from 'date-fns';

import Modal from './Modal.jsx';

const Order = ({ order }) => {
    const modalRef = useRef();
    const [modal, setModal] = useState(false);
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
            <div className={styles.rowout} onClick={() => !modal && setModal(!modal)} style={{background : modal ? "lightgray" : "white"}} >
                <div className={styles.id}>{order.orderNumber}</div>
                <div className={styles.name}>{order.userId.name}</div>
                <div className={styles.phone}>{order.userId.phoneNo}</div>
                <div className={styles.date}>{dateTime.date}</div>
                <div className={styles.time}>{dateTime.time}</div>
                <div className={styles.hostel}>{order.hostel}</div>
            </div>
            {modal && <Modal order={order}  /> }
        </div>
    )
};

export default Order;