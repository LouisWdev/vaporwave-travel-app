import React from 'react'

export default function SearchFilter({
  vibes,
  activeVibe,
  onVibeChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="filter-row">
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search destinations"
        aria-label="Search destinations"
      />

      <div className="pills" role="group" aria-label="Filter by mood">
        <button
          className={`pill${activeVibe === 'all' ? ' active' : ''}`}
          onClick={() => onVibeChange('all')}
          aria-pressed={activeVibe === 'all'}
        >
          All
        </button>
        {vibes.map((vibe) => (
          <button
            key={vibe}
            className={`pill${activeVibe === vibe ? ' active' : ''}`}
            onClick={() => onVibeChange(vibe)}
            aria-pressed={activeVibe === vibe}
          >
            {vibe}
          </button>
        ))}
      </div>
    </div>
  )
}
