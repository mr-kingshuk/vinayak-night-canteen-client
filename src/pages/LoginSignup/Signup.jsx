import React from 'react';
import styles from './Login.module.css';

import SignupBox from '../../components/LoginSignup/SignupBox';

const Signup = () => {
  return (
    <div className={styles.container}>
      <h1>Vinayak Night Canteen</h1>
      <h2 className={styles.college}>The LNM Institute of Information Technology, Jaipur </h2>
      <SignupBox />
    </div>
  )
}

export default Signup;