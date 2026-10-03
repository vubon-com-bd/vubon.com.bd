import { useCallback, useRef, useState } from 'react';

export interface DragPosition {
  readonly x: number;
  readonly y: number;
}

export interface DragHandlers {
  readonly onMouseDown: (e: React.MouseEvent) => void;
}

export function useDrag(): {
  readonly dragging: boolean;
  readonly position: DragPosition;
  readonly handlers: DragHandlers;
} {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState<DragPosition>({ x: 0, y: 0 });
  const start = useRef<DragPosition>({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    start.current = { x: e.clientX, y: e.clientY };
    setPosition({ x: 0, y: 0 });

    const onMove = (ev: MouseEvent): void => {
      setPosition({
        x: ev.clientX - start.current.x,
        y: ev.clientY - start.current.y,
      });
    };
    const onUp = (): void => {
      setDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, []);

  return { dragging, position, handlers: { onMouseDown } };
}
