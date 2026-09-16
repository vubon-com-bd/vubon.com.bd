'use client';
import { useCallback, useState } from 'react';

export interface UseModalResult {
  readonly open: boolean;
  readonly openModal: () => void;
  readonly closeModal: () => void;
  readonly toggle: () => void;
  readonly setOpen: (value: boolean) => void;
}

/**
 * UI-only modal state.
 * ⚠️ Does NOT handle focus trap / ESC / click-outside —
 * those are handled by `<Modal>` via `<FocusTrap>` + effects.
 */
export function useModal(initial = false): UseModalResult {
  const [open, setOpen] = useState(initial);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  return { open, openModal, closeModal, toggle, setOpen };
}
