import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';

import styles from './Order.module.css';
import { useAuthContext } from '../../../hooks/useAuthContext.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

const Order = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [order, setOrder] = useState(null);
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  let total = 0;

  useEffect(() => {
    const getOrder = async () => {
      const response = await fetch(`${API_BASE_URL}/api/orders/order/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (response.ok) {
        const json = await response.json();

        //Convert UTC time of MongoDb createdAt to IST
        const date = moment(json.order.createdAt).format('Do MMMM, YYYY');
        const time = moment(json.order.createdAt).format('h:mm A');
        setDateTime({ date: date, time: time });
        setOrder(json);
      }
      else {
        const json = await response.json();
        navigate('/');
      }
    }
    getOrder();
  }, []);

  return (
    <div className={styles.outerBox}>
      <div className={styles.outer}>
        <h1>Order Summary</h1>
        {order && <div className={styles.details}>
          <div className={styles.user}>
            <div className={styles.container}>
              <div className={styles.orderNumber}><strong>Order ID: {order.order.orderNumber}</strong></div>
              <div className={styles.orderStatus}><strong> Order Status: <span style={{ "color": order.order.status === "Accepted" ? "#FFA500" : order.order.status === "Delivered" ? "#43A905" : "#CB072B" }}>{order.order.status}</span></strong> </div>
            </div>
            <hr />
            <div className={styles.container4}>
              <div className={styles.date}>{dateTime.date}</div>
              <div className={styles.hostelAddress}><strong>Hostel Address: </strong>{order.order.hostel}</div>
              <div className={styles.time}>{dateTime.time}</div>
            </div>
          </div>
        </div>}
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.id}>Sr. No.</div>
            <div className={styles.name}>Item Name</div>
            <div className={styles.quantity}>Quantity</div>
            <div className={styles.price}>Price</div>
          </div>
          <hr />
          {order && order.items.map((item, index) => {
            total += item.quantity * item.itemPrice;
            return (
              <div className={styles.row} key={item._id}>
                <div className={styles.id}>{index + 1}</div>
                <div className={styles.name}>{item.itemName}</div>
                <div className={styles.quantity}>{item.quantity}</div>
                <div className={styles.price}>Rs. {item.quantity * item.itemPrice}</div>
              </div>
            )
          })}
          <hr />
          <div className={styles.container2}>
            <div className={styles.header}>SubTotal: </div>
            <div className={styles.value}>Rs. {total}</div>
          </div>
          <div className={styles.container2}>
            <div className={styles.header}>Delivery Charges: </div>
            <div className={styles.value}>Rs. 10</div>
          </div>
          <div className={styles.container2}>
            <div className={styles.header}>Packaging Charges: </div>
            <div className={styles.value}>Rs. 10</div>
          </div>
          <hr />
          <div className={styles.container3}>
            <div className={styles.netTotal}>Total:  </div>
            <div className={styles.value}>Rs. {total + 20}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Order;