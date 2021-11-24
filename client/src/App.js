import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Dashboard from './service-provider/pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
