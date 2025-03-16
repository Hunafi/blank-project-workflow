
import { memo } from 'react';

type HandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ResizeHandleProps {
  position: HandlePosition;
  onMouseDown: (e: React.MouseEvent, handle: HandlePosition) => void;
  isVisible: boolean;
  disabled: boolean;
}

const getHandleStyles = (position: HandlePosition) => {
  const styles: React.CSSProperties = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: 'rgba(59, 130, 246, 0.5)', // semi-transparent blue
    borderRadius: '50%',
    cursor: 'nwse-resize',
    zIndex: 100,
    transform: 'translate(-50%, -50%)',
    border: '2px solid #2563eb'
  };

  if (position.includes('top')) {
    styles.top = '-5px';
  } else {
    styles.bottom = '-5px'; 
  }

  if (position.includes('left')) {
    styles.left = '-5px';
  } else {
    styles.right = '-5px';
  }

  if (position === 'top-left' || position === 'bottom-right') {
    styles.cursor = 'nwse-resize';
  } else {
    styles.cursor = 'nesw-resize';
  }

  return styles;
};

const ResizeHandle = memo(({ position, onMouseDown, isVisible, disabled }: ResizeHandleProps) => {
  if (!isVisible || disabled) return null;
  
  const styles = getHandleStyles(position);
  
  return (
    <div 
      style={styles}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDown(e, position);
      }}
    />
  );
});

ResizeHandle.displayName = 'ResizeHandle';

export default ResizeHandle;
