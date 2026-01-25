import { Link, useLocation } from 'react-router-dom'

export default function Header({ lightMode, toggleTheme }) {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <header>
      <img 
        src={lightMode ? `${import.meta.env.BASE_URL}logo/logolightmode2.png` : `${import.meta.env.BASE_URL}logo/plogo2.png`} 
        alt="Logo" 
        id="plogo" 
      />
      <ul>
        <li>
            <Link to="/" id={currentPath === "/" ? "Home" : ""}>Home</Link>
        </li>
        <li>
            <Link to="/work" id={currentPath === "/work" ? "Home" : ""}>Work</Link>
        </li>
        <li>
            <Link to="/resume" id={currentPath === "/resume" ? "Home" : ""}>Resume</Link>
        </li>
        <li>
            <Link to="/contact" id={currentPath === "/contact" ? "Home" : ""}>Contact</Link>
        </li>
        <li>
            <img 
                src={lightMode ? `${import.meta.env.BASE_URL}logo/moon.png` : `${import.meta.env.BASE_URL}logo/sun.png`} 
                alt="Theme Toggle" 
                id="icon" 
                onClick={toggleTheme}
            />
        </li>
      </ul>
    </header>
  )
}
