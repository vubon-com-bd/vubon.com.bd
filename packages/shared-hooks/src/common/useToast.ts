import { useState, useCallback } from 'react';
import { UI_DEFAULTS } from '@vubon/shared-constants/src/common/use.constants';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface UseToastReturn {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const generateId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = generateId();
      setToasts((prev) => [...prev, { ...toast, id }]);
      const duration = toast.duration ?? UI_DEFAULTS.TOAST_DURATION;
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  const clearToasts = useCallback(() => setToasts([]), []);

  const success = useCallback(
    (message: string, duration?: number) => addToast({ message, type: 'success', duration }),
    [addToast]
  );
  const error = useCallback(
    (message: string, duration?: number) => addToast({ message, type: 'error', duration }),
    [addToast]
  );
  const warning = useCallback(
    (message: string, duration?: number) => addToast({ message, type: 'warning', duration }),
    [addToast]
  );
  const info = useCallback(
    (message: string, duration?: number) => addToast({ message, type: 'info', duration }),
    [addToast]
  );

  return { toasts, addToast, removeToast, clearToasts, success, error, warning, info };
};
