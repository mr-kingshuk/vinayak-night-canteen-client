import React from 'react';
import styles from './Dropdown.module.css';
import { NavLink } from 'react-router-dom';

import useLogout from '../../hooks/useLogout';

const Dropdown = ({ isOpen, setIsOpen }) => {
    const logout = useLogout(); 

    return (
        <div className={`${isOpen ? styles.open : null} ${styles.dropdown}`} >
            <div>
                <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>Menu Page</NavLink>
            </div>
            <div>
                <NavLink to='/orders' className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>Your Orders</NavLink>
            </div>
            <div>
                <NavLink to='/profile' className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>Update Profile</NavLink>
            </div>
            <div>
                <div className={styles.inactive} onClick={logout}>Logout</div>
            </div>
        </div>
    )
};

export default Dropdown;