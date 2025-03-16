
import { useCallback, useRef } from 'react';
import { useEditorStore } from "@/store/editorStore";
import { throttle } from '@/utils/throttle';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export interface InitialState {
  position: Position;
  size: Size;
  pointer: Position;
}

export const useCanvasDrag = (
  position: Position,
  setPosition: React.Dispatch<React.SetStateAction<Position>>,
  isRearranging: boolean
) => {
  const initialState = useRef<InitialState>({
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
    pointer: { x: 0, y: 0 }
  });
  
  // Get state from store
  const selectedAssetId = useEditorStore(state => state.selectedAssetId);

  const handleMove = useCallback(throttle((e: MouseEvent) => {
    if (!isRearranging || selectedAssetId) return;
    
    const dx = e.clientX - initialState.current.pointer.x;
    const dy = e.clientY - initialState.current.pointer.y;
    
    setPosition({
      x: initialState.current.position.x + dx,
      y: initialState.current.position.y + dy
    });
  }, 16), [isRearranging, selectedAssetId, setPosition]); // 60fps throttle

  return {
    initialState,
    handleMove
  };
};
