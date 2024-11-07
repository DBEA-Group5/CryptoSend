import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BalanceDetails from './pages/BalanceDetails'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/balance-details" element={<BalanceDetails />} />
      </Routes>
    </Router>
  )
}

export default App