import React, { useState, useEffect } from 'react';
import styles from './Order.module.css';

import { useAuthContext } from '../../hooks/useAuthContext.jsx';

const Modal = ({ order }) => {
    const { user } = useAuthContext();
    const [orderD, setOrderD] = useState(null);

    var total = 0;
    useEffect(() => {
        const getOrderD = async () => {
            const response = await fetch(`http://localhost:3000/api/orders/order/${order._id}`, {
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

    return (
        <div className={styles.modal}>
            {orderD && <div className={styles.payment_id}>
                <div><strong>Razorpay Order Id: </strong>{orderD.order.razorpayOrderId}</div>
                <div><strong>Razorpay Payment Id: </strong>{orderD.order.razorpayPaymentId}</div>
            </div>}
            <div className={styles.table}>
                <div className={styles.header}>
                    <div className={styles.item_id}>Sr. No.</div>
                    <div className={styles.item_name}>Item Name</div>
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
        </div>
    )
}

export default Modal;