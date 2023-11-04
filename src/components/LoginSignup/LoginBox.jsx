import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './LoginSignup.module.css';

import useLogin from '../../hooks/useLogin';

const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error ,isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          placeholder="Email" 
          className={error && error.fields.includes("email") && styles.error_box} />
      </div>
      <div className={styles.textbox}>
      {
          error && error.fields.includes("password") && <div className={styles.error}>{error.message}</div> 
        }   
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password" 
          className={error && error.fields.includes("password") && styles.error_box}/>
        <div className={styles.forget_password}>Forget Password?</div>
        <img 
          src={showPassword ? './hide.png' : './show.png'} 
          alt="" onClick={togglePasswordVisibility} 
          className={styles.password}/>
      </div>
      <button className={styles.submit_btn} disabled={isLoading}>Login</button>
      <Link to = '/signup'>Don’t have an account yet? Sign Up</Link>
    </form>
  )
};

export default LoginBox;