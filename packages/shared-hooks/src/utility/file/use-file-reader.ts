import { useCallback, useRef, useState } from 'react';

export interface FileReaderState {
  readonly content: string | null;
  readonly error: Error | null;
  readonly loading: boolean;
  readonly readAsText: (file: File) => Promise<string | null>;
  readonly readAsDataUrl: (file: File) => Promise<string | null>;
}

export function useFileReader(): FileReaderState {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  const readWith = useCallback(
    (file: File, mode: 'readAsText' | 'readAsDataURL'): Promise<string | null> => {
      return new Promise((resolve) => {
        if (typeof FileReader === 'undefined') {
          setError(new Error('FileReader unavailable'));
          resolve(null);
          return;
        }
        setLoading(true);
        setError(null);
        const reader = new FileReader();
        reader.onload = () => {
          if (!mounted.current) return;
          const result = typeof reader.result === 'string' ? reader.result : null;
          setContent(result);
          setLoading(false);
          resolve(result);
        };
        reader.onerror = () => {
          if (!mounted.current) return;
          const e = new Error('File read failed');
          setError(e);
          setLoading(false);
          resolve(null);
        };
        if (mode === 'readAsText') reader.readAsText(file);
        else reader.readAsDataURL(file);
      });
    },
    []
  );

  const readAsText = useCallback((file: File) => readWith(file, 'readAsText'), [readWith]);
  const readAsDataUrl = useCallback((file: File) => readWith(file, 'readAsDataURL'), [readWith]);

  return { content, error, loading, readAsText, readAsDataUrl };
}
