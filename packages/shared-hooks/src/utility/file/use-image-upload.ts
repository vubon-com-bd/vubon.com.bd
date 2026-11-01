import { useCallback, useEffect, useState } from 'react';

export interface ImageUploadState {
  readonly preview: string | null;
  readonly file: File | null;
  readonly select: (file: File) => void;
  readonly clear: () => void;
}

/** Selects an image and provides a URL preview (revokes on cleanup). */
export function useImageUpload(): ImageUploadState {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const select = useCallback((f: File) => setFile(f), []);
  const clear = useCallback(() => setFile(null), []);

  return { preview, file, select, clear };
}
