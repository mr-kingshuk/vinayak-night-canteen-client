import React from 'react';
import styles from './Login.module.css';
import ResetPasswordBox from '../../components/LoginSignup/ResetPasswordBox.jsx';

const ResetPassword = () => {
    return (
        <div className={styles.container}>
            <h1>Vinayak Night Canteen</h1>
            <h2 className={styles.college}>The LNM Institute of Information Technology, Jaipur </h2>
            <ResetPasswordBox />
        </div>
    )
};

export default ResetPassword;