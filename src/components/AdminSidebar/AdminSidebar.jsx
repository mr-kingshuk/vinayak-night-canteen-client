import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const AdminSidebar = ({ routing }) => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>{routing.type}</div>
            {routing.routes.map((route) =>
                <div className={styles.option} key={route.key}>
                    <NavLink
                        to={route.route}
                        className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>
                        {route.name}
                    </NavLink>
                </div>
            )}
            <div className={styles.option}>
                <NavLink
                    to='/'
                    className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>
                    Back to Homepage
                </NavLink>
            </div>
        </div>
    )
};

export default AdminSidebar;