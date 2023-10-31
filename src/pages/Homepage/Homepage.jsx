import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './Homepage.module.css';

import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import Orders from '../Orders/Orders';
import Order from '../Order/Order';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  )
}

export default Homepage;