import React, { useState } from 'react';
import styles from './LoginSignup.module.css';
import { Link } from 'react-router-dom';

import useSignup from '../../hooks/useSignup';

const SignupBox = () => {
    const [name, setName] = useState("") 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showReEnterPassword, setShowReEnterPassword] = useState(false);
    const { signup, error ,isLoading} = useSignup();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await signup(email, password, reEnterPassword, name);
      console.log(error);
    };

  
    return (
      <form
        className={styles.conatiner}
        onSubmit={handleSubmit} >
  
        <h3>Signup</h3>
        <div className={styles.textbox}>
          {
            error && error.fields.includes("name") && <div className={styles.error}>{error.message}</div> 
          }        
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name" 
            className={error && error.fields.includes("name") && styles.error_box} />
        </div>
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
          <img 
            src={showPassword ? './hide.png' : './show.png'} 
            alt="" onClick={() => setShowPassword(!showPassword)} 
            className={styles.signup_password}/>
        </div>
        <div className={styles.textbox}>
        {
            error && error.fields.includes("reEnterPassword") && <div className={styles.error}>{error.message}</div> 
          }   
          <input
            type={showReEnterPassword ? 'text' : 'password'}
            onChange={(e) => setReEnterPassword(e.target.value)}
            value={reEnterPassword}
            placeholder="Re-Enter Password" 
            className={error && error.fields.includes("reEnterPassword") && styles.error_box}/>
          <img 
            src={showReEnterPassword ? './hide.png' : './show.png'} 
            alt="" onClick={() => setShowReEnterPassword(!showReEnterPassword)} 
            className={styles.signup_password}/>
        </div>
        <button 
        className={styles.submit_btn} 
        disabled={isLoading}
        style={isLoading ? {cursor : "wait", opacity: "0.5"} : {}}
      > {isLoading ? "Loading..." : "Signup"}</button>
        <Link to = '/login'>Already have an account? Login</Link>
      </form>
    )
};

export default SignupBox;