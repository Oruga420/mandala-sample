import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Vertex Shader: Standard sphere projection
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader: Cyber Canada effect
const fragmentShader = `
uniform float uTime;
uniform float uScroll;
uniform vec3 uColorTop;
uniform vec3 uColorMid;
uniform vec3 uColorBot;

varying vec2 vUv;
varying vec3 vPosition;

// Noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // Colors
    vec3 colorTop = uColorTop; // White/Ice
    vec3 colorMid = uColorMid; // Neon Red
    vec3 colorBot = uColorBot; // Dark Urban

    // Vertical gradient
    float mix1 = smoothstep(0.0, 0.55, vUv.y);
    float mix2 = smoothstep(0.5, 1.0, vUv.y);
    
    vec3 baseColor = mix(colorBot, colorMid, mix1);
    baseColor = mix(baseColor, colorTop, mix2);

    // Dynamic wave stripes
    // Use scroll to shift the phase of the waves
    float waveOffset = sin(vUv.x * 10.0 + uTime * 0.5) * 0.02;
    float stripeY = vUv.y + waveOffset - (uScroll * 0.2); // Move stripes with scroll
    
    // Create the bands
    float stripes = sin(stripeY * 40.0);
    float stripeMask = step(0.1, stripes); // Sharp lines

    // Add some noise/grain to the color
    float grain = random(vUv * uTime) * 0.15;
    
    // Apply stripes (make black bands)
    vec3 finalColor = baseColor * stripeMask;
    
    // Add glow/fresnel edge
    // Fresnel glow - using a hot red/orange to simulate city lights
    float fresnel = pow(1.0 - abs(vPosition.z), 3.0);
    finalColor += fresnel * vec3(1.0, 0.2, 0.2) * 0.6;

    // Apply grain
    finalColor += vec3(grain);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const Sphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll(); // Access scroll data from ScrollControls

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorTop: { value: new THREE.Color('#ffffff') }, // Snow White
      uColorMid: { value: new THREE.Color('#ff0033') }, // Canada Red
      uColorBot: { value: new THREE.Color('#0a0a0a') }, // Asphalt Black
    }),
    []
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      
      // Update time
      material.uniforms.uTime.value += delta;
      
      // Update scroll uniform based on scroll offset (0 to 1)
      material.uniforms.uScroll.value = scroll.offset;

      // Rotate sphere slightly based on scroll
      meshRef.current.rotation.y = scroll.offset * Math.PI * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2.8, 2.8, 2.8]} position={[0, -0.5, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export default Sphere;