import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text3D, Center } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import PalmTree from './PalmTree'
import VaporGrid from './VaporGrid'
import OrbitingSun from './OrbitingSun'

function HeroLights() {
  return (
    <>
      <ambientLight intensity={0.2} color="#3D0070" />
      <pointLight position={[5, 5, 5]} color="#FF6EC7" intensity={3} />
      <pointLight position={[-5, 3, -5]} color="#00FFFF" intensity={2} />
      <pointLight position={[0, -2, 3]} color="#9D00FF" intensity={1.5} />
    </>
  )
}

// Floating background palms
function BackgroundPalms() {
  return (
    <>
      <PalmTree position={[-4, -1, -3]} color="#FF6EC7" accentColor="#9D00FF" scale={1.2} spinSpeed={0.2} />
      <PalmTree position={[4, -1, -4]} color="#00FFFF" accentColor="#FF6EC7" scale={1.0} spinSpeed={0.25} />
      <PalmTree position={[-7, -1, -6]} color="#9D00FF" accentColor="#00FFFF" scale={0.8} spinSpeed={0.15} />
      <PalmTree position={[7, -1, -5]} color="#FFD93D" accentColor="#FF6B35" scale={0.9} spinSpeed={0.35} />
      <PalmTree position={[0, -1, -8]} color="#FF6EC7" accentColor="#00FFFF" scale={1.5} spinSpeed={0.1} />
    </>
  )
}

// 3D Scene inside canvas
function HeroSceneContent({ vaporMode }) {
  return (
    <>
      <HeroLights />
      <fog attach="fog" args={['#0A0015', 8, 25]} />
      <VaporGrid color={vaporMode ? '#FF0080' : '#FF6EC7'} />
      <BackgroundPalms />
      <OrbitingSun orbitRadius={8} orbitSpeed={0.12} position={[0, 3, -10]} />
      <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

export default function HeroScene({ vaporMode = false }) {
  const navigate = useNavigate()

  const scrollToDestinations = () => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* 3D Canvas Background */}
      <Canvas
        camera={{ position: [0, 1, 6], fov: 75 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          background: 'linear-gradient(180deg, #0A0015 0%, #1A0030 50%, #0A0015 100%)',
        }}
      >
        <Suspense fallback={null}>
          <HeroSceneContent vaporMode={vaporMode} />
        </Suspense>
      </Canvas>

      {/* Hero Text Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        {/* Top label */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
          color: '#00FFFF',
          letterSpacing: '0.4em',
          marginBottom: '1rem',
          textShadow: '0 0 10px #00FFFF',
          opacity: 0.8,
        }}>
          ▸ TEMPORAL COORDINATES: 1985 ◂
        </div>

        {/* Main glitch headline */}
        <div
          className="glitch-container"
          data-text="ESCAPE TO THE GRID"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            color: '#FF6EC7',
            textShadow: '0 0 20px #FF6EC7, 0 0 40px rgba(255,110,199,0.5)',
            letterSpacing: '0.05em',
            textAlign: 'center',
            lineHeight: 1,
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        >
          ESCAPE TO THE GRID
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: 'var(--font-tech)',
          fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
          color: '#9D00FF',
          letterSpacing: '0.2em',
          margin: '1.5rem 0',
          textShadow: '0 0 10px #9D00FF',
          textAlign: 'center',
        }}>
          INFINITE DESTINATIONS // ZERO RETURN TICKETS
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', pointerEvents: 'all' }}>
          <button
            onClick={scrollToDestinations}
            style={{
              fontFamily: 'var(--font-tech)',
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              padding: '0.8rem 2rem',
              background: 'transparent',
              border: '2px solid #FF6EC7',
              color: '#FF6EC7',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 0 15px rgba(255,110,199,0.4), inset 0 0 15px rgba(255,110,199,0.05)',
              transition: 'all 0.3s ease',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,110,199,0.15)'
              e.target.style.boxShadow = '0 0 30px rgba(255,110,199,0.7), inset 0 0 20px rgba(255,110,199,0.1)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.boxShadow = '0 0 15px rgba(255,110,199,0.4), inset 0 0 15px rgba(255,110,199,0.05)'
            }}
          >
            BROWSE DESTINATIONS
          </button>
          <button
            onClick={() => navigate('/tour')}
            style={{
              fontFamily: 'var(--font-tech)',
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              padding: '0.8rem 2rem',
              background: 'rgba(0,255,255,0.1)',
              border: '2px solid #00FFFF',
              color: '#00FFFF',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 0 15px rgba(0,255,255,0.4)',
              transition: 'all 0.3s ease',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(0,255,255,0.2)'
              e.target.style.boxShadow = '0 0 30px rgba(0,255,255,0.7)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(0,255,255,0.1)'
              e.target.style.boxShadow = '0 0 15px rgba(0,255,255,0.4)'
            }}
          >
            VIRTUAL TOUR ▸
          </button>
        </div>

        {/* Vapor mode hint / active indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          transition: 'all 0.4s ease',
          color: vaporMode ? '#FF00CC' : 'rgba(255,110,199,0.4)',
          textShadow: vaporMode ? '0 0 12px #FF00CC, 0 0 24px rgba(255,0,204,0.6)' : 'none',
          animation: vaporMode ? 'pulse-glow 1s ease-in-out infinite' : 'none',
        }}>
          {vaporMode ? '◈ VAPOR MODE ENGAGED ◈' : '∴ HOLD [V] FOR VAPOR MODE ∴'}
        </div>
      </div>
    </section>
  )
}
