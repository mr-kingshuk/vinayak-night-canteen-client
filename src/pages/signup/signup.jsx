import React from 'react';
import styles from './Signup.module.css';

import SignupBox from '../../components/LoginSignup/SignupBox';

const Signup = () => {
  return (
    <div className={styles.container}>
      <h1>Vinayak Night Canteen</h1>
      <h2>The LNM Institute of Information Technology, Jaipur </h2>
      <SignupBox />
    </div>
  )
}

export default Signup;