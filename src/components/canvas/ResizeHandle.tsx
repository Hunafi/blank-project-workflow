
import { memo } from 'react';

type HandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ResizeHandleProps {
  position: HandlePosition;
  onMouseDown: (e: React.MouseEvent, handle: HandlePosition) => void;
  isVisible: boolean;
  disabled: boolean;
}

const ResizeHandle = memo(({ position, onMouseDown, isVisible, disabled }: ResizeHandleProps) => {
  if (!isVisible || disabled) return null;
  
  return (
    <div 
      className="absolute w-5 h-5 bg-blue-500 rounded-full cursor-nwse-resize"
      style={{
        top: position.includes('top') ? -5 : 'auto',
        bottom: position.includes('bottom') ? -5 : 'auto',
        left: position.includes('left') ? -5 : 'auto',
        right: position.includes('right') ? -5 : 'auto',
        transform: `translate(${position.includes('right') ? '50%' : '-50%'}, ${position.includes('bottom') ? '50%' : '-50%'})`,
        zIndex: 100,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDown(e, position);
      }}
    />
  );
});

ResizeHandle.displayName = 'ResizeHandle';

export default ResizeHandle;
