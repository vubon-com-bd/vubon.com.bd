import { useCallback, useState } from 'react';

export interface FileDropHandlers {
  readonly onDragOver: (e: React.DragEvent) => void;
  readonly onDragLeave: (e: React.DragEvent) => void;
  readonly onDrop: (e: React.DragEvent) => void;
}

export function useFileDrop(onFiles: (files: readonly File[]) => void): {
  readonly isOver: boolean;
  readonly handlers: FileDropHandlers;
} {
  const [isOver, setIsOver] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  }, []);
  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
  }, []);
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsOver(false);
      const arr = Array.from(e.dataTransfer.files);
      if (arr.length > 0) onFiles(arr);
    },
    [onFiles]
  );

  return { isOver, handlers: { onDragOver, onDragLeave, onDrop } };
}
