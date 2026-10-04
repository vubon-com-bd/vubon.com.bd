import { useCallback, useEffect, useRef, useState } from 'react';

export interface CopyState {
  readonly copied: boolean;
  readonly error: Error | null;
  readonly copy: (text: string) => Promise<boolean>;
  readonly reset: () => void;
}

/**
 * Copy-to-clipboard with auto-reset `resetAfterMs`.
 */
export function useCopyToClipboard(resetAfterMs = 2000): CopyState {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      setError(null);
      try {
        if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
          throw new Error('Clipboard API unavailable');
        }
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetAfterMs);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Copy failed'));
        setCopied(false);
        return false;
      }
    },
    [resetAfterMs]
  );

  return { copied, error, copy, reset };
}
