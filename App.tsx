import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Preload } from '@react-three/drei';
import Sphere from './components/Sphere';
import { Header, HeroText, EventSection, Footer } from './components/UI';

// Background particles or simple stars
const Stars = () => {
    // A simple starfield implementation could go here, 
    // but for the sake of the requested aesthetic (clean dark gradient), 
    // we'll stick to a simple fog in the Scene.
    return null;
}

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffaa00" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00ffaa" />
      <Sphere />
      <Stars />
    </>
  );
};

function App() {
  return (
    <>
      <Header />
      
      {/* 
        Canvas takes the full screen. 
        ScrollControls creates a virtual scroll container.
        Pages determines how "tall" the scroll area is (1 page = 100vh).
      */}
      <div className="w-full h-screen relative bg-[#050505]">
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }} gl={{ antialias: true, alpha: true }}>
          <color attach="background" args={['#050505']} />
          {/* Fog for depth fading */}
          <fog attach="fog" args={['#050505', 5, 12]} />
          
          <Suspense fallback={null}>
            <ScrollControls pages={3.5} damping={0.3}>
              
              {/* Layer 1: The 3D Scene that stays or moves based on logic in components */}
              <Scene />

              {/* Layer 2: The HTML Content that scrolls */}
              <Scroll html style={{ width: '100%' }}>
                <HeroText />
                <EventSection />
                <Footer />
              </Scroll>
            </ScrollControls>
            
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default App;
