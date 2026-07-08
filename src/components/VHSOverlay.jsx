import React from 'react'

// One static CRT grain layer — no animation loop, no repaints.
export default function VHSOverlay() {
  return <div className="grain" aria-hidden="true" />
}
