import React, { useEffect, useState} from 'react';
import styles from './ItemOff.module.css';

import ItemTurnOff from '../../../components/ItemTurnOff/ItemTurnOff.jsx';
import { useAuthContext } from '../../../hooks/useAuthContext.jsx';

const ItemOff = () => {
  const { user } = useAuthContext();
  const [items, setItems] = useState([]);
  const [queryItems, setQueryItems] = useState([]);
  const [search, setSearch] = useState('');

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
        setItems(json.items);
        setQueryItems(json.items);
      }
      else {
        const json = await response.json();
        setItems(json);
      }
    }
    getItemsCategory();
  }, []);

  const searchList = (search) => {
    setSearch(search);
    const newList = items.filter((item) => search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search));
    setQueryItems(newList);
}
  
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Turn Off Items</h1>
        <div className={styles.form}>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Item Name"
            />
          <div className={styles.cross} onClick={() => searchList('')}>X</div>
        </div>
      </div>
      <div className={styles.items}>
        {queryItems.length > 0 ? queryItems.map((item) => <ItemTurnOff key={item._id} item={item}/> ):  <div>No Items Found!!</div>}
      </div>
    </div>
  )
};

export default ItemOff;