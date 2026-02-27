import React from 'react'
import Navbar from '../components/Navbar'
import HeroScene from '../scenes/HeroScene'
import DestinationsGrid from '../components/DestinationsGrid'

export default function HomePage({ vaporMode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#050010',
        overflowX: 'hidden',
      }}
    >
      <Navbar />
      <HeroScene vaporMode={vaporMode} />
      <DestinationsGrid />
    </div>
  )
}
