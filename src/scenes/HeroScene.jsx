import React, { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useNavigate } from 'react-router-dom'
import PalmTree from './PalmTree'
import VaporGrid from './VaporGrid'
import RetroSun from './RetroSun'
import DepartureBoard from '../components/DepartureBoard'

// Subtle mouse parallax on the camera
function Rig() {
  useFrame((state) => {
    const { pointer, camera } = state
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.05
    camera.position.y += (0.9 + pointer.y * 0.25 - camera.position.y) * 0.05
    camera.lookAt(0, 1.2, -10)
  })
  return null
}

function SceneContent({ vaporMode }) {
  return (
    <>
      <RetroSun position={[0, 2.2, -16]} radius={5} />
      <VaporGrid color={vaporMode ? '#05FFA1' : '#FF71CE'} y={-1.3} />

      {/* Silhouette palms flanking the sun */}
      <PalmTree position={[-5.2, -1.3, -4]} scale={1.5} lean={0.12} phase={0} />
      <PalmTree position={[-3.4, -1.3, -6.5]} scale={1.1} lean={-0.06} phase={2} />
      <PalmTree position={[4.6, -1.3, -3.5]} scale={1.6} lean={-0.14} phase={4} />
      <PalmTree position={[6.4, -1.3, -6]} scale={1.2} lean={0.08} phase={1} />
      <PalmTree position={[8.2, -1.3, -9]} scale={0.9} lean={-0.1} phase={3} />
      <PalmTree position={[-7.5, -1.3, -8]} scale={1.0} lean={0.05} phase={5} />

      <Stars radius={80} depth={40} count={2500} factor={3} saturation={0} fade speed={0.6} />
      <Rig />

      <EffectComposer>
        <Bloom intensity={0.85} luminanceThreshold={0.85} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function HeroScene({ vaporMode = false }) {
  const navigate = useNavigate()

  const scrollToDepartures = () => {
    document.getElementById('departures')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <Canvas
        className="hero-canvas"
        camera={{ position: [0, 0.9, 7], fov: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{
          background:
            'linear-gradient(180deg, #0B0318 0%, #1B0B3B 52%, #451667 74%, #0B0318 100%)',
        }}
      >
        <Suspense fallback={null}>
          <SceneContent vaporMode={vaporMode} />
        </Suspense>
      </Canvas>

      <div className="hero-overlay">
        <p className="hero-eyebrow">VAPOR TRAVEL BUREAU · 蒸気旅行社 · TERMINAL ∞</p>
        <h1 className="hero-title">
          Paradise, <em>rendered</em> nightly.
        </h1>
        <p className="hero-sub">
          Eight destinations that only exist after dark. The sun is stuck at
          golden hour, the mixtape never ends, and every fare is one-way.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={scrollToDepartures}>
            View departures
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/tour')}>
            Virtual tour →
          </button>
        </div>

        <span className={`hero-hint${vaporMode ? ' on' : ''}`}>
          {vaporMode ? '◈ VAPOR MODE' : 'HOLD V'}
        </span>
      </div>

      <DepartureBoard />
    </section>
  )
}
