'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseTooltipOptions {
  readonly delayMs?: number;
  readonly closeDelayMs?: number;
}

export interface UseTooltipResult {
  readonly open: boolean;
  readonly show: () => void;
  readonly hide: () => void;
  readonly toggle: () => void;
}

/** UI-only tooltip open/close with open/close delays. */
export function useTooltip(options: UseTooltipOptions = {}): UseTooltipResult {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const show = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), options.delayMs ?? 300);
  }, [options.delayMs]);

  const hide = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), options.closeDelayMs ?? 0);
  }, [options.closeDelayMs]);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return { open, show, hide, toggle };
}
