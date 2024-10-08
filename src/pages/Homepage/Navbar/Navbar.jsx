import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

import Dropdown from '../../../components/Dropdown/Dropdown.jsx';
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';
import { useAuthContext } from '../../../hooks/useAuthContext';

const Navbar = () => {
  const modalRef = useRef();
  const [isSmallScreen, setIsSmallScreen] = useState(null);
  const [isMerchant, setIsMerchant] = useState(null);
  const [isWorker, setIsWorker] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, userDetails } = useAuthContext();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 430);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (!modalRef.current.contains(event.target))
        setIsOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });

  if (user) {
    return (
      <div className={styles.container}>
        <AdminNavbar token={user.token} />
        <div className={styles.navbar}>
          <div className={styles.logo_number}>
            <div className={styles.logo}>
              <Link to="/">
                <img src="./logo.jpeg" alt="" />
              </Link>
            </div>
            <p>
              <a href="tel:+919321667834">+91 93216 67834</a>
            </p>
          </div>
          <div className={styles.name_tab} onClick={() => setIsOpen(!isOpen)} ref={modalRef}>
            <div className={styles.name}>
              {userDetails.name ? (
                isSmallScreen ? (
                  userDetails.name.length > 8
                    ? `${userDetails.name.slice(0, 6)}...`
                    : userDetails.name
                ) : (
                  userDetails.name
                )
              ) : null}
            </div>
            <div className={`${isOpen ? styles.open : styles.close} ${styles.arrow}`}>
              <img src='./down-arrow.png' alt="" />
            </div>
            <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    )
  }
  else {
    return;
  }

};

export default Navbar;