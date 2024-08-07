import React from 'react';
import styles from './Worker.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext.jsx';

const Worker = ({ worker, index, users }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { user } = useAuthContext();

  const deleteHandler = async () => {
    const response = await fetch(`${API_BASE_URL}/api/workers/${worker._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    if (response.ok) {
      const json = await response.json();
      const updatedList = users.workers.filter((user) => user.userId._id !== json._id);
      users.setWorkers(updatedList);
      
    }
    else {
      const json = await response.json();
      console.log(json);
    }

  }
  if (worker) {
    return (

      <div className={styles.row}>
        <div style={{ "flex": 1 }} className={styles.id}>{index}</div>
        <div style={{ "flex": 2 }} className={styles.name}>{worker.name}</div>
        <div style={{ "flex": 2 }}  className={styles.email}>{worker.email}</div>
        <div style={{ "flex": 1 }}  className={styles.delete}>
          <div onClick={deleteHandler} className={styles.delete_btn}>Delete</div>
        </div>
      </div>
    )
  }
  else
    return;
};

export default Worker;