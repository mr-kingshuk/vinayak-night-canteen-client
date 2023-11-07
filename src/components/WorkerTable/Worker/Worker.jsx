import React from 'react';
import styles from './Worker.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext.jsx';

const Worker = ({ worker, index, users }) => {
  const { user } = useAuthContext();

  const deleteHandler = async () => {
    const response = await fetch(`http://localhost:3000/api/workers/${worker._id}`, {
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
        <div style={{ "flex": 1 }}>{index}</div>
        <div style={{ "flex": 2 }}>{worker.name}</div>
        <div style={{ "flex": 2 }}>{worker.email}</div>
        <div style={{ "flex": 1 }}>
          <div onClick={deleteHandler} className={styles.delete_btn}>Delete</div>
        </div>
      </div>
    )
  }
  else
    return;
};

export default Worker;