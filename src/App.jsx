import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Work from './pages/Work'
import Contact from './pages/Contact'
import Resume from './pages/Resume'
import Certifications from './pages/Certifications'
import ParticlesBackground from './components/ParticlesBackground'
import { fallbackProfile, loadProfile } from './data/portfolio'
import useScrollReveal from './hooks/useScrollReveal'
import './index.css'

function AppContent() {
  const [lightMode, setLightMode] = useState(() => localStorage.getItem("lightMode") === "enabled")
  const [profile] = useState(() => loadProfile())
  
  useScrollReveal()

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
      <ParticlesBackground />
      <Header lightMode={lightMode} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home profile={profile} />} />
        <Route path="/work" element={<Work profile={profile} />} />
        <Route path="/contact" element={<Contact profile={profile} />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/certifications" element={<Certifications profile={profile} />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
