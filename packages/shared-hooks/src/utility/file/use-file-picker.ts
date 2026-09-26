import { useCallback, useRef } from 'react';

export interface FilePickerOptions {
  readonly accept?: string;
  readonly multiple?: boolean;
}

/** Imperatively open a file picker and resolve the chosen files. */
export function useFilePicker(): {
  readonly pick: (options?: FilePickerOptions) => Promise<readonly File[]>;
} {
  const resolving = useRef(false);
  return {
    pick: useCallback(
      (options: FilePickerOptions = {}) =>
        new Promise<readonly File[]>((resolve) => {
          if (typeof document === 'undefined' || resolving.current) {
            resolve([]);
            return;
          }
          resolving.current = true;
          const input = document.createElement('input');
          input.type = 'file';
          if (options.accept) input.accept = options.accept;
          if (options.multiple) input.multiple = true;
          input.style.display = 'none';
          input.onchange = () => {
            resolving.current = false;
            resolve(input.files ? Array.from(input.files) : []);
            input.remove();
          };
          document.body.appendChild(input);
          input.click();
        }),
      []
    ),
  };
}
