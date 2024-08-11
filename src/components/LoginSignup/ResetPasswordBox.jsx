import React, { useState } from 'react';
import styles from './LoginSignup.module.css';
import { useNavigate, useParams } from 'react-router-dom';

import useLogout from '../../hooks/useLogout';

const ResetPasswordBox = () => {
    const logout = useLogout();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { id, header, payload, signature } = useParams();
    const token = `${header}.${payload}.${signature}`;
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE_URL}/api/password/reset-password/${id}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    passwordAgain: passwordAgain
                })
            });
            if (!response.ok) {
                const json = await response.json();
                setIsLoading(false);
                setError(json);
            }
            else {
                //remove user from loaclStorage, in case another user is logged in
                logout();
                setIsLoading(false);

                alert("password succesfully changed, you will be redirected to Login page in next 3 seconds \nPlease close this alert!!");

                setTimeout(() => {
                    navigate('/login');
                }, 3000)
            }
        }
        catch(err){
            console.log(err);
        }
        
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibilityAgain = () => {
        setShowPasswordAgain(!showPasswordAgain);
    };

    return (
        <form
            className={styles.conatiner}
            onSubmit={handleSubmit} >
            <h3>Reset Password</h3>
            <div className={styles.textbox}>
                {error && <div className={styles.error}>{error.error}</div>}
                <input
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    className={error && styles.error_box} />
                <img
                    src={showPassword ? '/hide.png' : '/show.png'}
                    alt="" onClick={togglePasswordVisibility}
                    className={styles.signup_password} />
            </div>
            <div className={styles.textbox}>
                {error && <div className={styles.error}>{error.error}</div>}
                <input
                    type={showPasswordAgain ? 'text' : 'password'}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    value={passwordAgain}
                    placeholder="Re-Enter Password"
                    className={error && styles.error_box} />
                <img
                    src={showPasswordAgain ? '/hide.png' : '/show.png'}
                    alt="" onClick={togglePasswordVisibilityAgain}
                    className={styles.signup_password} />
            </div>
            <button
                className={styles.submit_btn}
                disabled={isLoading}
                style={isLoading ? { cursor: "wait", opacity: "0.5" } : {}}
            > {isLoading ? "Loading..." : "Reset Password"}</button>
        </form>
    )
};

export default ResetPasswordBox;