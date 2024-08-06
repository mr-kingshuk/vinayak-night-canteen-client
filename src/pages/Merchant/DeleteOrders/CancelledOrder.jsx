import React, { useState, useEffect } from 'react';
import styles from './CancelledOrder.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext';
import Order from '../../../components/CancelledOrder/Order.jsx';

const CancelledOrder = () => {
  const [totalPages, setTotalPages] = useState(0);
  const ITEM_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthContext();
  const [orders, setOrders] = useState(null);
  const arr = [];

  const getOrder = async (page) => {
    const response = await fetch(`http://localhost:3000/api/orders/cancel?page=${page}&per_page=${ITEM_PER_PAGE}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    if (response.ok) {
      const json = await response.json();
      setOrders(json.data);
      setCurrentPage(json.metadata.current_page);
      setTotalPages(json.metadata.total_pages);
    }
    else {
      const json = await response.json();
      navigate('/');
    }
  }

  useEffect(() => {
    getOrder(1);
  }, []);

  for (let i = 1; i <= totalPages; i++) {
    arr.push(<div
      key={i}
      className={i === currentPage ? styles.current : null}
      onClick={() => getOrder(i)}>{i}</div>)
  }

  const leftHandler = () => {
    if (currentPage > 1) {
      getOrder(currentPage-1);
    }
  };

  const rightHandler = () => {
    if (currentPage !== totalPages)
      getOrder(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <h1>Cancelled Orders</h1>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.id}>Order Id</div>
          <div className={styles.name}>Name</div>
          <div className={styles.phone}>Phone No.</div>
          <div className={styles.date}>Date</div>
          <div className={styles.time}>Time</div>
          <div className={styles.hostel}>Hostel</div>
        </div>
        <hr />
        {orders && orders.map((order) => <Order order={order} key={order._id} />)}
        <div className={styles.outer}>
          <div
            className={`${styles.left_arrow} ${currentPage > 1 ? null : styles.click_no}`}
            onClick={leftHandler}
          >Prev</div>
          {arr.map((ele) => ele)}
          <div
            className={`${styles.right_arrow} ${currentPage < totalPages ? null : styles.click_no}`}
            onClick={rightHandler}
          >Next</div>
        </div>
      </div>
    </div>
  )
};

export default CancelledOrder;