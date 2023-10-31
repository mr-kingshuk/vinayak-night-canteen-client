import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
  const [ isMerchant, setIsMerchant ] = useState(false);
  const [ isWorker, setIsWorker ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(true);

  const { user } = useAuthContext();



  return (
    <div className={styles.conatiner}>
        <div className={styles.admin_navbar}> 
            <Link to="/worker">--&gt;  Go to Worker Admin Page</Link>
        </div>
        <div className={styles.navbar}>
            <div className={styles.logo_number}>
              <div className={styles.logo}>
                <img src="./logo.jpeg" alt="" />
              </div>
              <p>+91 93216 67834</p>
            </div>
            <div className={styles.name_tab} onClick = {() => setIsOpen(!isOpen)}>
                <div className={styles.name}>{user.name}</div>
                <div className={`${isOpen ? styles.open : styles.close} ${styles.arrow}`}>
                  <img src='./down-arrow.png' alt="" />
                </div>
            </div>
            <div className={styles.dropdown}>
              
            </div>
        </div>
    </div>
  )
};

export default Navbar;