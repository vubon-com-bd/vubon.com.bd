'use client';
import { useCallback, useState } from 'react';

export interface UseSidebarResult {
  readonly open: boolean;
  readonly toggle: () => void;
  readonly openSidebar: () => void;
  readonly closeSidebar: () => void;
  readonly setOpen: (value: boolean) => void;
}

/** UI-only sidebar state. */
export function useSidebar(initial = false): UseSidebarResult {
  const [open, setOpen] = useState(initial);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const openSidebar = useCallback(() => setOpen(true), []);
  const closeSidebar = useCallback(() => setOpen(false), []);
  return { open, toggle, openSidebar, closeSidebar, setOpen };
}
