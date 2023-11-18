import React, { useState, useEffect, useRef } from 'react';
import styles from './OrderSummary.module.css';

import { useOrderContext } from '../../../hooks/useOrderContext.jsx';
import Checkout from '../Checkout/Checkout.jsx';

const OrderSummary = ({setCheckoutModal}) => {
    const { orderItems } = useOrderContext();
    const modalRef = useRef();
    const [total, setTotal] = useState({ price: 0, items: 0 });
    const [modal, setModal] = useState(false);

    useEffect(() => {
        let totalPrice = 0;
        let totalItems = 0;
        orderItems.map((order) => {
            totalPrice += order.quantity * order.price;
            totalItems += order.quantity;
        });
        setTotal({ price: totalPrice, items: totalItems });
    }, [orderItems]);

    useEffect(() => {
        const handler = (event) => {
            if (!modalRef.current.contains(event.target))
                setModal(false);
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    });


    if (orderItems.length > 0)
        return (
            <div className={styles.order_summary} ref={modalRef}>
                {modal ? <Checkout /> : null}
                <div className={styles.semi_details}>
                    <div className={styles.details}>
                        <div className={styles.price}>Total : Rs. {total.price}</div>
                        <div className={styles.additional}>
                            Additional, Delivery Charges : Rs. 10
                            <br />
                            Packaging Charges : Rs. 10 applys.
                        </div>
                    </div>
                    <div className={styles.btn}>
                        {modal ? <div className={styles.summary_btn} onClick={() => setCheckoutModal(true)}>Checkout</div> : <div className={styles.summary_btn} onClick={() => setModal(true)}>View Cart</div>}
                        <div className={styles.items}>{total.items}</div>
                    </div>
                </div>
            </div>
        )
    return;
};

export default OrderSummary;