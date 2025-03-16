
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";

interface CanvasControlsProps {
  isVisible: boolean;
  isRearranging: boolean;
  toggleCanvasVisibility: () => void;
  toggleRearrangingMode: () => void;
}

const CanvasControls = ({ 
  isVisible, 
  isRearranging, 
  toggleCanvasVisibility, 
  toggleRearrangingMode 
}: CanvasControlsProps) => {
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);

  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2 pointer-events-auto">
      <Button 
        onClick={toggleCanvasVisibility} 
        variant={isVisible ? "default" : "outline"}
        size="sm"
      >
        {isVisible ? "Hide Canvas" : "Show Canvas"}
      </Button>
      {isVisible && (
        <Button 
          onClick={toggleRearrangingMode}
          variant={isRearranging ? "default" : "outline"}
          size="sm"
          disabled={!!selectedAssetId}
        >
          {isRearranging ? "Lock Canvas" : "Unlock Canvas"}
        </Button>
      )}
    </div>
  );
};

export default CanvasControls;
