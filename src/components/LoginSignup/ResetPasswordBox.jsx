import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginSignup.module.css';

const ResetPasswordBox = () => {
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/password/forget-password", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });
    const json = await response.json();
    setMessage(json);
  }

  return (
    <form
      className={styles.conatiner}
      onSubmit={handleSubmit} >
      <h3>Reset Password</h3>
      <div className={styles.textbox}>
        {
          message && <div className={message.state.includes("success") ? styles.success : styles.error}>{message.message}</div>
        }
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className={message && (message.state.includes("success") ? styles.success_box : styles.error_box)} />
      </div>
      <button className={styles.submit_btn}>Send Reset Mail</button>
      <Link to='/login'>Go back to Login Page</Link>
    </form>
  )
};

export default ResetPasswordBox;