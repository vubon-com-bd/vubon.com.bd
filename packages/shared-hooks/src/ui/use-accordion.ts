import { useCallback, useState } from 'react';

export interface AccordionOptions {
  readonly multiple?: boolean;
}

export function useAccordion<T extends string | number>(
  initial: readonly T[] = [],
  options: AccordionOptions = {}
): {
  readonly openItems: readonly T[];
  readonly isOpen: (id: T) => boolean;
  readonly toggle: (id: T) => void;
  readonly open: (id: T) => void;
  readonly close: (id: T) => void;
  readonly closeAll: () => void;
} {
  const [openItems, setOpenItems] = useState<readonly T[]>(initial);

  const isOpen = useCallback((id: T) => openItems.includes(id), [openItems]);

  const toggle = useCallback(
    (id: T) => {
      setOpenItems((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        return options.multiple ? [...prev, id] : [id];
      });
    },
    [options.multiple]
  );

  const open = useCallback(
    (id: T) => {
      setOpenItems((prev) =>
        options.multiple ? (prev.includes(id) ? prev : [...prev, id]) : [id]
      );
    },
    [options.multiple]
  );

  const close = useCallback((id: T) => setOpenItems((prev) => prev.filter((x) => x !== id)), []);
  const closeAll = useCallback(() => setOpenItems([]), []);

  return { openItems, isOpen, toggle, open, close, closeAll };
}
