import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Work from './pages/Work'
import Contact from './pages/Contact'
import Resume from './pages/Resume'
import './index.css'

function AppContent() {
  const [lightMode, setLightMode] = useState(false)

  useEffect(() => {
    // Check local storage on initial load
    const savedMode = localStorage.getItem("lightMode")
    if (savedMode === "enabled") {
      setLightMode(true)
    }
  }, [])

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add("lightmode")
      localStorage.setItem("lightMode", "enabled")
    } else {
      document.body.classList.remove("lightmode")
      localStorage.setItem("lightMode", "null")
    }
  }, [lightMode])

  const toggleTheme = () => setLightMode(!lightMode)

  return (
    <>
      <Header lightMode={lightMode} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent />
    </Router>
  )
}
