import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Html, useProgress } from '@react-three/drei'
import PalmTree from './PalmTree'
import VaporGrid from './VaporGrid'
import OrbitingSun from './OrbitingSun'

const HOTSPOTS = [
  { id: 1, position: [-4, 0.5, -2], label: 'NEON OASIS', description: 'Book your stay in the eternal Miami sunset', color: '#FF6EC7' },
  { id: 2, position: [4, 0.5, -3], label: 'GRID TOWER', description: 'Ascending wireframe spires pierce the data sky', color: '#00FFFF' },
  { id: 3, position: [0, 1, -6], label: 'VOID PORTAL', description: 'A gateway to the deeper simulation layers', color: '#9D00FF' },
]

function Hotspot({ position, label, description, color, onBook }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.15
      meshRef.current.rotation.y += 0.02
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => onBook({ name: label, description, color })}
      >
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 3 : 1.5}
          wireframe={false}
        />
      </mesh>
      {/* Pulsing ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.02, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.6} />
      </mesh>
      {hovered && (
        <Html center distanceFactor={8}>
          <div style={{
            background: 'rgba(10,0,21,0.95)',
            border: `1px solid ${color}`,
            borderRadius: 4,
            padding: '8px 12px',
            color: color,
            fontFamily: 'VT323, monospace',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            boxShadow: `0 0 15px ${color}`,
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '18px' }}>{label}</div>
            <div style={{ opacity: 0.8, fontSize: '12px' }}>CLICK TO BOOK</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ color: '#FF6EC7', fontFamily: 'VT323, monospace', fontSize: '24px', textAlign: 'center' }}>
        <div>LOADING THE VOID</div>
        <div style={{ fontSize: '14px', opacity: 0.6 }}>{Math.round(progress)}%</div>
      </div>
    </Html>
  )
}

function TourSceneContent({ onBookHotspot, vaporMode = false }) {
  return (
    <>
      <ambientLight intensity={vaporMode ? 0.3 : 0.15} color={vaporMode ? '#7000A0' : '#3D0070'} />
      <pointLight position={[0, 5, 0]} color="#FF6EC7" intensity={vaporMode ? 8 : 4} />
      <pointLight position={[-8, 2, -4]} color="#00FFFF" intensity={vaporMode ? 4 : 2} />
      <pointLight position={[8, 2, -4]} color="#9D00FF" intensity={vaporMode ? 4 : 2} />
      <fog attach="fog" args={[vaporMode ? '#1A0030' : '#0A0015', 8, 28]} />

      <VaporGrid color={vaporMode ? '#FF00CC' : '#9D00FF'} size={30} divisions={25} />

      {/* Scattered palms */}
      <PalmTree position={[-3, -1, -2]} color="#FF6EC7" accentColor="#9D00FF" scale={1.3} spinSpeed={0.2} />
      <PalmTree position={[3, -1, -3]} color="#00FFFF" accentColor="#FF6EC7" scale={1.1} spinSpeed={0.3} />
      <PalmTree position={[-6, -1, -5]} color="#9D00FF" accentColor="#00FFFF" scale={0.9} spinSpeed={0.15} />
      <PalmTree position={[6, -1, -4]} color="#FFD93D" accentColor="#FF6B35" scale={1.0} spinSpeed={0.25} />
      <PalmTree position={[0, -1, -8]} color="#FF6EC7" accentColor="#00FFFF" scale={1.6} spinSpeed={0.1} />
      <PalmTree position={[-9, -1, -7]} color="#00FFFF" accentColor="#9D00FF" scale={0.7} spinSpeed={0.4} />
      <PalmTree position={[9, -1, -6]} color="#9D00FF" accentColor="#FF6EC7" scale={0.8} spinSpeed={0.2} />

      <OrbitingSun orbitRadius={10} orbitSpeed={0.08} position={[0, 4, -12]} color="#FF6B35" accentColor="#FFD93D" />

      {/* Hotspot markers */}
      {HOTSPOTS.map(h => (
        <Hotspot key={h.id} {...h} onBook={onBookHotspot} />
      ))}

      <Stars radius={100} depth={60} count={4000} factor={4} saturation={0} fade speed={0.5} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI * 0.55}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  )
}

export default function TourScene({ vaporMode = false }) {
  const [bookedHotspot, setBookedHotspot] = useState(null)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 75 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{
          background: vaporMode
            ? 'linear-gradient(180deg, #1A0030 0%, #0D001A 50%, #200040 100%)'
            : 'linear-gradient(180deg, #050010 0%, #0A0015 50%, #150025 100%)',
          width: '100%',
          height: '100%',
          transition: 'background 0.5s ease',
        }}
      >
        <Suspense fallback={<Loader />}>
          <TourSceneContent onBookHotspot={setBookedHotspot} vaporMode={vaporMode} />
        </Suspense>
      </Canvas>

      {/* Booking modal for hotspots */}
      {bookedHotspot && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(10,0,21,0.97)',
          border: `2px solid ${bookedHotspot.color}`,
          borderRadius: 8,
          padding: '2rem',
          minWidth: 300,
          zIndex: 100,
          boxShadow: `0 0 40px ${bookedHotspot.color}`,
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', color: bookedHotspot.color, textShadow: `0 0 20px ${bookedHotspot.color}` }}>
            {bookedHotspot.name}
          </div>
          <div style={{ fontFamily: 'VT323, monospace', color: 'rgba(255,255,255,0.7)', margin: '1rem 0' }}>
            {bookedHotspot.description}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.8rem',
                padding: '0.6rem 1.5rem',
                background: bookedHotspot.color,
                border: 'none',
                color: '#0A0015',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                fontWeight: 700,
              }}
              onClick={() => setBookedHotspot(null)}
            >
              BOOK NOW ∞
            </button>
            <button
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.8rem',
                padding: '0.6rem 1.5rem',
                background: 'transparent',
                border: `1px solid ${bookedHotspot.color}`,
                color: bookedHotspot.color,
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
              onClick={() => setBookedHotspot(null)}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
