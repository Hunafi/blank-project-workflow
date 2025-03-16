
import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editorStore";

interface CanvasOverlayProps {
  children: ReactNode;
}

type HandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

const CanvasOverlay = ({ children }: CanvasOverlayProps) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState<HandlePosition | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRearranging, setIsRearranging] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialPosition = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });
  const initialPointer = useRef({ x: 0, y: 0 });
  
  // Get the selectedAssetId to check if we're manipulating an asset
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);

  const handleMouseDown = (e: React.MouseEvent, handle?: HandlePosition) => {
    // Don't allow canvas manipulation if we're working with an asset
    if (!isRearranging || selectedAssetId) return;
    
    e.stopPropagation();
    
    if (handle) {
      setActiveHandle(handle);
    } else {
      setIsDragging(true);
    }
    
    initialPosition.current = { x: position.x, y: position.y };
    initialSize.current = { width: size.width, height: size.height };
    initialPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handleResize = (e: MouseEvent) => {
    if (!activeHandle || !isRearranging || selectedAssetId) return;

    const dx = e.clientX - initialPointer.current.x;
    const dy = e.clientY - initialPointer.current.y;

    switch (activeHandle) {
      case 'top-left':
        setPosition({
          x: initialPosition.current.x + dx,
          y: initialPosition.current.y + dy
        });
        setSize({
          width: Math.max(200, initialSize.current.width - dx),
          height: Math.max(200, initialSize.current.height - dy)
        });
        break;
      case 'top-right':
        setPosition({
          x: initialPosition.current.x,
          y: initialPosition.current.y + dy
        });
        setSize({
          width: Math.max(200, initialSize.current.width + dx),
          height: Math.max(200, initialSize.current.height - dy)
        });
        break;
      case 'bottom-left':
        setPosition({
          x: initialPosition.current.x + dx,
          y: initialPosition.current.y
        });
        setSize({
          width: Math.max(200, initialSize.current.width - dx),
          height: Math.max(200, initialSize.current.height + dy)
        });
        break;
      case 'bottom-right':
        setSize({
          width: Math.max(200, initialSize.current.width + dx),
          height: Math.max(200, initialSize.current.height + dy)
        });
        break;
    }
  };

  const handleMove = (e: MouseEvent) => {
    if (!isDragging || !isRearranging || selectedAssetId) return;
    
    const dx = e.clientX - initialPointer.current.x;
    const dy = e.clientY - initialPointer.current.y;
    
    setPosition({
      x: initialPosition.current.x + dx,
      y: initialPosition.current.y + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHandle(null);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e);
      } else if (activeHandle) {
        handleResize(e);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, activeHandle, isRearranging, selectedAssetId]);

  const toggleCanvasVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleRearrangingMode = () => {
    setIsRearranging(!isRearranging);
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
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
          >
            {isRearranging ? "Lock Canvas" : "Unlock Canvas"}
          </Button>
        )}
      </div>

      {isVisible && (
        <motion.div
          ref={containerRef}
          className={`absolute border-2 ${isRearranging ? 'border-blue-500' : 'border-green-500'} rounded-md bg-black/10 backdrop-blur-sm overflow-hidden ${selectedAssetId ? 'pointer-events-none' : 'pointer-events-auto'}`}
          style={{
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
          }}
          initial={false}
        >
          {/* Main draggable area */}
          <div 
            className={`absolute inset-0 ${isRearranging && !selectedAssetId ? 'cursor-move' : 'cursor-default'}`}
            onMouseDown={(e) => handleMouseDown(e)}
          >
            {children}
          </div>

          {/* Resize handles - only visible when rearranging and not manipulating an asset */}
          {isRearranging && !selectedAssetId && (
            <>
              <div 
                className="absolute top-0 left-0 w-5 h-5 bg-blue-500 rounded-full cursor-nwse-resize -translate-x-1/2 -translate-y-1/2"
                onMouseDown={(e) => handleMouseDown(e, 'top-left')}
              />
              <div 
                className="absolute top-0 right-0 w-5 h-5 bg-blue-500 rounded-full cursor-nesw-resize translate-x-1/2 -translate-y-1/2"
                onMouseDown={(e) => handleMouseDown(e, 'top-right')}
              />
              <div 
                className="absolute bottom-0 left-0 w-5 h-5 bg-blue-500 rounded-full cursor-nesw-resize -translate-x-1/2 translate-y-1/2"
                onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
              />
              <div 
                className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full cursor-nwse-resize translate-x-1/2 translate-y-1/2"
                onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
              />
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CanvasOverlay;
