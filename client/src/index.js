import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ScrollToTop from './shared/components/ScrollToTop';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ScrollToTop />
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
