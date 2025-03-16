
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/store/editorStore";

interface ScaleControlProps {
  scale: { x: number; y: number; z: number };
  assetId: string | null;
}

const ScaleControl = ({ scale, assetId }: ScaleControlProps) => {
  const updateAsset = useEditorStore(state => state.updateAsset);
  
  // Handle scale changes
  const handleScaleChange = (axis: 'x' | 'y' | 'z', value: number) => {
    if (!assetId) return;
    
    const newScale = { ...scale, [axis]: value };
    updateAsset(assetId, { scale: newScale });
  };
  
  return (
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
  );
};

export default ScaleControl;
