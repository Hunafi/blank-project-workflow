
import { Move, RotateCcw, Maximize } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

const TransformControls = () => {
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  const assets = useEditorStore(state => state.assets);
  const updateAsset = useEditorStore(state => state.updateAsset);
  const transformMode = useEditorStore(state => state.transformMode);
  const setTransformMode = useEditorStore(state => state.setTransformMode);
  
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
  }, [selectedAsset]);
  
  // Handle position changes
  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!selectedAssetId) return;
    
    const newPosition = { ...position, [axis]: value };
    setPosition(newPosition);
    updateAsset(selectedAssetId, { position: newPosition });
  };
  
  // Handle rotation changes
  const handleRotationChange = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!selectedAssetId) return;
    
    const newRotation = { ...rotation, [axis]: value };
    setRotation(newRotation);
    updateAsset(selectedAssetId, { rotation: newRotation });
  };
  
  // Handle scale changes
  const handleScaleChange = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!selectedAssetId) return;
    
    const newScale = { ...scale, [axis]: value };
    setScale(newScale);
    updateAsset(selectedAssetId, { scale: newScale });
  };
  
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
        <div className="flex space-x-1">
          <Button
            variant={transformMode === 'translate' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTransformMode('translate')}
          >
            <Move className="h-4 w-4 mr-1" />
            Move
          </Button>
          <Button
            variant={transformMode === 'rotate' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTransformMode('rotate')}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Rotate
          </Button>
          <Button
            variant={transformMode === 'scale' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTransformMode('scale')}
          >
            <Maximize className="h-4 w-4 mr-1" />
            Scale
          </Button>
        </div>
      </div>
      <div className="p-3 space-y-4 overflow-auto flex-1">
        <div>
          <h4 className="text-sm font-medium mb-2">Position</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="position-x" className="text-xs">X</Label>
              <Input
                id="position-x"
                type="number"
                value={position.x}
                onChange={(e) => handlePositionChange('x', parseFloat(e.target.value) || 0)}
                step={0.1}
              />
            </div>
            <div>
              <Label htmlFor="position-y" className="text-xs">Y</Label>
              <Input
                id="position-y"
                type="number"
                value={position.y}
                onChange={(e) => handlePositionChange('y', parseFloat(e.target.value) || 0)}
                step={0.1}
              />
            </div>
            <div>
              <Label htmlFor="position-z" className="text-xs">Z</Label>
              <Input
                id="position-z"
                type="number"
                value={position.z}
                onChange={(e) => handlePositionChange('z', parseFloat(e.target.value) || 0)}
                step={0.1}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Rotation</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="rotation-x" className="text-xs">X</Label>
              <Input
                id="rotation-x"
                type="number"
                value={rotation.x}
                onChange={(e) => handleRotationChange('x', parseFloat(e.target.value) || 0)}
                step={0.1}
              />
            </div>
            <div>
              <Label htmlFor="rotation-y" className="text-xs">Y</Label>
              <Input
                id="rotation-y"
                type="number"
                value={rotation.y}
                onChange={(e) => handleRotationChange('y', parseFloat(e.target.value) || 0)}
                step={0.1}
              />
            </div>
            <div>
              <Label htmlFor="rotation-z" className="text-xs">Z</Label>
              <Input
                id="rotation-z"
                type="number"
                value={rotation.z}
                onChange={(e) => handleRotationChange('z', parseFloat(e.target.value) || 0)}
                step={0.1}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Scale</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="scale-x" className="text-xs">X</Label>
              <Input
                id="scale-x"
                type="number"
                value={scale.x}
                onChange={(e) => handleScaleChange('x', parseFloat(e.target.value) || 1)}
                step={0.1}
                min={0.1}
              />
            </div>
            <div>
              <Label htmlFor="scale-y" className="text-xs">Y</Label>
              <Input
                id="scale-y"
                type="number"
                value={scale.y}
                onChange={(e) => handleScaleChange('y', parseFloat(e.target.value) || 1)}
                step={0.1}
                min={0.1}
              />
            </div>
            <div>
              <Label htmlFor="scale-z" className="text-xs">Z</Label>
              <Input
                id="scale-z"
                type="number"
                value={scale.z}
                onChange={(e) => handleScaleChange('z', parseFloat(e.target.value) || 1)}
                step={0.1}
                min={0.1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformControls;
