
import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEditorStore } from "@/store/editorStore";
import AnimatedModel from "./three/AnimatedModel";
import AnimatedCamera from "./three/AnimatedCamera";
import SceneBackground from "./three/SceneBackground";
import * as THREE from "three";

interface AnimatedSceneProps {
  savedScene: any;
  autoPlay?: boolean;
}

// Simple error boundary component
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Error in 3D scene:", event.error);
      setHasError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-green-700 bg-opacity-30">
        <div className="text-white p-4 rounded-md">
          Failed to render 3D scene. Please check your animation data.
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const AnimatedScene = ({ savedScene, autoPlay = false }: AnimatedSceneProps) => {
  const [animationTime, setAnimationTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5000); // Default 5s duration
  const [hasValidData, setHasValidData] = useState(false);
  
  // Initialize the scene if we have saved data
  useEffect(() => {
    if (savedScene) {
      console.log("Initializing animated scene with data:", savedScene);
      
      // Validate scene data structure
      if (!savedScene.assets || !Array.isArray(savedScene.assets)) {
        console.error("Invalid scene data: missing or invalid assets array");
        return;
      }
      
      setHasValidData(true);
      
      // Initialize the animation
      if (autoPlay) {
        setIsPlaying(true);
      }
      
      // Find the highest timestamp in keyframes to determine duration
      let maxTime = 5000; // Default 5 seconds
      
      // Check asset keyframes
      if (savedScene.assets) {
        savedScene.assets.forEach(asset => {
          if (asset.keyframes && asset.keyframes.length > 0) {
            const assetMaxTime = Math.max(...asset.keyframes.map(kf => kf.time));
            maxTime = Math.max(maxTime, assetMaxTime);
          }
        });
      }
      
      // Check camera keyframes
      if (savedScene.cameraKeyframes && savedScene.cameraKeyframes.length > 0) {
        const cameraMaxTime = Math.max(...savedScene.cameraKeyframes.map(kf => kf.time));
        maxTime = Math.max(maxTime, cameraMaxTime);
      }
      
      // Add a small buffer
      setDuration(maxTime + 500);
    } else {
      console.log("No scene data provided to AnimatedScene");
    }
  }, [savedScene, autoPlay]);
  
  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setAnimationTime(prevTime => {
        const newTime = prevTime + 16.67; // ~60fps
        
        if (newTime >= duration) {
          // Loop the animation
          return 0;
        }
        
        return newTime;
      });
    }, 16.67);
    
    return () => clearInterval(interval);
  }, [isPlaying, duration]);
  
  if (!savedScene || !hasValidData) {
    console.log("No valid scene data provided to AnimatedScene");
    return (
      <div className="h-full w-full flex items-center justify-center bg-green-700 bg-opacity-30">
        <div className="text-white text-opacity-70">
          No animation data available
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full pointer-events-none">
      <ErrorBoundary>
        <Canvas 
          camera={{ position: [0, 2, 5], fov: 50 }}
          frameloop="demand" // Only render when needed
          gl={{ 
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <Suspense fallback={
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="green" />
            </mesh>
          }>
            {/* Camera animation */}
            {savedScene.cameraKeyframes && savedScene.cameraKeyframes.length > 0 && (
              <AnimatedCamera 
                keyframes={savedScene.cameraKeyframes} 
                currentTime={animationTime}
              />
            )}
            
            {/* Assets */}
            {savedScene.assets && savedScene.assets.map(asset => (
              <AnimatedModel
                key={asset.id}
                url={asset.url}
                keyframes={asset.keyframes || []}
                currentTime={animationTime}
              />
            ))}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default AnimatedScene;
