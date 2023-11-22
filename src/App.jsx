import { Routes, Route } from 'react-router-dom';

import Login from "./pages/LoginSignup/Login.jsx";
import Signup from './pages/LoginSignup/Signup.jsx';

//HomePage Components
import Menu from './pages/Homepage/Menu/Menu.jsx';
import Order from './pages/Homepage/Order/Order.jsx';
import Orders from './pages/Homepage/Orders/Orders.jsx';
import UpdateProfile from './pages/Homepage/UpdateProfile/UpdateProfile.jsx';

//Merchant Components
import CancelledOrder from './pages/Merchant/DeleteOrders/CancelledOrder.jsx';
import ItemsCategory from './pages/Merchant/ItemsCategory/ItemsCategory.jsx';
import OrderDetails from './pages/Merchant/OrdersDetails/OrderDetails.jsx';
import WorkerDetails from './pages/Merchant/WorkerDetails/WorkerDetails.jsx';

//Worker Components
import ItemOff from './pages/Worker/ItemOff/ItemOff.jsx';
import OrderReceived from './pages/Worker/OrderReceived/OrderReceived.jsx';

import ProtectingRouteWorker from './protectedRoutes/ProtectingRouteWorker.jsx';
import ProtectingRouteUser from './protectedRoutes/ProtectingRouteUser.jsx';
import ProtectingRouteGuest from './protectedRoutes/ProtectingRouteGuest.jsx';
import ProtectingRouteMerchant from './protectedRoutes/ProtectingRouteMerchant.jsx';

function App() {

  return (
    <div>
      <Routes>
        <Route
          path='/login'
          element={ <ProtectingRouteGuest component={<Login />} fallback="/"  />} />
        <Route
          path='/signup'
          element={<ProtectingRouteGuest component={<Signup />} fallback="/profile"/>} />


        <Route
          path='/'
          element={<ProtectingRouteUser component={<Menu />} />} />
        <Route
          path='/:id'
          element={<ProtectingRouteUser component={<Order />}/>} />
        <Route
          path='/orders'
          element={<ProtectingRouteUser component={<Orders />} />} />
        <Route
          path='/profile'
          element={<ProtectingRouteUser component={<UpdateProfile />} />} />

        {/* Merchant Routes */}
        <Route
          path='/merchant/orders'
          element={<ProtectingRouteMerchant component={<OrderDetails />} />} />
        <Route
          path='/merchant/items_category'
          element={<ProtectingRouteMerchant component={<ItemsCategory />} />} />
        <Route
          path='/merchant/cancelled_orders'
          element={<ProtectingRouteMerchant component={<CancelledOrder />} />} />
        <Route
          path='/merchant/workers'
          element={<ProtectingRouteMerchant component={<WorkerDetails />} />} />

        {/* Worker Routes */}
        <Route
          path='/workers/items'
          element={<ProtectingRouteWorker component={<ItemOff />} />} />
        <Route
          path='/workers/received'
          element={<ProtectingRouteWorker component={<OrderReceived />} />} />

        <Route path="*" element={<h1>404 NOT FOUND</h1>}/>

      </Routes>
    </div>
  )
}

export default App;