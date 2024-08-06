import React, { useState, useEffect } from 'react';
import styles from './UpdateProfile.module.css';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../hooks/useAuthContext';
import Footer from '../../../components/Footer/Footer.jsx';

const UpdateProfile = () => {
  const { dispatch, user, userDetails } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phoneNo: "",
    rollNo: "",
    hostel: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userDetails !== null)
      setForm({
        name: userDetails.name ? userDetails.name : "",
        phoneNo: userDetails.phoneNo ? userDetails.phoneNo : "",
        rollNo: userDetails.rollNo ? userDetails.rollNo : "",
        hostel: userDetails.hostel ? userDetails.hostel : ""
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/users/profile", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      const json = await response.json();

      //update the AuthContext
      dispatch({ type: "update", payload: json });

      //update local state
      localStorage.setItem('userDetails', JSON.stringify(json));

      navigate('/');

    }
    else {
      const errorData = await response.json();
      setError(errorData);
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.heading}>
        <h3>Update Profile</h3>
        <div className={styles.warning}>(Update your Profiile, to set delivery address)</div>
      </div>
      <form
        className={styles.conatiner}
        onSubmit={handleSubmit} >
        <div className={styles.textbox}>
          {
            error && error.fields.includes("name") && <div className={styles.error}>{error.message}</div>
          }
          <input
            type="text"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
            placeholder="Name"
            className={error && error.fields.includes("name") ? styles.error_box : undefined} />
        </div>
        <div className={styles.textbox}>
          {
            error && error.fields.includes("phoneNo") && <div className={styles.error}>{error.message}</div>
          }
          <input
            type="tel"
            pattern="[0-9]{10}"
            onChange={(e) => setForm({ ...form, phoneNo: e.target.value })}
            value={form.phoneNo}
            placeholder="Phone Number"
            className={error && error.fields.includes("phoneNo") ? styles.error_box : undefined} />
        </div>
        <div className={styles.textbox}>
          {
            error && error.fields.includes("rollNo") && <div className={styles.error}>{error.message}</div>
          }
          <input
            type="text"
            onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
            value={form.rollNo}
            placeholder="Roll No"
            className={error && error.fields.includes("rollNo") ? styles.error_box : undefined} />
        </div>
        <div className={styles.textbox}>
          {
            error && error.fields.includes("hostel") && <div className={styles.error}>{error.message}</div>
          }
          <select
            className={error && error.fields.includes("hostel") ? styles.error_box : undefined}
            onChange={(e) => setForm({ ...form, hostel: e.target.value })}
            value={form.hostel} >
            <option value="">Hostel</option>
            <option value="BH1">BH1</option>
            <option value="BH2">BH2</option>
            <option value="BH3">BH3</option>
            <option value="BH4">BH4</option>
            <option value="GH">GH</option>
          </select>
        </div>
        <button className={styles.submit_btn}>Update Profile</button>
        <div className={styles.redirect}>
          <div className={styles.separator}>
            <hr />
            OR
            <hr />
          </div>
          <div className={`${styles.submit_btn} ${styles.menu_btn}`} onClick={() => navigate('/')}>Go to Menu Page</div>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default UpdateProfile