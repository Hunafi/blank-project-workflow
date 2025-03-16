
import { useEditorStore } from "@/store/editorStore";
import { useState, useEffect } from "react";
import TransformModeSwitcher from "./transform/TransformModeSwitcher";
import PositionControl from "./transform/PositionControl";
import RotationControl from "./transform/RotationControl";
import ScaleControl from "./transform/ScaleControl";
import CanvasLockToggle from "./transform/CanvasLockToggle";

const TransformControls = () => {
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  const assets = useEditorStore(state => state.assets);
  const transformMode = useEditorStore(state => state.transformMode);
  
  const selectedAsset = assets.find(asset => asset.id === selectedAssetId);
  
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1, z: 1 });
  
  // Update local state when selected asset changes
  useEffect(() => {
    if (selectedAsset) {
      setPosition(selectedAsset.position);
      setRotation(selectedAsset.rotation);
      setScale(selectedAsset.scale);
    }
  }, [selectedAsset, selectedAsset?.position, selectedAsset?.rotation, selectedAsset?.scale]);
  
  if (!selectedAsset) {
    return (
      <div className="border rounded-md p-4 h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">
          Select an asset to edit its properties
        </p>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md h-full flex flex-col">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-semibold">Transform</h3>
        <TransformModeSwitcher transformMode={transformMode} />
      </div>
      <div className="p-3 space-y-4 overflow-auto flex-1">
        <CanvasLockToggle 
          assetId={selectedAssetId} 
          canvasLocked={selectedAsset.canvasLocked} 
        />
        
        <PositionControl position={position} assetId={selectedAssetId} />
        <RotationControl rotation={rotation} assetId={selectedAssetId} />
        <ScaleControl scale={scale} assetId={selectedAssetId} />
      </div>
    </div>
  );
};

export default TransformControls;
