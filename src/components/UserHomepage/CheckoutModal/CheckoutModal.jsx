import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutModal.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext.jsx';
import { useOrderContext } from '../../../hooks/useOrderContext.jsx' 

const CheckoutModal = ({ setCheckoutModal }) => {
    const navigate = useNavigate();
    const modalRef = useRef();
    const { user, userDetails } = useAuthContext();
    const { orderItems, dispatch } = useOrderContext();
    let order;

    const handleSubmit = async () => {
        setCheckoutModal(false);
        let body = [];
        let itemInfo;
        orderItems.map((item) => {
            itemInfo = { _id: item._id, name : item.name, price: item.price, quantity : item.quantity};
            body.push(itemInfo);
        });
        order = {order : body};

        const response = await fetch("http://localhost:3000/api/orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            const { orderDocRef, total } = await response.json();

            //Getting API KEY of razorpay
            const res = await fetch('http://localhost:3000/api/key');
            const {key} = await res.json();

            const options = {
                key: key, 
                amount: total,
                currency: "INR",
                name: "Vinayak Foods",
                description: "Food Order Receipt",
                order_id: orderDocRef.razorpayOrderId, 
                callback_url: `http://localhost:3000/api/orders/verification?orderId=${orderDocRef._id}`,
                prefill: {
                    name: userDetails.name,
                    email: user.email,
                    contact: userDetails.phoneNo
                },
                theme: {
                    "color": "#00EA6C"
                } 
            };
            const razor = window.Razorpay(options);
            dispatch({ type: "remove" });
            localStorage.removeItem('order');
            razor.open();
            // navigate(`/${json._id}`);
        }
        else {
            const errorData = await response.json();
            alert(errorData.err);
            window.location.reload();
        }
    };

    const handleUpdate = () => {
        setCheckoutModal(false);
        return navigate('/profile');
    };

    useEffect(() => {
        const handler = (event) => {
            if (!modalRef.current.contains(event.target))
                setCheckoutModal(false);
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    });

    return (
        <div className={styles.outer} ref={modalRef}>
            <div className={styles.heading}>
                <h1>Delivery Confirmation</h1>
                <div className={styles.close_btn} onClick={() => setCheckoutModal(false)}>
                    <img src="./x.png" alt="" />
                </div>
            </div>
            <hr />
            {userDetails.hostel ? <div className={styles.message}>Are you sure you want to deliver this order to <strong>{userDetails.hostel}</strong>?</div> : <div className={styles.message}>Hostel not set yet. Please set it in Update Profile</div>}
            <div className={styles.btn}>
                {userDetails.hostel && <div className={styles.approve} onClick={handleSubmit}>Approve</div>}
                <div className={styles.update} onClick={handleUpdate}>Update</div>
            </div>
        </div>
    )
};

export default CheckoutModal;