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

    const handleSubmit = async () => {
        setCheckoutModal(false);
        let body = [];
        let itemInfo;
        orderItems.map((item) => {
            console.log(item);
            itemInfo = { _id: item._id, name : item.name, price: item.price, quantity : item.quantity};
            body.push(itemInfo);
        });
        const order = {order : body};
        console.log(order);

        const response = await fetch("http://localhost:3000/api/orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(order)
        });

        if (response.ok) {
            const json = await response.json();
            dispatch({ type: "remove" });
            localStorage.removeItem('order');
            navigate(`/${json._id}`);
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