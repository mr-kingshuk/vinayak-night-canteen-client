import React from 'react';
import styles from './Login.module.css';
import ForgetPasswordBox from '../../components/LoginSignup/ForgetPasswordBox.jsx';

const ForgetPassword = () => {
    return (
        <div className={styles.container}>
            <h1>Vinayak Night Canteen</h1>
            <h2 className={styles.college}>The LNM Institute of Information Technology, Jaipur </h2>
            <ForgetPasswordBox />
        </div>
    )
};

export default ForgetPassword;