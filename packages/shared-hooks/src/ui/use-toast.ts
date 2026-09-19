import { useCallback, useState } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  readonly id: string;
  readonly message: string;
  readonly variant: ToastVariant;
  readonly durationMs: number;
  /** ARIA role to use when rendering the toast. */
  readonly ariaRole: 'status' | 'alert';
  /** ARIA live region politeness. */
  readonly ariaLive: 'polite' | 'assertive';
}

export interface ToastOptions {
  readonly variant?: ToastVariant;
  readonly durationMs?: number;
}

let toastCounter = 0;
function nextId(): string {
  toastCounter += 1;
  return `toast_${Date.now().toString(36)}_${toastCounter}`;
}

export function useToast(): {
  readonly toasts: readonly Toast[];
  readonly show: (message: string, options?: ToastOptions) => string;
  readonly dismiss: (id: string) => void;
  readonly clear: () => void;
} {
  const [toasts, setToasts] = useState<readonly Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message: string, options: ToastOptions = {}): string => {
      const id = nextId();
      const variant = options.variant ?? 'info';
      const toast: Toast = {
        id,
        message,
        variant,
        durationMs: options.durationMs ?? 4000,
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
