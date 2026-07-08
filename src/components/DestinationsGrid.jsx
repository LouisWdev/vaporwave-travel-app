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

  return (
    <section id="departures" className="departures">
      <div className="section-head">
        <h2 className="section-title">
          Tonight&rsquo;s <em>departures</em>
        </h2>
        <span className="section-meta">
          {filtered.length} ROUTES · ALL FARES ONE-WAY
        </span>
      </div>

      <SearchFilter
        vibes={VIBES}
        activeVibe={activeVibe}
        onVibeChange={setActiveVibe}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="cards">
        {filtered.length > 0 ? (
          filtered.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onBook={setSelectedDestination}
            />
          ))
        ) : (
          <p className="empty">No departures match. Adjust your search.</p>
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
