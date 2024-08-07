import React, { useState, useEffect } from 'react';
import styles from './ItemsCategory.module.css';

import { useAuthContext } from '../../../hooks/useAuthContext.jsx';
import ItemsTableAdmin from '../../../components/ItemsTableAdmin/ItemsTableAdmin.jsx';
import CategoryAdd from '../../../components/ItemsTableAdmin/CategoryAdd.jsx';

const ItemsCategory = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { user } = useAuthContext();
  const [items, setItems] = useState(null);

   useEffect(() => {
    const getItemsCategory = async () => {
      const response = await fetch(`${API_BASE_URL}/api/fooditems/`, {
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


  return (
    <div className={styles.container}>
      <h1>Add Categories and Items</h1>
      <CategoryAdd itemsCat={{items, setItems}}/>
      <ItemsTableAdmin itemsCat={{items, setItems}} />
    </div>
  )
};

export default ItemsCategory;