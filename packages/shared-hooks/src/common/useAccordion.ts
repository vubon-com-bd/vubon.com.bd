import { useState, useCallback } from 'react';

export interface UseAccordionOptions {
  allowMultiple?: boolean;
  initialOpen?: string[];
}

export interface UseAccordionReturn {
  openItems: string[];
  toggle: (id: string) => void;
  open: (id: string) => void;
  close: (id: string) => void;
  closeAll: () => void;
  openAll: (ids: string[]) => void;
  isOpen: (id: string) => boolean;
}

export const useAccordion = (options: UseAccordionOptions = {}): UseAccordionReturn => {
  const { allowMultiple = false, initialOpen = [] } = options;
  const [openItems, setOpenItems] = useState<string[]>(initialOpen);

  const toggle = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        if (prev.includes(id)) return prev.filter((i) => i !== id);
        return allowMultiple ? [...prev, id] : [id];
      });
    },
    [allowMultiple]
  );

  const open = useCallback(
    (id: string) => {
      setOpenItems((prev) => (allowMultiple ? [...prev, id] : [id]));
    },
    [allowMultiple]
  );

  const close = useCallback(
    (id: string) => setOpenItems((prev) => prev.filter((i) => i !== id)),
    []
  );
  const closeAll = useCallback(() => setOpenItems([]), []);
  const openAll = useCallback((ids: string[]) => setOpenItems(ids), []);
  const isOpen = useCallback((id: string) => openItems.includes(id), [openItems]);

  return { openItems, toggle, open, close, closeAll, openAll, isOpen };
};
