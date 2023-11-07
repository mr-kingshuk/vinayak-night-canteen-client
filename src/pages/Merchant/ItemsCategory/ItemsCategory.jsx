import React, { useState, useEffect } from 'react';
import styles from './ItemsCategory.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext.jsx';
import ItemsTableAdmin from '../../../components/ItemsTableAdmin/ItemsTableAdmin.jsx';

const ItemsCategory = () => {
  const { user } = useAuthContext();
  const [items, setItems] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

   useEffect(() => {
    const getItemsCategory = async () => {
      const response = await fetch('http://localhost:3000/api/fooditems/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (response.ok) {
        const json = await response.json();
        setItems(json);
      }
      else {
        const json = await response.json();
        setItems(json.err);
      }
    }
    getItemsCategory();
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const response = await fetch("http://localhost:3000/api/fooditems/category", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ name })
    });

    if (response.ok) {
      const json = await response.json();
      const updatedCategory = items.category.push(json);
      const updatedList = {...items, updatedCategory}; 
      console.log(updatedList);
      setItems(updatedList);
      setName("");
    }
    else {
      const errorData = await response.json();
      setError(errorData);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Categories and Items</h1>
      <form
        onSubmit={onSubmitHandler}
        className={styles.form}>
        <div className={styles.textbox}>
          <div className={styles.error}>{error && error.err}</div>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Category Name"
            className={error && styles.error_box} />
        </div>
        <button className={styles.submit_btn}>ADD</button>
      </form>

      <ItemsTableAdmin itemsCat={{items, setItems}} />
    </div>
  )
};

export default ItemsCategory;