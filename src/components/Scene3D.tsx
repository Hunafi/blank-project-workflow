
import { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, TransformControls as DreiTransformControls, useGLTF } from "@react-three/drei";
import { useEditorStore } from "@/store/editorStore";
import * as THREE from "three";
import { toast } from "sonner";

// Component to load and display a GLB model
const Model = ({ 
  url, 
  position, 
  rotation, 
  scale, 
  selected, 
  transformMode,
  canvasLocked,
  assetId
}: { 
  url: string; 
  position: { x: number; y: number; z: number }; 
  rotation: { x: number; y: number; z: number }; 
  scale: { x: number; y: number; z: number }; 
  selected: boolean; 
  transformMode: 'translate' | 'rotate' | 'scale';
  canvasLocked: boolean;
  assetId: string;
}) => {
  const { scene } = useGLTF(url);
  const clone = useRef<THREE.Group>(scene.clone());
  const transformRef = useRef<THREE.Mesh>(null);
  const updateAsset = useEditorStore(state => state.updateAsset);
  
  // Handle transformation changes
  useEffect(() => {
    if (!transformRef.current) return;
    
    transformRef.current.position.set(position.x, position.y, position.z);
    transformRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    transformRef.current.scale.set(scale.x, scale.y, scale.z);
  }, [position, rotation, scale]);
  
  const onTransformChange = () => {
    if (!transformRef.current || !selected) return;
    
    const pos = transformRef.current.position;
    const rot = transformRef.current.rotation;
    const scl = transformRef.current.scale;
    
    updateAsset(assetId, {
      position: { x: pos.x, y: pos.y, z: pos.z },
      rotation: { x: rot.x, y: rot.y, z: rot.z },
      scale: { x: scl.x, y: scl.y, z: scl.z }
    });
  };

  // Only display transform controls when the asset is selected
  // and disable OrbitControls when transforming
  const { camera } = useThree();
  const controlsRef = useRef<any>();

  useEffect(() => {
    if (selected && controlsRef.current) {
      // Disable orbit controls when transforming an asset
      controlsRef.current.enabled = false;
    }
    return () => {
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    };
  }, [selected]);

  return (
    <>
      <mesh
        ref={transformRef}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={[scale.x, scale.y, scale.z]}
        onClick={(e) => {
          if (selected) return;
          e.stopPropagation();
          useEditorStore.getState().selectAsset(assetId);
          toast.success(`Selected: ${url.split('/').pop()}`, {
            duration: 2000,
          });
        }}
      >
        <primitive object={clone.current} />
      </mesh>
      
      {selected && (
        <DreiTransformControls
          object={transformRef}
          mode={transformMode}
          onObjectChange={onTransformChange}
          space="local"
        />
      )}
    </>
  );
};

// Component for keyframe animation
const KeyframeAnimator = () => {
  const assets = useEditorStore(state => state.assets);
  const currentTime = useEditorStore(state => state.currentTime);
  const cameraKeyframes = useEditorStore(state => state.cameraKeyframes);
  const { camera } = useThree();
  
  // Animate camera based on keyframes
  useEffect(() => {
    if (cameraKeyframes.length < 2) return;
    
    // Find the keyframes that surround the current time
    let prevKeyframe = cameraKeyframes[0];
    let nextKeyframe = cameraKeyframes[0];
    
    for (let i = 0; i < cameraKeyframes.length; i++) {
      if (cameraKeyframes[i].time <= currentTime) {
        prevKeyframe = cameraKeyframes[i];
      }
      if (cameraKeyframes[i].time >= currentTime && (i === 0 || cameraKeyframes[i-1].time <= currentTime)) {
        nextKeyframe = cameraKeyframes[i];
        break;
      }
    }
    
    if (prevKeyframe === nextKeyframe) return;
    
    // Calculate interpolation factor
    const t = (currentTime - prevKeyframe.time) / (nextKeyframe.time - prevKeyframe.time);
    
    // Interpolate camera position
    camera.position.x = THREE.MathUtils.lerp(prevKeyframe.position.x, nextKeyframe.position.x, t);
    camera.position.y = THREE.MathUtils.lerp(prevKeyframe.position.y, nextKeyframe.position.y, t);
    camera.position.z = THREE.MathUtils.lerp(prevKeyframe.position.z, nextKeyframe.position.z, t);
    
    // Interpolate camera rotation
    camera.rotation.x = THREE.MathUtils.lerp(prevKeyframe.rotation.x, nextKeyframe.rotation.x, t);
    camera.rotation.y = THREE.MathUtils.lerp(prevKeyframe.rotation.y, nextKeyframe.rotation.y, t);
    camera.rotation.z = THREE.MathUtils.lerp(prevKeyframe.rotation.z, nextKeyframe.rotation.z, t);
    
  }, [currentTime, cameraKeyframes, camera]);
  
  // Animate assets based on keyframes
  useFrame(() => {
    assets.forEach(asset => {
      if (asset.keyframes.length < 2) return;
      
      // Find the keyframes that surround the current time
      let prevKeyframe = asset.keyframes[0];
      let nextKeyframe = asset.keyframes[0];
      let foundKeyframes = false;
      
      for (let i = 0; i < asset.keyframes.length; i++) {
        if (asset.keyframes[i].time <= currentTime) {
          prevKeyframe = asset.keyframes[i];
        }
        if (asset.keyframes[i].time >= currentTime && (i === 0 || asset.keyframes[i-1].time <= currentTime)) {
          nextKeyframe = asset.keyframes[i];
          if (prevKeyframe !== nextKeyframe) {
            foundKeyframes = true;
          }
          break;
        }
      }
      
      if (!foundKeyframes) return;
      
      // Calculate interpolation factor
      const t = (currentTime - prevKeyframe.time) / (nextKeyframe.time - prevKeyframe.time);
      
      // Interpolate position, rotation, and scale
      const interpolatedPosition = {
        x: THREE.MathUtils.lerp(prevKeyframe.position.x, nextKeyframe.position.x, t),
        y: THREE.MathUtils.lerp(prevKeyframe.position.y, nextKeyframe.position.y, t),
        z: THREE.MathUtils.lerp(prevKeyframe.position.z, nextKeyframe.position.z, t)
      };
      
      const interpolatedRotation = {
        x: THREE.MathUtils.lerp(prevKeyframe.rotation.x, nextKeyframe.rotation.x, t),
        y: THREE.MathUtils.lerp(prevKeyframe.rotation.y, nextKeyframe.rotation.y, t),
        z: THREE.MathUtils.lerp(prevKeyframe.rotation.z, nextKeyframe.rotation.z, t)
      };
      
      const interpolatedScale = {
        x: THREE.MathUtils.lerp(prevKeyframe.scale.x, nextKeyframe.scale.x, t),
        y: THREE.MathUtils.lerp(prevKeyframe.scale.y, nextKeyframe.scale.y, t),
        z: THREE.MathUtils.lerp(prevKeyframe.scale.z, nextKeyframe.scale.z, t)
      };
      
      // Update the asset in the store
      useEditorStore.getState().updateAsset(asset.id, {
        position: interpolatedPosition,
        rotation: interpolatedRotation,
        scale: interpolatedScale
      });
    });
  });
  
  return null;
};

const Scene3D = () => {
  const assets = useEditorStore(state => state.assets);
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  const transformMode = useEditorStore(state => state.transformMode);
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  
  // Disable orbit controls when manipulating assets
  useEffect(() => {
    setOrbitEnabled(!selectedAssetId);
  }, [selectedAssetId]);
  
  // Handle clicking on the background to deselect
  const handleBackgroundClick = (e: THREE.Event) => {
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
        
        {/* Invisible background plane for deselecting objects */}
        <mesh 
          position={[0, 0, -10]} 
          rotation={[0, 0, 0]} 
          scale={[100, 100, 1]}
          onClick={(e) => {
            e.stopPropagation();
            useEditorStore.getState().selectAsset(null);
          }}
          userData={{ background: true }}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        
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
