import { useCallback, useState } from 'react';

export interface PasteState {
  readonly text: string | null;
  readonly error: Error | null;
  readonly paste: () => Promise<string | null>;
}

export function usePasteFromClipboard(): PasteState {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const paste = useCallback(async (): Promise<string | null> => {
    setError(null);
    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.readText) {
        throw new Error('Clipboard API unavailable');
      }
      const value = await navigator.clipboard.readText();
      setText(value);
      return value;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Paste failed'));
      return null;
    }
  }, []);

  return { text, error, paste };
}
