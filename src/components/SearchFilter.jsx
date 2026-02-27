import React from 'react'

const VIBES = ['ALL', 'CHILL', 'ADVENTURE', 'HORROR']

export default function SearchFilter({
  vibes,
  activeVibe,
  onVibeChange,
  searchQuery,
  onSearchChange,
}) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '2.5rem',
  }

  const inputStyle = {
    flex: '1 1 220px',
    minWidth: '180px',
    padding: '10px 16px',
    fontFamily: "'VT323', monospace",
    fontSize: '1.15rem',
    letterSpacing: '0.1em',
    color: '#FF6EC7',
    backgroundColor: 'rgba(5, 0, 20, 0.85)',
    border: '1px solid rgba(255, 110, 199, 0.45)',
    borderRadius: '4px',
    outline: 'none',
    caretColor: '#FF6EC7',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  }

  const pillsWrapStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
  }

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="SEARCH THE VOID..."
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(255, 110, 199, 0.85)'
          e.target.style.boxShadow =
            '0 0 12px rgba(255, 110, 199, 0.3), inset 0 0 8px rgba(255, 110, 199, 0.05)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255, 110, 199, 0.45)'
          e.target.style.boxShadow = 'none'
        }}
        aria-label="Search destinations"
      />

      <div style={pillsWrapStyle} role="group" aria-label="Filter by vibe">
        {VIBES.map((vibe) => {
          const isActive =
            activeVibe.toUpperCase() === vibe ||
            (vibe === 'ALL' && activeVibe === 'all')

          return (
            <VibePill
              key={vibe}
              label={vibe}
              active={isActive}
              onClick={() =>
                onVibeChange(vibe === 'ALL' ? 'all' : vibe.toLowerCase())
              }
            />
          )
        })}
      </div>
    </div>
  )
}

function VibePill({ label, active, onClick }) {
  const [hovered, setHovered] = React.useState(false)

  const style = {
    fontFamily: "'VT323', monospace",
    fontSize: '1rem',
    letterSpacing: '0.12em',
    padding: '5px 14px',
    borderRadius: '20px',
    border: active
      ? '1px solid #FF6EC7'
      : '1px solid rgba(255,110,199,0.3)',
    color: active ? '#FF6EC7' : 'rgba(200,180,255,0.65)',
    backgroundColor: active
      ? 'rgba(255,110,199,0.12)'
      : hovered
        ? 'rgba(255,110,199,0.06)'
        : 'transparent',
    textShadow: active
      ? '0 0 8px #FF6EC7, 0 0 16px rgba(255,110,199,0.4)'
      : hovered
        ? '0 0 6px rgba(255,110,199,0.4)'
        : 'none',
    boxShadow: active
      ? '0 0 10px rgba(255,110,199,0.25)'
      : 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
  }

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={active}
      aria-label={`Filter: ${label}`}
    >
      {label}
    </button>
  )
}
