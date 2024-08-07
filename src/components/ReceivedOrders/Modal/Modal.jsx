import React, { useState, useEffect } from 'react';
import styles from '../ReceivedOrders.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext.jsx';

const Modal = ({ order, orders, setOrders }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { user } = useAuthContext();
    const [orderD, setOrderD] = useState(null);

    var total = 0;
    useEffect(() => {
        const getOrderD = async () => {
            const response = await fetch(`${API_BASE_URL}/api/orders/order/${order._id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if (response.ok) {
                const json = await response.json();
                setOrderD(json);
            }
            else {
                const json = await response.json();
                console.log(json);
            }
        }
        getOrderD();
    }, []);

    const handleDeliver = async () => {
        const response = await fetch(`${API_BASE_URL}/api/orders/deliver/${order._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            const json = await response.json();
            setOrders(orders.filter((order) => order._id !== json._id));
        }
        else {
            const errorData = await response.json();
            console.log(errorData);
        }
    };

    const handleCancel = async () => {
        const response = await fetch(`${API_BASE_URL}/api/orders/cancel/${order._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            const json = await response.json();
            setOrders(orders.filter((order) => order._id !== json._id));
        }
        else {
            const errorData = await response.json();
            console.log(errorData);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.item_id}>Sr. No.</div>
                    <div className={styles.item_name}>Name</div>
                    <div className={styles.quantity}>Quantity</div>
                    <div className={styles.price}>Price</div>
                </div>
                <hr />
                {orderD && orderD.items.map((item, index) => {
                    total += item.quantity * item.itemPrice;
                    return (
                        <div className={styles.row} key={item._id}>
                            <div className={styles.item_id}>{index + 1}</div>
                            <div className={styles.item_name}>{item.itemName}</div>
                            <div className={styles.quantity}>{item.quantity}</div>
                            <div className={styles.price}>Rs. {item.quantity * item.itemPrice}</div>
                        </div>
                    )
                })}
                <hr />
                <div className={styles.container2}>
                    <div className={styles.header}>SubTotal: </div>
                    <div className={styles.value}>Rs. {total}</div>
                </div>
                <div className={styles.container2}>
                    <div className={styles.header}>Delivery Charges: </div>
                    <div className={styles.value}>Rs. 10</div>
                </div>
                <div className={styles.container2}>
                    <div className={styles.header}>Packaging Charges: </div>
                    <div className={styles.value}>Rs. 10</div>
                </div>
                <hr />
                <div className={styles.container3}>
                    <div className={styles.netTotal}>Total:  </div>
                    <div className={styles.value}>Rs. {total + 20}</div>
                </div>
            </div>
            <div className={styles.btn}>
                <div className={styles.deliver} onClick={handleDeliver}>Deliver</div>
                <div className={styles.cancel} onClick={handleCancel}>Cancel</div>
            </div>
        </div>
    )
}

export default Modal