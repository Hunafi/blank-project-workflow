
import { useRef, useState } from "react";
import TimelineItem from "./TimelineItem";
import { Asset, CameraKeyframe } from "@/store/editorStore";

interface TimelineScrubberProps {
  duration: number;
  currentTime: number;
  selectedAsset: Asset | undefined;
  cameraKeyframes: CameraKeyframe[];
  setCurrentTime: (time: number) => void;
  removeKeyframe: (assetId: string, time: number) => void;
  removeCameraKeyframe: (time: number) => void;
}

const TimelineScrubber = ({
  duration,
  currentTime,
  selectedAsset,
  cameraKeyframes,
  setCurrentTime,
  removeKeyframe,
  removeCameraKeyframe
}: TimelineScrubberProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / rect.width) * duration;
    
    setCurrentTime(clickedTime);
  };
  
  const timePercentage = (currentTime / duration) * 100;
  
  return (
    <>
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
    </>
  );
};

export default TimelineScrubber;
