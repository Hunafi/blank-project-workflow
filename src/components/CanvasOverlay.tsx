
import { useRef, ReactNode, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCanvasControls } from "@/hooks/useCanvasControls";
import { useEditorStore } from "@/store/editorStore";
import ResizeHandle from './canvas/ResizeHandle';
import CanvasControls from './canvas/CanvasControls';

interface CanvasOverlayProps {
  children: ReactNode;
}

const CanvasOverlay = ({ children }: CanvasOverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  
  const [
    { position, size, isVisible, isRearranging },
    { handleMouseDown, toggleCanvasVisibility, toggleRearrangingMode }
  ] = useCanvasControls();

  // Prevent unnecessary renders
  const hasPointerEvents = isRearranging && !selectedAssetId;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <CanvasControls 
        isVisible={isVisible}
        isRearranging={isRearranging}
        toggleCanvasVisibility={toggleCanvasVisibility}
        toggleRearrangingMode={toggleRearrangingMode}
      />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={containerRef}
            className={`absolute border-2 ${isRearranging ? 'border-blue-500' : 'border-green-500'} rounded-md bg-black/10 backdrop-blur-sm overflow-hidden ${hasPointerEvents ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
              touchAction: 'none',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            layoutId="canvas-container"
          >
            {/* Main draggable area */}
            <div 
              className={`absolute inset-0 ${hasPointerEvents ? 'cursor-move' : 'cursor-default'}`}
              onMouseDown={(e) => handleMouseDown(e)}
            >
              {children}
            </div>

            {/* Resize handles */}
            <ResizeHandle 
              position="top-left" 
              onMouseDown={handleMouseDown} 
              isVisible={isRearranging} 
              disabled={!!selectedAssetId} 
            />
            <ResizeHandle 
              position="top-right" 
              onMouseDown={handleMouseDown} 
              isVisible={isRearranging} 
              disabled={!!selectedAssetId} 
            />
            <ResizeHandle 
              position="bottom-left" 
              onMouseDown={handleMouseDown} 
              isVisible={isRearranging} 
              disabled={!!selectedAssetId} 
            />
            <ResizeHandle 
              position="bottom-right" 
              onMouseDown={handleMouseDown} 
              isVisible={isRearranging} 
              disabled={!!selectedAssetId} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(CanvasOverlay);
