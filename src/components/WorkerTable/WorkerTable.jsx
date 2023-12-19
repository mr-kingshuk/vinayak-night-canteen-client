import React, { useEffect, useState } from 'react';
import styles from './WorkerTable.module.css';

import Worker from './Worker/Worker.jsx';
import { useAuthContext } from '../../hooks/useAuthContext.jsx';

const WorkerTable = ({ workers }) => {
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div style={{ "flex": 1 }} className={styles.id}>Sr. No.</div>
        <div style={{ "flex": 2 }} className={styles.name}>Name</div>
        <div style={{ "flex": 2 }}>Email ID</div>
        <div style={{ "flex": 1 }}>Delete</div>
      </div>
      <hr />
      {
        workers.workers.map((worker, index) => <Worker users = {workers} worker={worker.userId} key={worker._id} index={index+1}/> )
      }
      <Worker />
    </div>
  )
};

export default WorkerTable;