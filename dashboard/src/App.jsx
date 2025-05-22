import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Location from './pages/Location'
import Admin from './pages/Admin'
import Menu from './pages/Menu'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        {/* Add other routes here */}
        <Route path="/profile" element={<Admin />} />
        <Route path="/menu" element={<Menu />} />
        {/* Add other routes here */}
      </Routes>
    </>
  )
}

export default App
