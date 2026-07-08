import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Html, useProgress } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import PalmTree from './PalmTree'
import VaporGrid from './VaporGrid'
import RetroSun from './RetroSun'

const HOTSPOTS = [
  {
    id: 1,
    position: [-4, 0.5, -2],
    label: 'Neon Oasis',
    description: 'A poolside bar in the eternal Miami sunset. The water is warmer than it looks.',
    color: '#FF71CE',
  },
  {
    id: 2,
    position: [4, 0.5, -3],
    label: 'Grid Tower',
    description: 'Wireframe spires piercing the data sky. Observation deck on floor ∞.',
    color: '#01CDFE',
  },
  {
    id: 3,
    position: [0, 1, -6],
    label: 'Void Portal',
    description: 'A gateway to the deeper simulation layers. Mind the gap.',
    color: '#B967FF',
  },
]

function Hotspot({ position, label, description, color, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime + position[0]) * 0.15
      meshRef.current.rotation.y += 0.02
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => onSelect({ name: label, description, color })}
      >
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 3 : 1.6}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.015, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.6}
        />
      </mesh>
      {hovered && (
        <Html center distanceFactor={8} position={[0, 0.6, 0]}>
          <div className="tip" style={{ '--accent': color }}>
            <b>{label}</b>
            CLICK TO PREVIEW
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
      <div className="loader">LOADING TERMINAL — {Math.round(progress)}%</div>
    </Html>
  )
}

function TourSceneContent({ onSelectHotspot, vaporMode = false }) {
  return (
    <>
      <ambientLight intensity={0.4} color="#8A6BC8" />

      <RetroSun position={[0, 2.4, -18]} radius={5.5} />
      <VaporGrid
        color={vaporMode ? '#05FFA1' : '#B967FF'}
        y={-1.3}
        fadeFar={50}
      />

      {/* Silhouette grove */}
      <PalmTree position={[0, -1.3, 0]} scale={1.9} lean={0.1} phase={0} />
      <PalmTree position={[-3, -1.3, -2]} scale={1.4} lean={-0.08} phase={1} />
      <PalmTree position={[3, -1.3, -3]} scale={1.2} lean={0.12} phase={2} />
      <PalmTree position={[-6, -1.3, -5]} scale={1.0} lean={0.05} phase={3} />
      <PalmTree position={[6, -1.3, -4]} scale={1.1} lean={-0.12} phase={4} />
      <PalmTree position={[-9, -1.3, -7]} scale={0.8} lean={-0.06} phase={5} />
      <PalmTree position={[9, -1.3, -6]} scale={0.9} lean={0.08} phase={6} />

      {HOTSPOTS.map((h) => (
        <Hotspot key={h.id} {...h} onSelect={onSelectHotspot} />
      ))}

      <Stars radius={100} depth={60} count={3000} factor={3.5} saturation={0} fade speed={0.5} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI * 0.52}
        autoRotate
        autoRotateSpeed={0.35}
      />

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.8} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function TourScene({ vaporMode = false }) {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{
          background:
            'linear-gradient(180deg, #0B0318 0%, #1B0B3B 52%, #451667 74%, #0B0318 100%)',
        }}
      >
        <Suspense fallback={<Loader />}>
          <TourSceneContent onSelectHotspot={setSelected} vaporMode={vaporMode} />
        </Suspense>
      </Canvas>

      {selected && (
        <div
          className="tour-panel"
          style={{ '--accent': selected.color }}
          role="dialog"
          aria-label={selected.name}
        >
          <div className="ticket-head">
            <span>SITE PREVIEW</span>
            <button
              className="ticket-close"
              onClick={() => setSelected(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
          </div>
          <div className="ticket-main">
            <h2 className="ticket-name">{selected.name}</h2>
            <p className="ticket-desc">{selected.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
