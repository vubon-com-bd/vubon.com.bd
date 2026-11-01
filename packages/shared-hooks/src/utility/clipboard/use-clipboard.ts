import { useCallback, useState } from 'react';

export interface ClipboardState {
  readonly text: string | null;
  readonly copied: boolean;
  readonly error: Error | null;
  readonly copy: (text: string) => Promise<boolean>;
  readonly read: () => Promise<string | null>;
}

/** Read/write the system clipboard with state tracking. */
export function useClipboard(): ClipboardState {
  const [text, setText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(async (value: string): Promise<boolean> => {
    setError(null);
    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(value);
      setText(value);
      setCopied(true);
      return true;
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Copy failed');
      setError(e);
      setCopied(false);
      return false;
    }
  }, []);

  const read = useCallback(async (): Promise<string | null> => {
    setError(null);
    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.readText) {
        throw new Error('Clipboard API unavailable');
      }
      const value = await navigator.clipboard.readText();
      setText(value);
      return value;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Read failed'));
      return null;
    }
  }, []);

  return { text, copied, error, copy, read };
}
