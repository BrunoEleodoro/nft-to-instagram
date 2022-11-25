import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
// import Mint from './pages/mint/Mint';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'forever-one.firebaseapp.com',
  projectId: 'forever-one',
  storageBucket: 'forever-one.appspot.com',
  messagingSenderId: '683511214775',
  appId: '1:683511214775:web:d279062c336210e733d332',
  measurementId: 'G-T4FVXN3YED',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route path="/mint" element={<Mint />} /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
