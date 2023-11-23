import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parse, format } from 'date-fns';

import styles from './Order.module.css';
import { useAuthContext } from '../../../hooks/useAuthContext.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [order, setOrder] = useState(null);
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  let total = 0;

  useEffect(() => {
    const handleDay = (date) => {
      const parsedDate = parse(date, 'MM/dd/yyyy', new Date());
      const formattedDate = format(parsedDate, 'do MMMM, yyyy');
      return formattedDate;
    }

    const handleTime = (time) => {
      const parsedTime = parse(time, 'h:mm:ss a', new Date());
      const formattedTime = format(parsedTime, 'h:mm a');
      return formattedTime;
    }

    const getOrder = async () => {
      const response = await fetch(`http://13.232.148.171/api/orders/order/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (response.ok) {
        const json = await response.json();
        const date = handleDay(new Date(json.order.createdAt).toLocaleDateString());
        const time = handleTime(new Date(json.order.createdAt).toLocaleTimeString());
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