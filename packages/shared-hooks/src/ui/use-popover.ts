import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../primitive/events/use-click-outside';

export interface PopoverState {
  readonly open: boolean;
  readonly anchorRef: React.RefObject<HTMLElement>;
  readonly contentRef: React.RefObject<HTMLDivElement>;
  readonly toggle: () => void;
  readonly openPopover: () => void;
  readonly closePopover: () => void;
}

/** Popover with click-outside + ESC handling. */
export function usePopover(): PopoverState {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(contentRef, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const openPopover = useCallback(() => setOpen(true), []);
  const closePopover = useCallback(() => setOpen(false), []);

  return { open, anchorRef, contentRef, toggle, openPopover, closePopover };
}
