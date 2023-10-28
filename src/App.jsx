import { Routes, Route, Navigate } from 'react-router-dom';

import Login from "./pages/Login/Login.jsx";
import Signup from './pages/Signup/Signup.jsx';
import Homepage from './pages/Homepage/Homepage.jsx';

import { useAuthContext } from "./hooks/useAuthContext.jsx";

function App() {

  const { user } = useAuthContext();

  return (
    <div>
        <Routes>
          <Route
            path='/'
            element={user ? <Homepage /> : <Navigate to="/login" />} />
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to="/" />} />
          <Route
            path='/signup'
            element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
    </div>
  )
}

export default App;