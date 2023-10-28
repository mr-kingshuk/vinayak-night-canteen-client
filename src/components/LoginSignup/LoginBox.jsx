import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginSignup.module.css';

import useLogin from '../../hooks/useLogin';

const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error ,isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    console.log(error);
  };

  return (
    <form
      className={styles.conatiner}
      onSubmit={handleSubmit} >

      <h3>Login</h3>
      <div className={styles.textbox}>
        {
           error && error.fields.includes("email") && <div className={styles.error}>{error.message}</div> 
        }        
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email" />
      </div>
      <div className={styles.textbox}>
      {
          error && error.fields.includes("password") && <div className={styles.error}>{error.message}</div> 
        }   
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password" />
        <div className={styles.forget_password}>Forget Password?</div>  
      </div>
      <button className={styles.submit_btn} disabled={isLoading}>Login</button>
      <Link to = '/signup'>Don’t have an account yet? Sign Up</Link>
    </form>
  )
};

export default LoginBox;