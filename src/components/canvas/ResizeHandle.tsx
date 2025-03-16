
import { ReactNode } from 'react';

type HandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ResizeHandleProps {
  position: HandlePosition;
  onMouseDown: (e: React.MouseEvent, handle: HandlePosition) => void;
  isVisible: boolean;
  disabled: boolean;
}

const ResizeHandle = ({ position, onMouseDown, isVisible, disabled }: ResizeHandleProps) => {
  if (!isVisible || disabled) return null;
  
  return (
    <div 
      className="absolute w-5 h-5 bg-blue-500 rounded-full cursor-nwse-resize"
      style={{
        top: position.includes('top') ? 0 : 'auto',
        bottom: position.includes('bottom') ? 0 : 'auto',
        left: position.includes('left') ? 0 : 'auto',
        right: position.includes('right') ? 0 : 'auto',
        transform: `translate(${position.includes('right') ? '50%' : '-50%'}, ${position.includes('bottom') ? '50%' : '-50%'})`,
      }}
      onMouseDown={(e) => onMouseDown(e, position)}
    />
  );
};

export default ResizeHandle;
