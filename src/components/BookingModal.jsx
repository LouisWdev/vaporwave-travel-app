import React, { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// The modal is the full ticket: header strip, destination, fine print grid
// (note the RETURN column), perforation, fare + reserve.
export default function BookingModal({ destination, onClose }) {
  const [reserved, setReserved] = useState(false)

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
  const d = destination

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <motion.div
          className="ticket"
          style={{ '--accent': d.color }}
          initial={{ scale: 0.92, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Ticket for ${d.name}`}
        >
          <div className="ticket-head">
            <span>VAPOR TRAVEL BUREAU · VPR → {d.code}</span>
            <button className="ticket-close" onClick={onClose} aria-label="Close ticket">
              ✕
            </button>
          </div>

          <div className="ticket-main">
            <h2 className="ticket-name">{d.name}</h2>
            <p className="ticket-tag">{d.tagline}</p>
            <p className="ticket-desc">{d.description}</p>
          </div>

          <div className="ticket-grid">
            <div className="ticket-cell">
              <b>GATE</b>
              {d.gate}
            </div>
            <div className="ticket-cell">
              <b>DEPARTS</b>
              {d.departs}
            </div>
            <div className="ticket-cell">
              <b>RETURN</b>—
            </div>
            <div className="ticket-cell">
              <b>RATING</b>
              {d.rating.toFixed(1)}
            </div>
          </div>

          <div className="ticket-foot">
            <span className="ticket-fare">
              {d.fare}
              <small>ONE-WAY</small>
            </span>
            <button
              className={`btn btn-primary${reserved ? ' btn-reserved' : ''}`}
              onClick={() => setReserved(true)}
              disabled={reserved}
            >
              {reserved ? 'Seat reserved ✓' : 'Reserve seat'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
