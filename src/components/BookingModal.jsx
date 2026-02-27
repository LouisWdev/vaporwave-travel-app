import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const partial = rating % 1
  const empty = 5 - Math.ceil(rating)

  return (
    <span style={{ fontSize: '1.1rem', letterSpacing: '2px' }} aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`full-${i}`} style={{ color: '#FFD93D', textShadow: '0 0 6px #FFD93D' }}>
          ★
        </span>
      ))}
      {partial > 0 && (
        <span
          key="partial"
          style={{
            color: '#FFD93D',
            textShadow: '0 0 6px #FFD93D',
            opacity: partial,
          }}
        >
          ★
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`empty-${i}`} style={{ color: 'rgba(255,211,61,0.25)' }}>
          ★
        </span>
      ))}
      <span
        style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1rem',
          color: '#FFD93D',
          marginLeft: '6px',
          opacity: 0.9,
        }}
      >
        {rating.toFixed(1)}
      </span>
    </span>
  )
}

export default function BookingModal({ destination, onClose }) {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [handleEscape])

  if (!destination) return null

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: 'rgba(5, 0, 20, 0.82)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  }

  const modalStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#0D0020',
    border: `2px solid ${destination.color}`,
    borderRadius: '8px',
    boxShadow: `0 0 30px ${destination.color}55, 0 0 80px ${destination.color}22, inset 0 0 30px rgba(0,0,0,0.5)`,
    padding: '2.5rem',
    overflowY: 'auto',
    maxHeight: '90vh',
  }

  const headerStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(2rem, 6vw, 3rem)',
    letterSpacing: '0.08em',
    lineHeight: 1.1,
    marginBottom: '0.25rem',
    background: `linear-gradient(135deg, ${destination.color}, ${destination.accent})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  const taglineStyle = {
    fontFamily: "'VT323', monospace",
    fontSize: '1.25rem',
    color: destination.accent,
    textShadow: `0 0 8px ${destination.accent}`,
    marginBottom: '1.25rem',
    letterSpacing: '0.05em',
  }

  const descStyle = {
    fontFamily: "'VT323', monospace",
    fontSize: '1.1rem',
    color: 'rgba(200, 180, 255, 0.85)',
    lineHeight: 1.55,
    marginBottom: '1.5rem',
  }

  const infoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    gap: '1rem',
    flexWrap: 'wrap',
  }

  const priceStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1.6rem',
    color: '#00FFFF',
    textShadow: '0 0 10px #00FFFF, 0 0 25px rgba(0,255,255,0.4)',
    letterSpacing: '0.1em',
  }

  const subtitleStyle = {
    fontFamily: "'VT323', monospace",
    fontSize: '0.95rem',
    color: 'rgba(255, 110, 199, 0.5)',
    textAlign: 'center',
    letterSpacing: '0.15em',
    marginBottom: '1.25rem',
  }

  const bookButtonStyle = {
    width: '100%',
    padding: '14px',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1.4rem',
    letterSpacing: '0.2em',
    color: '#0D0020',
    background: `linear-gradient(135deg, #FF6EC7, #9D00FF)`,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(255,110,199,0.5), 0 0 40px rgba(157,0,255,0.3)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    textTransform: 'uppercase',
  }

  const closeBtnStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: `1px solid ${destination.color}66`,
    borderRadius: '50%',
    color: destination.color,
    fontSize: '1.1rem',
    cursor: 'pointer',
    lineHeight: 1,
    transition: 'all 0.2s ease',
  }

  const vibePillStyle = {
    display: 'inline-block',
    fontFamily: "'VT323', monospace",
    fontSize: '0.9rem',
    letterSpacing: '0.12em',
    padding: '2px 10px',
    borderRadius: '20px',
    border: `1px solid ${destination.color}88`,
    color: destination.color,
    textShadow: `0 0 6px ${destination.color}`,
    marginBottom: '1rem',
    textTransform: 'uppercase',
  }

  return (
    <AnimatePresence>
      <motion.div
        style={overlayStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <motion.div
          style={modalStyle}
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 280 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Book ${destination.name}`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={closeBtnStyle}
            aria-label="Close modal"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${destination.color}22`
              e.currentTarget.style.boxShadow = `0 0 8px ${destination.color}66`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            ✕
          </button>

          {/* Header */}
          <h2 style={headerStyle}>{destination.name}</h2>
          <div style={vibePillStyle}>{destination.vibe}</div>
          <p style={taglineStyle}>"{destination.tagline}"</p>

          {/* Description */}
          <p style={descStyle}>{destination.description}</p>

          {/* Rating + Price */}
          <div style={infoRowStyle}>
            <StarRating rating={destination.rating} />
            <span style={priceStyle}>{destination.price}</span>
          </div>

          {/* Subtitle */}
          <p style={subtitleStyle}>∞ DESTINATIONS AWAIT</p>

          {/* Book button */}
          <button
            style={bookButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow =
                '0 0 30px rgba(255,110,199,0.7), 0 0 60px rgba(157,0,255,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow =
                '0 0 20px rgba(255,110,199,0.5), 0 0 40px rgba(157,0,255,0.3)'
            }}
            onClick={() => {
              alert(`BOOKING CONFIRMED: ${destination.name}\n\nYour journey into the void begins now.`)
            }}
          >
            BOOK NOW
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
