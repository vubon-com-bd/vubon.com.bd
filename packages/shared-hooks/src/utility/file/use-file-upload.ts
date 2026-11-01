import { useCallback, useRef, useState } from 'react';

export interface FileUploadOptions {
  readonly accept?: string;
  readonly multiple?: boolean;
  readonly maxSizeBytes?: number;
  readonly onSelect?: (files: readonly File[]) => void;
}

export interface FileUploadState {
  readonly files: readonly File[];
  readonly error: Error | null;
  readonly inputRef: React.RefObject<HTMLInputElement>;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly open: () => void;
  readonly clear: () => void;
}

export function useFileUpload(options: FileUploadOptions = {}): FileUploadState {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<readonly File[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const list = e.target.files;
      if (!list) return;
      const arr = Array.from(list);

      if (options.maxSizeBytes !== undefined) {
        const tooBig = arr.find((f) => f.size > (options.maxSizeBytes ?? 0));
        if (tooBig) {
          setError(new Error(`File too large: ${tooBig.name}`));
          return;
        }
      }

      setFiles(arr);
      setError(null);
      options.onSelect?.(arr);
    },
    [options]
  );

  const open = useCallback(() => inputRef.current?.click(), []);
  const clear = useCallback(() => {
    setFiles([]);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  return { files, error, inputRef, onChange, open, clear };
}
