import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TourScene from '../scenes/TourScene'

export default function TourPage({ vaporMode }) {
  const navigate = useNavigate()

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--void)',
      }}
    >
      <Navbar />
      <TourScene vaporMode={vaporMode} />

      <button
        className="btn btn-ghost tour-back"
        onClick={() => navigate('/')}
        aria-label="Back to departures"
      >
        ← Departures
      </button>

      <p className="tour-help">DRAG TO ORBIT · SCROLL TO ZOOM · CLICK A BEACON</p>
    </div>
  )
}
