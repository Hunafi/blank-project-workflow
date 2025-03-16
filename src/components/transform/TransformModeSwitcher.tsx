
import { Button } from "@/components/ui/button";
import { Move, RotateCcw, Maximize } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";

interface TransformModeSwitcherProps {
  transformMode: 'translate' | 'rotate' | 'scale';
}

const TransformModeSwitcher = ({ transformMode }: TransformModeSwitcherProps) => {
  const setTransformMode = useEditorStore(state => state.setTransformMode);
  
  return (
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
  );
};

export default TransformModeSwitcher;
