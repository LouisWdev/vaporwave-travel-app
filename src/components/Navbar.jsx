import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDestinationsClick = (e) => {
    e.preventDefault()
    const el = document.getElementById('destinations')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    zIndex: 9000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    backgroundColor: scrolled
      ? 'rgba(5, 0, 20, 0.92)'
      : 'rgba(5, 0, 20, 0.75)',
    borderBottom: '1px solid rgba(255, 110, 199, 0.2)',
    transition: 'background-color 0.3s ease',
  }

  const logoStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1.6rem',
    letterSpacing: '0.12em',
    color: '#FF6EC7',
    textDecoration: 'none',
    textShadow:
      '0 0 10px #FF6EC7, 0 0 25px #FF6EC7, 0 0 50px rgba(255,110,199,0.4)',
    userSelect: 'none',
  }

  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  }

  const linkBaseStyle = {
    fontFamily: "'VT323', monospace",
    fontSize: '1.1rem',
    letterSpacing: '0.1em',
    color: 'rgba(200, 180, 255, 0.85)',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '4px 0',
    position: 'relative',
    transition: 'color 0.2s ease, text-shadow 0.2s ease',
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        ⚡ VAPOR TRAVEL
      </Link>

      <ul style={navLinksStyle}>
        <li>
          <NavLink
            as="a"
            href="#destinations"
            onClick={handleDestinationsClick}
            baseStyle={linkBaseStyle}
          >
            DESTINATIONS
          </NavLink>
        </li>
        <li>
          <NavLink as={Link} to="/tour" baseStyle={linkBaseStyle}>
            VIRTUAL TOUR
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

// Internal helper that handles both <a> and <Link> rendering with hover glow
function NavLink({ as: Tag, children, baseStyle, ...props }) {
  const [hovered, setHovered] = useState(false)

  const style = {
    ...baseStyle,
    color: hovered ? '#FF6EC7' : baseStyle.color,
    textShadow: hovered
      ? '0 0 8px #FF6EC7, 0 0 20px rgba(255,110,199,0.6)'
      : 'none',
  }

  // Underline glow pseudo-element via inline box-shadow trick
  const wrapStyle = {
    position: 'relative',
    display: 'inline-block',
  }

  const underlineStyle = {
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #FF6EC7, #9D00FF)',
    boxShadow: '0 0 6px #FF6EC7',
    opacity: hovered ? 1 : 0,
    transition: 'opacity 0.2s ease',
    borderRadius: '1px',
  }

  return (
    <span style={wrapStyle}>
      <Tag
        {...props}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </Tag>
      <span style={underlineStyle} aria-hidden="true" />
    </span>
  )
}
