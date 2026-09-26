'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseDropdownResult {
  readonly open: boolean;
  readonly setOpen: (value: boolean) => void;
  readonly toggle: () => void;
  readonly containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * UI-only dropdown state.
 * Attaches `mousedown` + `Escape` listeners when open.
 */
export function useDropdown(): UseDropdownResult {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent): void => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return { open, setOpen, toggle, containerRef };
}
