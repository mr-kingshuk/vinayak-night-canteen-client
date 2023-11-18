import React, { useState, useEffect } from 'react';
import styles from './Orders.module.css';

import OrdersRow from '../../../components/OrdersRow/OrdersRow.jsx';
import { useAuthContext } from '../../../hooks/useAuthContext';
import Footer from '../../../components/Footer/Footer';

const Orders = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`http://localhost:3000/api/orders/orders`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (response.ok) {
        const json = await response.json();
        setOrders(json);
      }
      else {
        const json = await response.json();
        setError(json.err);
      }
    }
    getOrders();
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
        {orders && orders.map((order) => <OrdersRow order={order} key={order._id}/>)}
      </div>
      <Footer />
    </div>
  )
};

export default Orders;