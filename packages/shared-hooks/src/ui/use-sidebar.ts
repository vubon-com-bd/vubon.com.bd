import { useCallback, useEffect, useState } from 'react';

export function useSidebar(initial = false): {
  readonly open: boolean;
  readonly toggle: () => void;
  readonly openSidebar: () => void;
  readonly closeSidebar: () => void;
  readonly setOpen: (value: boolean) => void;
} {
  const [open, setOpen] = useState(initial);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const openSidebar = useCallback(() => setOpen(true), []);
  const closeSidebar = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return { open, toggle, openSidebar, closeSidebar, setOpen };
}
