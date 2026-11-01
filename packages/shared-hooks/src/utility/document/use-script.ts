import { useEffect, useState } from 'react';

export interface ScriptState {
  readonly loaded: boolean;
  readonly error: Error | null;
}

/** Loads an external script once. */
export function useScript(src: string): ScriptState {
  const [state, setState] = useState<ScriptState>({ loaded: false, error: null });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      setState({ loaded: true, error: null });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => setState({ loaded: true, error: null });
    script.onerror = () => setState({ loaded: false, error: new Error(`Failed to load ${src}`) });
    document.head.appendChild(script);
    return () => {
      // NOTE: not removing the script — other consumers may need it.
    };
  }, [src]);

  return state;
}
