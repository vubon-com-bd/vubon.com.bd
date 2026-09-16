'use client';
import { useCallback, useState } from 'react';

export type UiToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface UiToast {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly variant: UiToastVariant;
  readonly durationMs: number;
  readonly ariaRole: 'status' | 'alert';
  readonly ariaLive: 'polite' | 'assertive';
}

export interface ShowToastInput {
  readonly title: string;
  readonly description?: string;
  readonly variant?: UiToastVariant;
  readonly durationMs?: number;
}

export interface UseToastResult {
  readonly toasts: readonly UiToast[];
  readonly show: (input: ShowToastInput) => string;
  readonly dismiss: (id: string) => void;
  readonly clear: () => void;
}

let counter = 0;
function nextId(): string {
  counter += 1;
  return `toast_${Date.now().toString(36)}_${counter}`;
}

/** UI-only toast state with ARIA metadata. */
export function useToast(): UseToastResult {
  const [toasts, setToasts] = useState<readonly UiToast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (input: ShowToastInput): string => {
      const id = nextId();
      const variant = input.variant ?? 'info';
      const toast: UiToast = {
        id,
        title: input.title,
        ...(input.description !== undefined && { description: input.description }),
        variant,
        durationMs: input.durationMs ?? 4000,
        ariaRole: variant === 'error' ? 'alert' : 'status',
        ariaLive: variant === 'error' ? 'assertive' : 'polite',
      };
      setToasts((prev) => [...prev, toast]);
      if (toast.durationMs > 0) {
        setTimeout(() => dismiss(id), toast.durationMs);
      }
      return id;
    },
    [dismiss]
  );

  const clear = useCallback(() => setToasts([]), []);

  return { toasts, show, dismiss, clear };
}
