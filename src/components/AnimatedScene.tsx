
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

const AnimatedScene = ({ savedScene, autoPlay = false }: AnimatedSceneProps) => {
  const [animationTime, setAnimationTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5000); // Default 5s duration
  
  // Initialize the scene if we have saved data
  useEffect(() => {
    if (savedScene) {
      console.log("Initializing animated scene with data:", savedScene);
      
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
  
  if (!savedScene) {
    console.log("No scene data provided to AnimatedScene");
    return null; // Don't render anything if no scene data
  }
  
  return (
    <div className="h-full w-full pointer-events-none">
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
        
        <Suspense fallback={null}>
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
    </div>
  );
};

export default AnimatedScene;
