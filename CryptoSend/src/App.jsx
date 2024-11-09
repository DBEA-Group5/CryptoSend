// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import Login from './pages/login';
import Home from './pages/Home';
import BalanceDetails from './pages/BalanceDetails'
import Convert from './pages/convert-money/convert'
import './index.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Example login success handler (it could be based on actual authentication)
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };


  return (
    <Router>
      <Routes>
        {/* Define routes for Login and Home */}
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        {/* Default route can go to the login page */}
        <Route
          path="/"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
         <Route path="/" element={<Home />} />
        <Route path="/balance-details" element={<BalanceDetails />} />
        <Route path="/convert" element={<Convert />} />
      </Routes>
    </Router>
  );
};


export default App;
