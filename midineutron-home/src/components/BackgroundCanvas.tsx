// src/components/BackgroundCanvas.tsx

import React, { useState, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
import { motion, MotionCanvas, LayoutCamera } from "framer-motion/three";
import { Suspense } from 'react';
import * as THREE from 'three';
import { Html, useGLTF, useProgress } from '@react-three/drei';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

function TvModel() {
  const { scene } = useGLTF('/assets/model/tv.glb');
  return (
    <primitive
      object={scene}
      position={[0, 0, 0]}
      scale={0.25}
      rotation={[0, Math.PI, 0]}
      castShadow
      receiveShadow
    />
  );
}

const BackgroundCanvas: React.FC = () => {
  const { width } = useWindowSize();

  return (
    <MotionCanvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: width,
        height: '100%',
        zIndex: -1,
      }}
      shadows // Enable shadow rendering
    >
      <LayoutCamera
        initial={false}
        animate={{ x: 15, y: 0.25, z: 0, fov: 10 }}
      />
      <Suspense fallback={<Loader />}>
        {/* Ambient Light for general illumination */}
        <ambientLight intensity={2} />

        {/* Spotlight shining on the TV model */}
        <spotLight
          position={[5, 10, 5]} // Position the spotlight above and to the side
          angle={0.3} // Narrow beam
          penumbra={1} // Soft edge
          intensity={2} // Brightness
          castShadow // Enable shadows from this light
          shadow-mapSize-width={1024} // Shadow map resolution
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001} // Prevent shadow acne
        />

        {/* TV Model */}
        <TvModel />

        {/* Optional: Ground Plane to receive shadows */}
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh> */}
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload('/assets/model/tv.glb'); // Preload the TV model
export default BackgroundCanvas;