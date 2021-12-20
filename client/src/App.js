import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Main from './Main';
import Service from './service-available/pages/Service';
import Setting from './Setting';
import Signup from './authentication-page/pages/Signup';
import Register from './authentication-page/pages/Register';
import Login from './authentication-page/pages/Login';
import AboutUs from './shared/pages/AboutUs';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import ClientDashboard from './service-client/pages/ClientDashboard';
import ProviderDashboard from './service-provider/pages/ProviderDashboard';
import AdminDashboard from './administrator/pages/AdminDashboard';
import Browse from './shared/pages/Browse';

import { AuthContext } from './shared/context/auth-context';
import RegisterMenu from './authentication-page/pages/RegisterMenu';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState();
    const login = useCallback((user) => {
        setLoggedUser(user);
        setIsLoggedIn(true);
    }, []);
    const logout = useCallback(() => {
        setLoggedUser(null);
        setIsLoggedIn(false);
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, loggedUser: loggedUser, login: login, logout: logout }}>
                <Routes>
                    <Route path='/' element={<Main />}></Route>
                    <Route path='/aboutus' element={<AboutUs />}></Route>
                    {!isLoggedIn && <Route path='/login' element={<Login />}></Route>}
                    {!isLoggedIn && <Route path='/register' element={<RegisterMenu />}></Route>}
                    {!isLoggedIn && <Route path='/register-as-client' element={<Signup />}></Route>}
                    {!isLoggedIn && <Route path='/register-as-provider' element={<Register />}></Route>}
                    {isLoggedIn && loggedUser !== null && loggedUser.role === 'Client' && (
                        <Route path='/profile' element={<ClientDashboard active='My Profile' />}></Route>
                    )}
                    {isLoggedIn && loggedUser !== null && loggedUser.role === 'Provider' && (
                        <Route path='/profile' element={<ProviderDashboard active='My Profile' />}></Route>
                    )}
                    {isLoggedIn && loggedUser !== null && loggedUser.role === 'Admin' && (
                        <Route path='/profile' element={<AdminDashboard active='My Profile' />}></Route>
                    )}
                    <Route path='/order-history' element={<ClientDashboard active='Order History' />}></Route>
                    <Route path='/my-bookmarks' element={<ClientDashboard active='My Bookmarks' />}></Route>
                    <Route path='/my-reviews' element={<ClientDashboard active='My Reviews' />}></Route>
                    <Route path='/browse' element={<Browse />}></Route>
                    <Route path='/service/:serviceId' element={<Service />}></Route>
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </AuthContext.Provider>
        </>
    );
};

export default App;
