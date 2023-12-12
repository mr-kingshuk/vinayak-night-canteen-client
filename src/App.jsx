import { Routes, Route } from 'react-router-dom';

import Login from "./pages/LoginSignup/Login.jsx";
import Signup from './pages/LoginSignup/Signup.jsx';
import { useAuthContext } from './hooks/useAuthContext.jsx';

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
import StoreTiming from './pages/Merchant/StoreTiming/StoreTiming.jsx';

//Worker Components
import ItemOff from './pages/Worker/ItemOff/ItemOff.jsx';
import OrderReceived from './pages/Worker/OrderReceived/OrderReceived.jsx';

import ProtectingRouteWorker from './protectedRoutes/ProtectingRouteWorker.jsx';
import ProtectingRouteUser from './protectedRoutes/ProtectingRouteUser.jsx';
import ProtectingRouteGuest from './protectedRoutes/ProtectingRouteGuest.jsx';
import ProtectingRouteMerchant from './protectedRoutes/ProtectingRouteMerchant.jsx';

function App() {
  const { user } = useAuthContext();
  return (
    <div>
      <Routes>
        <Route
          path='/login'
          element={
            <ProtectingRouteGuest user={user}>
              <Login />
            </ProtectingRouteGuest>} />
        <Route
          path='/signup'
          element={
            <ProtectingRouteGuest user={user}>
              <Signup />
            </ProtectingRouteGuest>} />

        {/* User Routes     */}

        <Route
          path='/'
          element={
            <ProtectingRouteUser user={user}>
              <Menu />
            </ProtectingRouteUser>} />
        <Route
          path='/:id'
          element={
            <ProtectingRouteUser user={user}>
              <Order />
            </ProtectingRouteUser>} />
        <Route
          path='/orders'
          element={
            <ProtectingRouteUser user={user}>
              <Orders />
            </ProtectingRouteUser>} />
        <Route
          path='/profile'
          element={
            <ProtectingRouteUser user={user}>
              <UpdateProfile />
            </ProtectingRouteUser>} />

        {/* Merchant Routes */}
        <Route
          path='/merchant/orders'
          element={<ProtectingRouteMerchant component={<OrderDetails />} />} user={user} />
        <Route
          path='/merchant/items_category'
          element={<ProtectingRouteMerchant component={<ItemsCategory />} />} user={user} />
        <Route
          path='/merchant/cancelled_orders'
          element={<ProtectingRouteMerchant component={<CancelledOrder />} />} user={user} />
        <Route
          path='/merchant/workers'
          element={<ProtectingRouteMerchant component={<WorkerDetails />} />} user={user} />
        <Route
          path='/merchant/store_timing'
          element={<ProtectingRouteMerchant component={<StoreTiming />} />} user={user} />

        {/* Worker Routes */}
        <Route
          path='/workers/items'
          element={<ProtectingRouteWorker component={<ItemOff />} />} user={user} />
        <Route
          path='/workers/received'
          element={<ProtectingRouteWorker component={<OrderReceived />} user={user} />} />

        <Route path="*" element={<h1>404 NOT FOUND</h1>} />

      </Routes>
    </div>
  )
}

export default App;