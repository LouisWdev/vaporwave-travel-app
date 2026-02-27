import React, { useState, useMemo } from 'react'
import { destinations } from '../data/destinations'
import SearchFilter from './SearchFilter'
import DestinationCard from './DestinationCard'
import BookingModal from './BookingModal'

const VIBES = ['chill', 'adventure', 'horror']

export default function DestinationsGrid() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeVibe, setActiveVibe] = useState('all')
  const [selectedDestination, setSelectedDestination] = useState(null)

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return destinations.filter((d) => {
      const vibeMatch = activeVibe === 'all' || d.vibe === activeVibe
      const searchMatch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      return vibeMatch && searchMatch
    })
  }, [searchQuery, activeVibe])

  const sectionStyle = {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  }

  const headingStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    letterSpacing: '0.12em',
    color: '#FF6EC7',
    textShadow: '0 0 20px rgba(255,110,199,0.5)',
    textAlign: 'center',
    marginBottom: '2.5rem',
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.75rem',
  }

  const emptyStyle = {
    gridColumn: '1 / -1',
    textAlign: 'center',
    fontFamily: "'VT323', monospace",
    fontSize: '1.4rem',
    color: 'rgba(200,180,255,0.45)',
    letterSpacing: '0.1em',
    padding: '3rem 0',
  }

  return (
    <section id="destinations" style={sectionStyle}>
      <h2 style={headingStyle}>// CHOOSE YOUR ESCAPE //</h2>

      <SearchFilter
        vibes={VIBES}
        activeVibe={activeVibe}
        onVibeChange={setActiveVibe}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div style={gridStyle}>
        {filtered.length > 0 ? (
          filtered.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onBook={setSelectedDestination}
            />
          ))
        ) : (
          <p style={emptyStyle}>
            NO SIGNAL IN THIS SECTOR... TRY A DIFFERENT FREQUENCY
          </p>
        )}
      </div>

      {selectedDestination && (
        <BookingModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </section>
  )
}
