import React, { useState } from 'react'
import DestinationPreview from '../scenes/DestinationPreview'

// A boarding pass: 3D postcard on top, route data, then a perforated
// tear-off stub with gate, departure time and fare.
export default function DestinationCard({ destination, onBook }) {
  const [hovered, setHovered] = useState(false)
  const d = destination

  return (
    <article
      className="pass"
      style={{ '--accent': d.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onBook(d)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onBook(d)
        }
      }}
      aria-label={`Open ticket for ${d.name}`}
    >
      <div className="pass-preview">
        <DestinationPreview
          model={d.model}
          color={d.color}
          accentColor={d.accent}
          hovered={hovered}
        />
      </div>

      <div className="pass-body">
        <div className="pass-route">
          <span>VPR → {d.code}</span>
          <span>{d.status}</span>
        </div>
        <h3 className="pass-name">{d.name}</h3>
        <p className="pass-tag">{d.tagline}</p>
      </div>

      <div className="pass-perf" aria-hidden="true" />

      <div className="pass-stub">
        <div className="stub-data">
          <span>
            <b>GATE</b>
            {d.gate}
          </span>
          <span>
            <b>DEPARTS</b>
            {d.departs}
          </span>
        </div>
        <span className="fare">{d.fare}</span>
      </div>
    </article>
  )
}
