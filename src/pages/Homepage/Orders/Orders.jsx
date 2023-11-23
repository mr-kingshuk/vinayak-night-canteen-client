import React, { useState, useEffect } from 'react';
import styles from './Orders.module.css';

import OrdersRow from '../../../components/OrdersRow/OrdersRow.jsx';
import { useAuthContext } from '../../../hooks/useAuthContext';
import Footer from '../../../components/Footer/Footer';

const Orders = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const response = await fetch(`http://13.232.148.171/api/orders/orders?page=${page}&per_page=10`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (response.ok) {
        const json = await response.json();
        setOrders((prevOrders) => [...prevOrders, ...json.data]);
        if(json.metadata.total_pages === json.metadata.current_page)
          setHasMore(false); 
        setLoading(false);
      }
      else {
        const json = await response.json();
        setHasMore(false);
        setLoading(false);
        setError(json.err);
      }
    }
    if (hasMore)
      getOrders();
  }, [page, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      // Remove scroll event listener on component unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.outer}>
      <h1>Your Orders</h1>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.id}>Order Id</div>
          <div className={styles.date}>Date Ordered</div>
          <div className={styles.time}>Time</div>
          <div className={styles.hostel}>Hostel</div>
          <div className={styles.status}>Status</div>
          <div className={styles.btn}></div>
        </div>
        <hr />
        {orders.length > 0 && orders.map((order) => <OrdersRow order={order} key={order._id} />)}
        {loading && <div className={styles.loading}>
          <span className={styles.loading__dot}></span>
          <span className={styles.loading__dot}></span>
          <span className={styles.loading__dot}></span>
        </div>}
        {!hasMore && <p className={styles.end}>That's it, No more Orders to display :)</p>}
      </div>
      <Footer />
    </div>
  )
};

export default Orders;