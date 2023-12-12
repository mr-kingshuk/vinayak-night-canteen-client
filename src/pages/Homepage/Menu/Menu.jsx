import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../../../hooks/useAuthContext.jsx';
import ItemsCategory from '../../../components/UserHomepage/ItemsCategory.jsx';

const Menu = () => {
  const {user}  = useAuthContext();
  const [items, setItems] = useState(null);


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
  }, []);

  if (items && items.category.length > 0) {
    return (
      <>
        <ItemsCategory items={items} />
      </>
    )
  }
  return;
};

export default Menu;