import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Classic outrun sun: vertical gradient with horizontal slits that widen
// toward the horizon and slowly scroll downward. Colors pushed past 1.0 so
// the bloom pass picks them up.
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uTop;
  uniform vec3 uBottom;
  varying vec2 vUv;

  void main() {
    float y = vUv.y;
    vec3 col = mix(uBottom, uTop, smoothstep(0.02, 0.9, y));

    float zone = 1.0 - smoothstep(0.04, 0.55, y);
    float band = fract(y * 18.0 - uTime * 0.3);
    float mask = step(0.62 * zone, band);

    gl_FragColor = vec4(col * 1.7, mask);
  }
`

export default function RetroSun({
  position = [0, 1.5, -14],
  radius = 4,
  top = '#FFD16E',
  bottom = '#FF3D9A',
}) {
  const materialRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTop: { value: new THREE.Color(top) },
      uBottom: { value: new THREE.Color(bottom) },
    }),
    [top, bottom]
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh position={position}>
      <circleGeometry args={[radius, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
