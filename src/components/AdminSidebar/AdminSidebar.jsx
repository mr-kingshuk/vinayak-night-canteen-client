import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.heading}>Merchant</div>
        <div className={styles.option}>
            <NavLink 
                to='/merchant/orders' 
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>
                    Order Details
            </NavLink>
        </div>
        <div className={styles.option}>
            <NavLink 
                to='/merchant/workers' 
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>
                    Worker IDs
            </NavLink>
        </div>
        <div className={styles.option}>
            <NavLink 
                to='/merchant/delete_orders' 
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>
                    Delete Orders
            </NavLink>
        </div>
        <div className={styles.option}>
            <NavLink 
                to='/merchant/items_category' 
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>
                    Items and Category
            </NavLink>
        </div>
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