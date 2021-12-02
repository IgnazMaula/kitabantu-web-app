import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Main';
import Service from './Service';
import Setting from './Setting';
import Register from './authentication-page/pages/Register';
import Login from './authentication-page/pages/Login';
import AboutUs from './shared/pages/AboutUs';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/profile" element={<Setting />}></Route>
        <Route path="/service/:productId" element={<Service />}></Route>
      </Routes>
    </>
  );
}

export default App;
