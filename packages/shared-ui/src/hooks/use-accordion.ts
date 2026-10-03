'use client';
import { useCallback, useState } from 'react';

export interface UseAccordionOptions {
  readonly multiple?: boolean;
}

export interface UseAccordionResult {
  readonly openIds: readonly string[];
  readonly isOpen: (id: string) => boolean;
  readonly toggle: (id: string) => void;
  readonly open: (id: string) => void;
  readonly close: (id: string) => void;
  readonly closeAll: () => void;
}

/** UI-only accordion state. */
export function useAccordion(
  initial: readonly string[] = [],
  options: UseAccordionOptions = {}
): UseAccordionResult {
  const [openIds, setOpenIds] = useState<readonly string[]>(initial);

  const isOpen = useCallback((id: string) => openIds.includes(id), [openIds]);

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : options.multiple ? [...prev, id] : [id]
      );
    },
    [options.multiple]
  );

  const open = useCallback(
    (id: string) => {
      setOpenIds((prev) => (options.multiple ? (prev.includes(id) ? prev : [...prev, id]) : [id]));
    },
    [options.multiple]
  );

  const close = useCallback((id: string) => {
    setOpenIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const closeAll = useCallback(() => setOpenIds([]), []);

  return { openIds, isOpen, toggle, open, close, closeAll };
}
