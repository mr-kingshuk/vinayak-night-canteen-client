import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminNavbar.module.css';

const AdminNavbar = ({ token }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isMerchant, setIsMerchant] = useState(null);
  const [isWorker, setIsWorker] = useState(null);
  useEffect(() => {
    const checkSuperAdmin = async () => {
      const response = await fetch(`${API_BASE_URL}/api/isMerchant`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const json = await response.json();
        setIsMerchant(true);
      }
      else {
        setIsMerchant(false);
      }
    }

    checkSuperAdmin();

    const checkAdmin = async () => {
      const response = await fetch(`${API_BASE_URL}/api/isWorker`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const json = await response.json();
        setIsWorker(true);
      }
      else {
        setIsWorker(false);
      }
    }

    checkAdmin();
  }, [])

  if(isMerchant){
    return (
      <div className={styles.admin_navbar}>
        <Link to="/merchant/orders">--&gt; Go to Merchant Admin Page</Link>
      </div>
    )
  }
  else if(isWorker){
    return (
      <div className={styles.admin_navbar}>
        <Link to="/workers/items">--&gt; Go to Worker Admin Page</Link>
      </div>
    )
  }
  else
    return;
}

export default AdminNavbar