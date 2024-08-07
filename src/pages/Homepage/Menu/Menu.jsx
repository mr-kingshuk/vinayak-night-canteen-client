import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../../../hooks/useAuthContext.jsx';
import ItemsCategory from '../../../components/UserHomepage/ItemsCategory.jsx';

const Menu = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { user } = useAuthContext();
  const [items, setItems] = useState(null);
  const [openTime, setOpenTime] = useState({ openHour: 0, openMin: 0 });
  const [closeTime, setCloseTime] = useState({ closeHour: 0, closeMin: 0 });

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

    const getTime = async () => {
      const response = await fetch(`${API_BASE_URL}/api/timing/time`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (response.ok) {
        const json = await response.json();
        setOpenTime({ openHour: json[0].openHour, openMin: json[0].openMin });
        setCloseTime({ closeHour: json[0].closeHour, closeMin: json[0].closeMin });
      }
      else {
        const json = await response.json();
        console.log(json);
      }
    }
    getTime();
  }, []);

  if (items && items.category.length > 0) {
    return (
      <>
        <ItemsCategory items={items} openTime={openTime} closeTime={closeTime} />
      </>
    )
  }
  return;
};

export default Menu;