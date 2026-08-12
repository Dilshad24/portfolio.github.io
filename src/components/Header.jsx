import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import daLogo from '../assets/my images/logo.webp'

const nav = [
  ['/', 'Home'],
  ['/work', 'Projects'],
  ['/resume', 'Résumé'],
  ['/certifications', 'Certifications'],
  ['/contact', 'Contact'],
]

const getIcon = (to) => {
  switch (to) {
    case '/': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case '/work': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
    case '/resume': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case '/certifications': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>;
    case '/contact': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
    default: return null;
  }
}

const ArrowRight = () => (
  <svg className="nav-arrow desktop-hide" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
)

export default function Header({ lightMode, toggleTheme }) {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('menu-open')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Dilshad Ali home" onClick={() => setIsMenuOpen(false)}>
          <img className="brand-mark" src={daLogo} alt="DA" />
          <span style={{ opacity: isMenuOpen ? 0 : 1, visibility: isMenuOpen ? 'hidden' : 'visible', transition: 'all 0.3s' }}><b>Dilshad Ali</b><small>Software Engineer</small></span>
        </Link>
        
        <nav aria-label="Main navigation" className={isMenuOpen ? 'open' : ''}>
          <div className="mobile-nav-header desktop-hide">
            <p>Hi, I'm</p>
            <h2><span className="highlight-text">Dilshad</span> Ali</h2>
            <small>Guidewire Developer</small>
          </div>

          <div className="nav-links-container">
            {nav.map(([to, label]) => (
              <Link key={to} to={to} className={pathname === to ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>
                <span className="nav-icon desktop-hide">{getIcon(to)}</span>
                <span className="nav-label">{label}</span>
                {pathname === to && <ArrowRight />}
              </Link>
            ))}
          </div>

          <div className="mobile-nav-footer desktop-hide">
            <p>Let's connect</p>
            <div className="social-row-mobile">
              <a href="https://github.com/Dilshad24" target="_blank" rel="noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"/><path d="M12 18v4"/></svg></a>
              <a href="https://linkedin.com/in/dilshad-ali" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="mailto:dilshad.ali@example.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>
            </div>
            <div className="dot-grid"></div>
          </div>

          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle color theme">
            <img src={`${import.meta.env.BASE_URL}logo/${lightMode ? 'moon.png' : 'sun.png'}`} alt="" />
          </button>
        </nav>

        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
