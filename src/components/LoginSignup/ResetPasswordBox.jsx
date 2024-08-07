import React, { useState } from 'react';
import styles from './LoginSignup.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordBox = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { id, header, payload, signature } = useParams();
    const token = `${header}.${payload}.${signature}`;
    const navigate = useNavigate();

    const [password, setPassword] = useState({
        password: "",
        passwordAgain: ""
    });
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
                    password
                })
            });
            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            }
            else {
                setIsLoading(false);
                navigate('/login');
            }
        }
        catch (err) {
            console.log(err);
        }
    };

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
                <input
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword({...password, password: e.target.value})}
                    value={password.password}
                    placeholder="Password"
                    className={error && styles.error_box} />
                <img
                    style={{ top: "9px" }}
                    src={showPassword ? '/hide.png' : '/show.png'}
                    alt="" onClick={togglePasswordVisibility}
                    className={styles.password} />
            </div>
            <div className={styles.textbox}>
                <input
                    type={showPasswordAgain ? 'text' : 'password'}
                    onChange={(e) => setPassword({...password, passwordAgain: e.target.value})}
                    value={password.passwordAgain}
                    placeholder="Re-Enter Password"
                    className={error && styles.error_box} />
                <img
                    style={{ top: "9px" }}
                    src={showPasswordAgain ? '/hide.png' : '/show.png'}
                    alt="" onClick={togglePasswordVisibilityAgain}
                    className={styles.password} />
            </div>
            <button className={styles.submit_btn} disabled={isLoading}>Reset Password</button>
            {error && <div className={styles.errorResetPassword}>{error}</div>}
        </form>
    )
};

export default ResetPasswordBox;