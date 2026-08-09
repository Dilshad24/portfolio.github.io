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
import daLogo from './assets/my images/logo.webp'
import './index.css'

function AppContent() {
  const [lightMode, setLightMode] = useState(() => localStorage.getItem("lightMode") === "enabled")
  const [profile, setProfile] = useState(fallbackProfile)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add("lightmode")
      localStorage.setItem("lightMode", "enabled")
    } else {
      document.body.classList.remove("lightmode")
      localStorage.setItem("lightMode", "null")
    }
  }, [lightMode])

  useEffect(() => {
    loadProfile()
      .then(setProfile)
      .catch(() => setProfile(fallbackProfile))
      .finally(() => setLoading(false))
  }, [])

  const toggleTheme = () => setLightMode(!lightMode)

  if (loading) {
    return (
      <>
        <ParticlesBackground />
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '28px',
          background: 'var(--paper)',
        }}>
          <div style={{ position: 'relative', width: '80px', height: '80px' }}>
            {/* Pulsing ring */}
            <div style={{
              position: 'absolute', inset: '-8px',
              border: '2px solid transparent',
              borderTopColor: 'var(--red)',
              borderRadius: '50%',
              animation: 'loader-spin 1s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: '-16px',
              border: '2px solid transparent',
              borderBottomColor: 'rgba(235,32,39,0.3)',
              borderRadius: '50%',
              animation: 'loader-spin 1.8s linear infinite reverse',
            }} />
            {/* DA logo */}
            <img src={daLogo} alt="DA" style={{
              width: '100%', height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 30px rgba(235,32,39,0.4))',
              animation: 'loader-pulse 1.5s ease-in-out infinite',
            }} />
          </div>
          <p style={{
            color: 'var(--muted)',
            fontSize: '.75rem',
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            animation: 'loader-fade 1.5s ease-in-out infinite',
          }}>Loading</p>
        </div>
        <style>{`
          @keyframes loader-spin { to { transform: rotate(360deg) } }
          @keyframes loader-pulse { 0%,100% { filter: drop-shadow(0 0 15px rgba(235,32,39,0.2)) } 50% { filter: drop-shadow(0 0 40px rgba(235,32,39,0.6)) } }
          @keyframes loader-fade { 0%,100% { opacity: .4 } 50% { opacity: 1 } }
        `}</style>
      </>
    )
  }

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
