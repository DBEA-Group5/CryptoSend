import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BalanceDetails from './pages/BalanceDetails'
import Convert from './pages/convert-money/convert'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/balance-details" element={<BalanceDetails />} />
        <Route path="/convert" element={<Convert />} />
      </Routes>
    </Router>
  )
}

export default App