import React, { useState, useEffect } from 'react';
import styles from './OrderReceived.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext.jsx';
import ReceivedOrders from '../../../components/ReceivedOrders/ReceivedOrders.jsx';

const OrderReceived = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { user } = useAuthContext();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getOrder = async () => {
      const response = await fetch(`${API_BASE_URL}/api/orders/receivedOrder`, {
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
        navigate('/');
      }
    }
    getOrder();
  }, [])
  
  return (
    <div className={styles.container}>
      <h1> Order Received</h1>
      <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.id}>Order Id</div>
            <div className={styles.name}>Name</div>
            <div className={styles.phone}>Phone No.</div>
            <div className={styles.time}>Order Time</div>
            <div className={styles.hostel}>Hostel</div>
          </div>
          <hr />
          {orders && orders.map((order) => <ReceivedOrders order={order} orders={orders} setOrders={setOrders} key={order._id}/> )}
      </div> 
    </div>
  )
};

export default OrderReceived;