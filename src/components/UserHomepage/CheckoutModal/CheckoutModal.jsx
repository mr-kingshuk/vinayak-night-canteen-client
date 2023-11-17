import React, { useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutModal.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext';

const CheckoutModal = ({ setCheckoutModal }) => {
    const navigate = useNavigate();
    const modalRef = useRef();
    const { userDetails } = useAuthContext();

    const handleSubmit = () => {
        setCheckoutModal(false);
        console.log("form submitted");
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