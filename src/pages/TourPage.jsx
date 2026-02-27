import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TourScene from '../scenes/TourScene'

export default function TourPage({ vaporMode }) {
  const navigate = useNavigate()

  const pageStyle = {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#050010',
    position: 'relative',
  }

  const instructionsStyle = {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    fontFamily: "'VT323', monospace",
    fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
    letterSpacing: '0.15em',
    color: 'rgba(255, 110, 199, 0.7)',
    textShadow: '0 0 8px rgba(255, 110, 199, 0.4)',
    textAlign: 'center',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  }

  const instructionsDividerStyle = {
    color: 'rgba(0, 255, 255, 0.4)',
    margin: '0 0.75rem',
  }

  const backButtonStyle = {
    position: 'absolute',
    top: '80px',
    left: '2rem',
    zIndex: 100,
    fontFamily: "'VT323', monospace",
    fontSize: '1.1rem',
    letterSpacing: '0.12em',
    color: '#00FFFF',
    textShadow: '0 0 8px #00FFFF, 0 0 20px rgba(0,255,255,0.4)',
    background: 'rgba(5, 0, 20, 0.75)',
    border: '1px solid rgba(0, 255, 255, 0.4)',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    transition: 'all 0.2s ease',
  }

  return (
    <div style={pageStyle}>
      <Navbar />

      {/* Full-screen 3D tour canvas */}
      <TourScene vaporMode={vaporMode} />

      {/* Back button */}
      <button
        style={backButtonStyle}
        onClick={() => navigate('/')}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FF6EC7'
          e.currentTarget.style.borderColor = 'rgba(255,110,199,0.5)'
          e.currentTarget.style.textShadow =
            '0 0 8px #FF6EC7, 0 0 20px rgba(255,110,199,0.4)'
          e.currentTarget.style.boxShadow = '0 0 12px rgba(255,110,199,0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#00FFFF'
          e.currentTarget.style.borderColor = 'rgba(0,255,255,0.4)'
          e.currentTarget.style.textShadow =
            '0 0 8px #00FFFF, 0 0 20px rgba(0,255,255,0.4)'
          e.currentTarget.style.boxShadow = 'none'
        }}
        aria-label="Return to home page"
      >
        ← RETURN TO PORTAL
      </button>

      {/* Instructions overlay */}
      <p style={instructionsStyle}>
        <span>CLICK TO EXPLORE</span>
        <span style={instructionsDividerStyle}>//</span>
        <span>DRAG TO ORBIT</span>
        <span style={instructionsDividerStyle}>//</span>
        <span>SCROLL TO ZOOM</span>
      </p>
    </div>
  )
}
