
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEditorStore } from "@/store/editorStore";
import * as THREE from "three";
import Model from "./three/Model";
import KeyframeAnimator from "./three/KeyframeAnimator";
import SceneBackground from "./three/SceneBackground";

const Scene3D = () => {
  const assets = useEditorStore(state => state.assets);
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  const transformMode = useEditorStore(state => state.transformMode);
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  
  useEffect(() => {
    setOrbitEnabled(!selectedAssetId);
  }, [selectedAssetId]);
  
  const handleBackgroundClick = (e: THREE.Intersection) => {
    if (e.object.userData.background) {
      useEditorStore.getState().selectAsset(null);
    }
  };
  
  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <KeyframeAnimator />
        
        <OrbitControls 
          enabled={orbitEnabled} 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
        />
        
        <SceneBackground onClick={handleBackgroundClick} />
        
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
      </Canvas>
    </div>
  );
};

export default Scene3D;
