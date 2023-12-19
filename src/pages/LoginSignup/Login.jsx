import styles from './Login.module.css';
import LoginBox from '../../components/LoginSignup/LoginBox';

const Login = () => {
    return (
        <div className={styles.container}>
            <h1>Vinayak Night Canteen</h1>
            <h2 className={styles.college}>The LNM Institute of Information Technology, Jaipur </h2>
            <LoginBox />
        </div>
    )
};

export default Login;