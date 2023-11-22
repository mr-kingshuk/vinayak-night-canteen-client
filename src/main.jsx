import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import './index.css';

import { AuthContextProvider } from './context/AuthContext.jsx'
import { OrderContextProvider } from './context/OrderContext.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <OrderContextProvider>
        <App />
      </OrderContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
