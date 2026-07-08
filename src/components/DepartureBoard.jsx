import React from 'react'
import { destinations } from '../data/destinations'

const OK_STATUSES = ['ON TIME', 'BOARDING']

// Ticker strip pinned to the bottom edge of the hero. Content is rendered
// twice so the -50% translate loops seamlessly.
export default function DepartureBoard() {
  const rows = [...destinations, ...destinations]

  return (
    <div className="board" aria-hidden="true">
      <div className="board-inner">
        <span className="board-label">DEPARTURES</span>
        <div className="board-viewport">
          <div className="board-track">
            {rows.map((d, i) => (
              <span className="board-item" key={i}>
                VPR-{String(d.id).padStart(3, '0')}{' '}
                <b>{d.name.toUpperCase()}</b> · GATE {d.gate} · {d.departs} ·{' '}
                <span className={OK_STATUSES.includes(d.status) ? 'ok' : 'warn'}>
                  {d.status}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
