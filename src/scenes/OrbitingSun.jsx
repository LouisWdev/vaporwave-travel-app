import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function OrbitingSun({
  orbitRadius = 6,
  orbitSpeed = 0.15,
  color = '#FFD93D',
  accentColor = '#FF6B35',
  position = [0, 2, -8]
}) {
  const sunRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const boost = document.body.classList.contains('vapor-mode') ? 3 : 1
    if (sunRef.current) {
      sunRef.current.position.x = Math.sin(t * orbitSpeed * boost) * orbitRadius
      sunRef.current.position.y = position[1] + Math.cos(t * orbitSpeed * boost * 0.5) * 0.5
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.01 * boost
    if (ring2Ref.current) ring2Ref.current.rotation.x += 0.008 * boost
  })

  return (
    <group ref={sunRef} position={position}>
      {/* Core sun */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshStandardMaterial color={accentColor} transparent opacity={0.15} emissive={accentColor} emissiveIntensity={1} />
      </mesh>
      {/* Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI/3, 0, 0]}>
        <torusGeometry args={[1.6, 0.04, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>
      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI/5, Math.PI/4, 0]}>
        <torusGeometry args={[2.0, 0.025, 8, 32]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}
