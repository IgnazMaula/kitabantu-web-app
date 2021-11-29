import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Main';
import Service from './Service';
import Setting from './Setting';
import Register from './authentication-page/pages/Register';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Setting />}></Route>
        <Route path="/service/:productId" element={<Service />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
