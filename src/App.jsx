import { Routes, Route } from 'react-router-dom';

import Login from "./pages/LoginSignup/Login.jsx";
import Signup from './pages/LoginSignup/Signup.jsx';

//HomePage Components
import Menu from './pages/Homepage/Menu/Menu.jsx';
import Order from './pages/Homepage/Order/Order.jsx';
import Orders from './pages/Homepage/Orders/Orders.jsx';
import UpdateProfile from './pages/Homepage/UpdateProfile/UpdateProfile.jsx';

//Merchant Components
import DeleteOrders from './pages/Merchant/DeleteOrders/DeleteOrder.jsx';
import ItemsCategory from './pages/Merchant/ItemsCategory/ItemsCategory.jsx';
import OrderDetails from './pages/Merchant/OrdersDetails/OrderDetails.jsx';
import WorkerDetails from './pages/Merchant/WorkerDetails/WorkerDetails.jsx';

//Worker Components
import ItemOff from './pages/Worker/ItemOff/ItemOff.jsx';
import OrdersDelivered from './pages/Worker/OrderDelivered/OrderDelivered.jsx';
import OrdersReceived from './pages/Worker/OrderReceived/OrderReceived.jsx';

import ProtectingRouteUser from './protectedRoutes/ProtectingRouteUser.jsx';
import ProtectingRouteGuest from './protectedRoutes/ProtectingRouteGuest.jsx';
import ProtectingRouteMerchant from './protectedRoutes/ProtectingRouteMerchant.jsx';
import OrderReceived from './pages/Worker/OrderReceived/OrderReceived.jsx';

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
          path='/order/:id'
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
          path='/merchant/delete_orders'
          element={<ProtectingRouteMerchant component={<DeleteOrders />} />} />
        <Route
          path='/merchant/workers'
          element={<ProtectingRouteMerchant component={<WorkerDetails />} />} />

        {/* Worker Routes */}
        {/* <Route
          path='/workers'
          element={<ProtectingRouteWorker component={<ItemOff />} />} />
        <Route
          path='/workers/received'
          element={<ProtectingRouteWorker component={<OrderReceived />} />} />
        <Route
          path='/workers/delivered'
          element={<ProtectingRouteWorker component={<OrdersDelivered />} />} />             */}

        <Route path="*" element={<h1>404 NOT FOUND</h1>}/>

      </Routes>
    </div>
  )
}

export default App;

/***
 * <Link to="/orders/${}"
 * <Route path="/order/:orderId" component={<ProtectingRoute component={Homepage}/>}/>
 * 
 * const ProtectingRoute({component}) => {
 *  if() {
 *  return component
 * }
 * return <Login/>
 *   }
 * 
 */