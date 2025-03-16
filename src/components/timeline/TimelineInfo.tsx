
interface TimelineInfoProps {
  currentTime: number;
  duration: number;
  setDuration: (duration: number) => void;
}

const TimelineInfo = ({ currentTime, duration, setDuration }: TimelineInfoProps) => {
  return (
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
  );
};

export default TimelineInfo;
