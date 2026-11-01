import { useCallback, useRef, useState } from 'react';

export function useTableResize(
  initialWidth: number,
  minWidth = 50
): {
  readonly width: number;
  readonly resizing: boolean;
  readonly startResize: (e: React.MouseEvent) => void;
} {
  const [width, setWidth] = useState(initialWidth);
  const [resizing, setResizing] = useState(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const startResize = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setResizing(true);
      startX.current = e.clientX;
      startWidth.current = width;

      const onMove = (ev: MouseEvent): void => {
        const delta = ev.clientX - startX.current;
        setWidth(Math.max(minWidth, startWidth.current + delta));
      };
      const onUp = (): void => {
        setResizing(false);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [width, minWidth]
  );

  return { width, resizing, startResize };
}
