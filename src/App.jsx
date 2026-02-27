import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TourPage from './pages/TourPage'
import VHSOverlay from './components/VHSOverlay'
import { useVaporMode } from './hooks/useVaporMode'

export default function App() {
  const vaporMode = useVaporMode()

  return (
    <BrowserRouter>
      <VHSOverlay />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              vaporMode={vaporMode}
            />
          }
        />
        <Route
          path="/tour"
          element={
            <TourPage
              vaporMode={vaporMode}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
