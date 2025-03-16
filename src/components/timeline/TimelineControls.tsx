
import { Play, Pause, Key, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineControlsProps {
  playing: boolean;
  selectedAssetId: string | null;
  setPlaying: (playing: boolean) => void;
  handleAddKeyframe: () => void;
  handleAddCameraKeyframe: () => void;
  handleReset: () => void;
}

const TimelineControls = ({
  playing,
  selectedAssetId,
  setPlaying,
  handleAddKeyframe,
  handleAddCameraKeyframe,
  handleReset
}: TimelineControlsProps) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddKeyframe}
        disabled={!selectedAssetId}
        title="Record current asset position, rotation and scale"
      >
        <Key className="h-4 w-4 mr-1" />
        Record Position
      </Button>
      <Button
        variant={playing ? "default" : "outline"}
        size="sm"
        onClick={() => setPlaying(!playing)}
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={handleReset}
        title="Reset animation"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TimelineControls;
