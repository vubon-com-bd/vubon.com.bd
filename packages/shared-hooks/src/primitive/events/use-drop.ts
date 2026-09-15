import { useCallback, useState } from 'react';

export interface DropHandlers {
  readonly onDragOver: (e: React.DragEvent) => void;
  readonly onDragLeave: (e: React.DragEvent) => void;
  readonly onDrop: (e: React.DragEvent) => void;
}

export function useDrop(onFilesDropped: (files: FileList) => void): {
  readonly isOver: boolean;
  readonly handlers: DropHandlers;
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
      if (e.dataTransfer.files.length > 0) onFilesDropped(e.dataTransfer.files);
    },
    [onFilesDropped]
  );

  return { isOver, handlers: { onDragOver, onDragLeave, onDrop } };
}
