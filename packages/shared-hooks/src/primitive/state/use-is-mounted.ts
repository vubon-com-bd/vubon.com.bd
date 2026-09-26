import { useEffect, useRef, useState } from 'react';

/** Returns `true` after first mount, `false` on server render. */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

/** Stable ref-based version — no re-render. */
export function useIsMountedRef(): { readonly current: boolean } {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  return ref;
}
