import React, { useState, useEffect } from 'react';
import styles from './OrderDetails.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useAuthContext } from '../../../hooks/useAuthContext';
import Order from '../../../components/CancelledOrder/Order';

const OrderDetails = () => {
  const [totalPages, setTotalPages] = useState(0);
  const ITEM_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthContext();
  const [orders, setOrders] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const arr = [];

  const getOrder = async (page) => {
    const formattedDate = selectedDate ? selectedDate.toISOString() : '';
    const response = await fetch(`http://localhost:3000/api/orders/deliver?date=${formattedDate}&page=${page}&per_page=${ITEM_PER_PAGE}`, {
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
    }
  };

  useEffect(() => {
    getOrder(1);
  }, [selectedDate]);



  for (let i = 1; i <= totalPages; i++) {
    arr.push(<div
      key={i}
      className={i === currentPage ? styles.current : null}
      onClick={() => getOrder(i)}>{i}</div>)
  }

  const leftHandler = () => {
    if (currentPage > 1) {
      getOrder(currentPage - 1);
    }
  };

  const rightHandler = () => {
    console.log("here2")
    if (currentPage !== totalPages)
      getOrder(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Order Details</h1>
        <div className={styles.details}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
        </div>
      </header>
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
        {orders && orders.length > 0 ? orders.map((order) => <Order order={order} key={order._id} />) : <div className={styles.error}>No Orders Found.</div>}
        {orders && orders.length > 0 && <div className={styles.outer}>
          <div
            className={`${styles.left_arrow} ${currentPage > 1 ? null : styles.click_no}`}
            onClick={leftHandler}
          >Prev</div>
          {arr.map((ele) => ele)}
          <div
            className={`${styles.right_arrow} ${currentPage < totalPages ? null : styles.click_no}`}
            onClick={rightHandler}
          >Next</div>
        </div>}
      </div>
    </div>
  )
};

export default OrderDetails;