
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  time: number;
  duration: number;
  color: string;
  onRemove: () => void;
}

const TimelineItem = ({ time, duration, color, onRemove }: TimelineItemProps) => {
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

export default TimelineItem;
