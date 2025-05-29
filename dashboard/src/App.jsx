import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Location from './pages/Location'
import Admin from './pages/Admin'
import Menu from './pages/Menu'
import Login from './pages/Login'
import Social from './pages/Social'
import './App.css'

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || null)

  // Handler to set role after login
  const handleLogin = (token, userRole) => {
    setRole(userRole)
  }

  // Admin route protection
  const RequireAdmin = ({ children }) => {
    if (role !== 'admin') {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        <Route path="/profile" element={<Login onLogin={handleLogin} />} />
        <Route path="/social" element={<Social />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          }
        />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  )
}

export default App
