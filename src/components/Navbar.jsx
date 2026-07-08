import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const handleDeparturesClick = (e) => {
    e.preventDefault()
    document.getElementById('departures')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="nav">
      <Link to="/" className="wordmark">
        <span className="wordmark-name">Vapor Travel</span>
        <span className="wordmark-sub">蒸気旅行 · EST. 1985</span>
      </Link>

      <ul className="nav-links">
        <li>
          <a className="nav-link" href="#departures" onClick={handleDeparturesClick}>
            Departures
          </a>
        </li>
        <li>
          <Link className="nav-link" to="/tour">
            Virtual tour
          </Link>
        </li>
      </ul>
    </nav>
  )
}
