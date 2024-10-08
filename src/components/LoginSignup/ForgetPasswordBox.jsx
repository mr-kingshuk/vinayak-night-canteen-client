import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginSignup.module.css';

const ForgetPasswordBox = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const response = await fetch(`${API_BASE_URL}/api/password/forget-password`, {
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
    setIsLoading(false);
  }

  return (
    <form
      className={styles.conatiner}
      onSubmit={handleSubmit} >
      <h3>Forget Password</h3>
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
      <button 
        className={styles.submit_btn} 
        disabled={isLoading}
        style={isLoading ? {cursor : "wait", opacity: "0.5"} : {}}
      > {isLoading ? "Loading..." : "Send Reset Email"}</button>
      <Link to='/login'>Go back to Login Page</Link>
    </form>
  )
};

export default ForgetPasswordBox;