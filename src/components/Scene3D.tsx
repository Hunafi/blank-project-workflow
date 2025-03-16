
import { useState, useEffect, useCallback, Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEditorStore } from "@/store/editorStore";
import * as THREE from "three";
import Model from "./three/Model";
import KeyframeAnimator from "./three/KeyframeAnimator";
import SceneBackground from "./three/SceneBackground";

// Custom error boundary for Three.js components
class ThreeJSErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Three.js Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 p-4 bg-red-100 rounded-md">
          An error occurred in the 3D renderer. Try refreshing the page.
        </div>
      );
    }

    return this.props.children;
  }
}

const Scene3D = () => {
  const assets = useEditorStore(state => state.assets);
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  const transformMode = useEditorStore(state => state.transformMode);
  const setCamera = useEditorStore(state => state.setCamera);
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  
  useEffect(() => {
    setOrbitEnabled(!selectedAssetId);
  }, [selectedAssetId]);
  
  const handleBackgroundClick = useCallback((e: THREE.Intersection) => {
    if (e.object.userData?.background) {
      useEditorStore.getState().selectAsset(null);
    }
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <ThreeJSErrorBoundary>
        <Canvas 
          camera={{ position: [0, 2, 5], fov: 50 }}
          onCreated={({ camera }) => setCamera(camera)}
          frameloop="demand" // Only render when needed
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
            preserveDrawingBuffer: true
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <KeyframeAnimator />
          
          <OrbitControls 
            enabled={orbitEnabled} 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            makeDefault
          />
          
          <SceneBackground onClick={handleBackgroundClick} />
          
          <Suspense fallback={null}>
            {assets.filter(asset => asset.visible).map(asset => (
              <Model
                key={asset.id}
                url={asset.url}
                position={asset.position}
                rotation={asset.rotation}
                scale={asset.scale}
                selected={asset.id === selectedAssetId}
                transformMode={transformMode}
                canvasLocked={asset.canvasLocked}
                assetId={asset.id}
              />
            ))}
          </Suspense>
        </Canvas>
      </ThreeJSErrorBoundary>
    </div>
  );
};

export default Scene3D;
