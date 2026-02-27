import React, { useState } from 'react'
import DestinationPreview from '../scenes/DestinationPreview'

export default function DestinationCard({ destination, onBook }) {
  const [hovered, setHovered] = useState(false)

  const cardStyle = {
    backgroundColor: '#0D0020',
    border: `1.5px solid ${hovered ? destination.color : destination.color + '55'}`,
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
    transform: hovered ? 'scale(1.025) translateY(-4px)' : 'scale(1) translateY(0)',
    boxShadow: hovered
      ? `0 0 25px ${destination.color}55, 0 8px 30px rgba(0,0,0,0.6)`
      : `0 0 8px ${destination.color}22, 0 4px 16px rgba(0,0,0,0.4)`,
    display: 'flex',
    flexDirection: 'column',
  }

  const previewWrapStyle = {
    width: '100%',
    height: '200px',
    position: 'relative',
    backgroundColor: '#050010',
    flexShrink: 0,
  }

  const contentStyle = {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: 1,
  }

  const nameStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1.5rem',
    letterSpacing: '0.06em',
    color: hovered ? destination.color : '#E8D5FF',
    textShadow: hovered ? `0 0 12px ${destination.color}` : 'none',
    transition: 'color 0.25s ease, text-shadow 0.25s ease',
    lineHeight: 1.1,
    margin: 0,
  }

  const vibePillStyle = {
    display: 'inline-block',
    fontFamily: "'VT323', monospace",
    fontSize: '0.8rem',
    letterSpacing: '0.14em',
    padding: '2px 9px',
    borderRadius: '12px',
    border: `1px solid ${destination.color}66`,
    color: destination.color,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  }

  const taglineStyle = {
    fontFamily: "'VT323', monospace",
    fontSize: '1rem',
    color: 'rgba(200, 180, 255, 0.7)',
    letterSpacing: '0.04em',
    margin: 0,
    flex: 1,
  }

  const footerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.75rem',
  }

  const priceStyle = {
    fontFamily: "'VT323', monospace",
    fontSize: '1.05rem',
    color: '#00FFFF',
    textShadow: '0 0 6px #00FFFF',
    letterSpacing: '0.08em',
  }

  const exploreButtonStyle = {
    fontFamily: "'VT323', monospace",
    fontSize: '1rem',
    letterSpacing: '0.12em',
    color: hovered ? destination.color : 'rgba(255,110,199,0.75)',
    textShadow: hovered ? `0 0 8px ${destination.color}` : 'none',
    background: 'none',
    border: `1px solid ${hovered ? destination.color + 'aa' : 'rgba(255,110,199,0.3)'}`,
    borderRadius: '4px',
    padding: '4px 12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }

  return (
    <article
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onBook(destination)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onBook(destination)
        }
      }}
      aria-label={`Explore ${destination.name}`}
    >
      {/* 3D Preview */}
      <div style={previewWrapStyle}>
        <DestinationPreview
          model={destination.model}
          color={destination.color}
          accentColor={destination.accent}
          hovered={hovered}
        />
      </div>

      {/* Content */}
      <div style={contentStyle}>
        <h3 style={nameStyle}>{destination.name}</h3>
        <span style={vibePillStyle}>{destination.vibe}</span>
        <p style={taglineStyle}>{destination.tagline}</p>

        <div style={footerStyle}>
          <span style={priceStyle}>{destination.price}</span>
          <button
            style={exploreButtonStyle}
            onClick={(e) => {
              e.stopPropagation()
              onBook(destination)
            }}
            tabIndex={-1}
            aria-hidden="true"
          >
            EXPLORE →
          </button>
        </div>
      </div>
    </article>
  )
}
