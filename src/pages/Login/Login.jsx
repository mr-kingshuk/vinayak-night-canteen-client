import styles from './Login.module.css';
import LoginSignup from '../../components/LoginSignup/LoginSignup.jsx';

const Login = () => {
    return (
        <div className={styles.background}>
            <LoginSignup />
        </div>
    )
};

export default Login;