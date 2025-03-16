
import { useState, useEffect, useCallback } from 'react';
import { useEditorStore } from "@/store/editorStore";
import { toast } from "sonner";
import { useCanvasPosition } from './useCanvasPosition';
import { useCanvasInteraction } from './useCanvasInteraction';
import { useCanvasDrag } from './useCanvasDrag';
import { useCanvasResize } from './useCanvasResize';

type HandlePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface CanvasControlsState {
  position: Position;
  size: Size;
  isDragging: boolean;
  activeHandle: HandlePosition | null;
  isVisible: boolean;
  isRearranging: boolean;
}

interface CanvasControlsActions {
  handleMouseDown: (e: React.MouseEvent, handle?: HandlePosition) => void;
  handleResize: (e: MouseEvent) => void;
  handleMove: (e: MouseEvent) => void;
  handleMouseUp: () => void;
  toggleCanvasVisibility: () => void;
  toggleRearrangingMode: () => void;
}

export const useCanvasControls = (): [CanvasControlsState, CanvasControlsActions] => {
  // Use our smaller hooks
  const [{ position, size }, setPosition, setSize] = useCanvasPosition();
  const [
    { isDragging, activeHandle, isVisible, isRearranging },
    { setIsDragging, setActiveHandle, toggleCanvasVisibility, toggleRearrangingMode }
  ] = useCanvasInteraction();
  
  // Get state from store
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);
  
  // Drag operations
  const { initialState: dragInitialState, handleMove } = useCanvasDrag(
    position,
    setPosition,
    isRearranging
  );
  
  // Resize operations
  const { initialState: resizeInitialState, handleResize } = useCanvasResize(
    setPosition,
    setSize,
    isRearranging,
    activeHandle
  );
  
  // Only show toast once when asset is selected
  useEffect(() => {
    if (selectedAssetId && isRearranging) {
      toast.info("Canvas locked while editing asset", {
        duration: 2000,
      });
    }
  }, [selectedAssetId, isRearranging]);

  const handleMouseDown = useCallback((e: React.MouseEvent, handle?: HandlePosition) => {
    // Don't allow canvas manipulation if we're working with an asset
    if (!isRearranging || selectedAssetId) return;
    
    e.stopPropagation();
    
    const initialPos = { x: position.x, y: position.y };
    const initialSz = { width: size.width, height: size.height };
    const initialPtr = { x: e.clientX, y: e.clientY };
    
    if (handle) {
      setActiveHandle(handle);
      resizeInitialState.current = {
        position: initialPos,
        size: initialSz,
        pointer: initialPtr
      };
    } else {
      setIsDragging(true);
      dragInitialState.current = {
        position: initialPos,
        size: initialSz,
        pointer: initialPtr
      };
    }
  }, [isRearranging, selectedAssetId, position, size, setActiveHandle, setIsDragging, dragInitialState, resizeInitialState]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setActiveHandle(null);
  }, [setIsDragging, setActiveHandle]);

  // Cleanup function for mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e);
      } else if (activeHandle) {
        handleResize(e);
      }
    };

    // Add mouse event listeners to window
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, activeHandle, handleMove, handleResize, handleMouseUp]);

  return [
    { position, size, isDragging, activeHandle, isVisible, isRearranging },
    { 
      handleMouseDown, 
      handleResize, 
      handleMove, 
      handleMouseUp, 
      toggleCanvasVisibility, 
      toggleRearrangingMode 
    }
  ];
};
