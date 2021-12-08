import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Main';
import Service from './service-available/pages/Service';
import Setting from './Setting';
import Register from './authentication-page/pages/Register';
import RegisterProvider from './authentication-page/pages/RegisterProvider';
import Login from './authentication-page/pages/Login';
import AboutUs from './shared/pages/AboutUs';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import ClientDashboard from './service-client/pages/ClientDashboard';
import Browse from './shared/pages/Browse';

import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/register-as-provider' element={<RegisterProvider />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route path='/profile' element={<ClientDashboard active='My Profile' />}></Route>
          <Route path='/order-history' element={<ClientDashboard active='Order History' />}></Route>
          <Route path='/my-bookmarks' element={<ClientDashboard active='My Bookmarks' />}></Route>
          <Route path='/my-reviews' element={<ClientDashboard active='My Reviews' />}></Route>
          <Route path='/browse' element={<Browse />}></Route>
          <Route path='/service/:serviceId' element={<Service />}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
};

export default App;
