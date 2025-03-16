
import { useRef, useState, useEffect } from "react";
import { useEditorStore } from "@/store/editorStore";
import { Play, Pause, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TimelineItem = ({ 
  time, 
  duration, 
  color, 
  onRemove 
}: { 
  time: number; 
  duration: number; 
  color: string;
  onRemove: () => void;
}) => {
  const timelineWidth = (time / duration) * 100;
  
  return (
    <div 
      className="absolute h-4 cursor-pointer" 
      style={{ left: `${timelineWidth}%` }}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
    >
      <div className={cn("w-2 h-4 rounded", color)} />
    </div>
  );
};

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(5000); // 5 seconds default duration
  const [isDragging, setIsDragging] = useState(false);
  
  const assets = useEditorStore(state => state.assets);
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  const currentTime = useEditorStore(state => state.currentTime);
  const playing = useEditorStore(state => state.playing);
  const setCurrentTime = useEditorStore(state => state.setCurrentTime);
  const setPlaying = useEditorStore(state => state.setPlaying);
  const addKeyframe = useEditorStore(state => state.addKeyframe);
  const removeKeyframe = useEditorStore(state => state.removeKeyframe);
  const cameraKeyframes = useEditorStore(state => state.cameraKeyframes);
  const addCameraKeyframe = useEditorStore(state => state.addCameraKeyframe);
  const removeCameraKeyframe = useEditorStore(state => state.removeCameraKeyframe);
  
  const selectedAsset = assets.find(asset => asset.id === selectedAssetId);
  
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / rect.width) * duration;
    
    setCurrentTime(clickedTime);
  };
  
  const handleAddKeyframe = () => {
    if (!selectedAssetId || !selectedAsset) return;
    
    const { position, rotation, scale } = selectedAsset;
    
    addKeyframe(selectedAssetId, {
      time: currentTime,
      position,
      rotation,
      scale
    });
  };
  
  const handleAddCameraKeyframe = () => {
    // Find the current camera position/rotation from the scene
    // For simplicity, we'll use default values
    addCameraKeyframe({
      time: currentTime,
      position: { x: 0, y: 2, z: 5 },
      rotation: { x: -0.1, y: 0, z: 0 }
    });
  };
  
  useEffect(() => {
    if (!playing) return;
    
    const interval = setInterval(() => {
      setCurrentTime((time) => {
        if (time >= duration) {
          setPlaying(false);
          return 0;
        }
        return time + 16.67; // Roughly 60fps
      });
    }, 16.67);
    
    return () => clearInterval(interval);
  }, [playing, duration, setCurrentTime, setPlaying]);
  
  const timePercentage = (currentTime / duration) * 100;
  
  return (
    <div className="h-full border rounded-md flex flex-col">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-semibold">Timeline</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddKeyframe}
            disabled={!selectedAssetId}
          >
            <Key className="h-4 w-4 mr-1" />
            Add Asset Keyframe
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddCameraKeyframe}
          >
            <Key className="h-4 w-4 mr-1" />
            Add Camera Keyframe
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
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>0s</span>
          <span>{(duration / 1000).toFixed(1)}s</span>
        </div>
        
        <div 
          ref={timelineRef}
          className="h-12 border rounded relative cursor-pointer"
          onClick={handleTimelineClick}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (isDragging && timelineRef.current) {
              const rect = timelineRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const time = (x / rect.width) * duration;
              setCurrentTime(Math.max(0, Math.min(duration, time)));
            }
          }}
        >
          {/* Timeline playhead */}
          <div 
            className="absolute top-0 h-full w-0.5 bg-primary z-10" 
            style={{ left: `${timePercentage}%` }}
          />
          
          {/* Asset keyframes */}
          {selectedAsset?.keyframes.map((keyframe, index) => (
            <TimelineItem
              key={`asset-${selectedAsset.id}-keyframe-${index}`}
              time={keyframe.time}
              duration={duration}
              color="bg-blue-500"
              onRemove={() => removeKeyframe(selectedAsset.id, keyframe.time)}
            />
          ))}
          
          {/* Camera keyframes */}
          {cameraKeyframes.map((keyframe, index) => (
            <TimelineItem
              key={`camera-keyframe-${index}`}
              time={keyframe.time}
              duration={duration}
              color="bg-green-500"
              onRemove={() => removeCameraKeyframe(keyframe.time)}
            />
          ))}
        </div>
        
        <div className="mt-4">
          <div className="flex space-x-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Current Time</label>
              <div className="text-sm font-medium">{(currentTime / 1000).toFixed(2)}s</div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Duration</label>
              <select 
                value={duration} 
                onChange={(e) => setDuration(Number(e.target.value))}
                className="text-sm bg-background border rounded px-2 py-1"
              >
                <option value={3000}>3 seconds</option>
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
                <option value={30000}>30 seconds</option>
                <option value={60000}>60 seconds</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
