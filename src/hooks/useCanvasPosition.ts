
import { useState, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export interface CanvasPositionState {
  position: Position;
  size: Size;
}

export const useCanvasPosition = (): [
  CanvasPositionState,
  React.Dispatch<React.SetStateAction<Position>>,
  React.Dispatch<React.SetStateAction<Size>>
] => {
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [size, setSize] = useState<Size>({ width: 600, height: 400 });

  return [{ position, size }, setPosition, setSize];
};
