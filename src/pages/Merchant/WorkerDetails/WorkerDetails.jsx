import React, { useState, useEffect } from 'react';
import styles from './WorkerDetails.module.css';

import WorkerTable from '../../../components/WorkerTable/WorkerTable.jsx';
import { useAuthContext } from '../../../hooks/useAuthContext';

const WorkerDetails = () => {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const getWorker = async () => {
      const response = await fetch('http://localhost:3000/api/workers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (response.ok) {
        const json = await response.json();
        setWorkers(json);
      }
      else {
        const json = await response.json();
        setWorkers(json.err);
      }
    }
    getWorker();
  }, [])


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const response = await fetch("http://localhost:3000/api/workers", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      const json = await response.json();
      const updatedList = workers.concat(json);
      setWorkers(updatedList);
      setEmail("");
    }
    else {
      const errorData = await response.json();
      setError(errorData);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Worker Details</h1>
      <form
        onSubmit={onSubmitHandler}
        className={styles.form}>
        <div className={styles.textbox}>
          <div className={styles.error}>{error && error.msg}</div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className={error && styles.error_box} />
        </div>
        <button className={styles.submit_btn}>ADD</button>
      </form>
      <WorkerTable workers={{workers, setWorkers}} />
    </div>
  )
};

export default WorkerDetails;