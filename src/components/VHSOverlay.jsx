import React from 'react'

export default function VHSOverlay() {
  return (
    <>
      <div className="vhs-overlay" aria-hidden="true" />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
