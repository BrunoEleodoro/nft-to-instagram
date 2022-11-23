import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Mint from './pages/mint/Mint';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/mint" element={<Mint />} />
          </Route>
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
