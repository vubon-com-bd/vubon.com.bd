/**
 * useToast Hook - Toast notification management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-ui/src/hooks/useToast
 *
 * RULES:
 * ✅ ONLY toast notification management - NO business logic
 * ✅ NO API retry handling, auth refresh logic
 * ✅ Pure UI hook with TypeScript strict
 * ✅ Includes ToastProvider and context for global access
 * ✅ Memory leak prevention with cleanup
 * ✅ Performance optimized with useCallback and useRef
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { type Toast, type ToastVariant } from '../components/ui/Toast';

// ==================== Types ====================

export interface ToastOptions {
  /** Toast variant/type */
  variant?: ToastVariant;
  /** Duration in milliseconds (default: 5000) */
  duration?: number;
  /** Title of the toast */
  title?: string;
  /** Bengali title (optional) */
  titleBn?: string;
  /** Bengali message (optional) */
  messageBn?: string;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Callback when toast closes */
  onClose?: () => void;
  /** Whether to show close button (default: true) */
  closeable?: boolean;
  /** Unique ID for the toast (auto-generated if not provided) */
  id?: string;
  /** Priority for sorting (higher = higher priority) */
  priority?: 'high' | 'normal' | 'low';
}

export interface UseToastReturn {
  /** List of active toasts */
  toasts: Toast[];
  /** Show a toast */
  showToast: (message: string, options?: ToastOptions) => string;
  /** Show a success toast */
  showSuccess: (message: string, options?: Omit<ToastOptions, 'variant'>) => string;
  /** Show an error toast */
  showError: (message: string, options?: Omit<ToastOptions, 'variant'>) => string;
  /** Show a warning toast */
  showWarning: (message: string, options?: Omit<ToastOptions, 'variant'>) => string;
  /** Show an info toast */
  showInfo: (message: string, options?: Omit<ToastOptions, 'variant'>) => string;
  /** Show a neutral toast */
  showNeutral: (message: string, options?: Omit<ToastOptions, 'variant'>) => string;
  /** Remove a toast by ID */
  removeToast: (id: string) => void;
  /** Remove all toasts */
  removeAllToasts: () => void;
  /** Update a toast */
  updateToast: (id: string, updates: Partial<Omit<Toast, 'id'>>) => void;
  /** Get toast by ID */
  getToast: (id: string) => Toast | undefined;
  /** Pause auto-dismiss for a toast */
  pauseToast: (id: string) => void;
  /** Resume auto-dismiss for a toast */
  resumeToast: (id: string) => void;
  /** Toast queue (for debugging) */
  queue: Toast[];
}

// ==================== Constants ====================

const DEFAULT_DURATION = 5000;
const MAX_TOASTS = 5;
const PRIORITY_ORDER: Record<string, number> = {
  high: 3,
  normal: 2,
  low: 1,
};

// ==================== Helper Functions ====================

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
};

const sortByPriority = (toasts: Toast[]): Toast[] => {
  return [...toasts].sort((a, b) => {
    const aPriority = PRIORITY_ORDER[a.priority || 'normal'];
    const bPriority = PRIORITY_ORDER[b.priority || 'normal'];
    if (aPriority !== bPriority) return bPriority - aPriority;
    return (a.timestamp || 0) - (b.timestamp || 0);
  });
};

// ==================== Hook ====================

/**
 * Hook for managing toast notifications
 *
 * @example
 * const { showSuccess, showError, showWarning } = useToast();
 *
 * // Success message
 * showSuccess('Profile updated successfully!');
 *
 * // Error with longer duration
 * showError('Something went wrong', { duration: 10000 });
 *
 * // Toast with title and action
 * showInfo('New version available', {
 *   title: 'Update Available',
 *   action: {
 *     label: 'Update',
 *     onClick: () => window.location.reload()
 *   },
 *   duration: 15000
 * });
 *
 * // Bengali message
 * showSuccess('প্রোফাইল সফলভাবে আপডেট করা হয়েছে', {
 *   messageBn: 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে',
 *   title: 'Success',
 *   titleBn: 'সফল'
 * });
 */
export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const pausedRefs = useRef<Set<string>>(new Set());

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => {
        clearTimeout(timeout);
      });
      timeoutRefs.current.clear();
      pausedRefs.current.clear();
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    const timeout = timeoutRefs.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
    }
    pausedRefs.current.delete(id);
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    timeoutRefs.current.forEach((timeout) => {
      clearTimeout(timeout);
    });
    timeoutRefs.current.clear();
    pausedRefs.current.clear();
    setToasts([]);
  }, []);

  const getToast = useCallback((id: string): Toast | undefined => {
    return toasts.find((toast) => toast.id === id);
  }, [toasts]);

  const pauseToast = useCallback((id: string) => {
    const timeout = timeoutRefs.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
      pausedRefs.current.add(id);
    }
  }, []);

  const resumeToast = useCallback((id: string) => {
    const toast = getToast(id);
    if (toast && pausedRefs.current.has(id)) {
      const duration = toast.duration || DEFAULT_DURATION;
      if (duration > 0) {
        const timeout = setTimeout(() => {
          removeToast(id);
          toast.onClose?.();
        }, duration);
        timeoutRefs.current.set(id, timeout);
        pausedRefs.current.delete(id);
      }
    }
  }, [getToast, removeToast]);

  const showToast = useCallback((message: string, options: ToastOptions = {}): string => {
    const {
      variant = 'info',
      duration = DEFAULT_DURATION,
      title,
      titleBn,
      messageBn,
      action,
      onClose,
      closeable = true,
      id: providedId,
      priority = 'normal',
    } = options;

    const id = providedId || generateId();
    const timestamp = Date.now();

    const newToast: Toast = {
      id,
      message,
      messageBn,
      title,
      titleBn,
      variant,
      duration,
      action,
      onClose,
      priority,
      timestamp,
    };

    setToasts((prev) => {
      // Check if toast with same ID already exists
      const existingIndex = prev.findIndex((t) => t.id === id);
      let newToasts: Toast[];

      if (existingIndex !== -1) {
        // Update existing toast
        newToasts = [...prev];
        newToasts[existingIndex] = { ...newToasts[existingIndex], ...newToast };
      } else {
        // Add new toast
        newToasts = [...prev, newToast];
      }

      // Limit number of toasts (remove oldest/lowest priority)
      if (newToasts.length > MAX_TOASTS) {
        // Sort by priority (higher first) then by timestamp (older first)
        const sorted = sortByPriority(newToasts);
        const toRemove = sorted.slice(MAX_TOASTS);
        toRemove.forEach((t) => {
          const timeout = timeoutRefs.current.get(t.id);
          if (timeout) {
            clearTimeout(timeout);
            timeoutRefs.current.delete(t.id);
          }
        });
        newToasts = sorted.slice(0, MAX_TOASTS);
      }

      return newToasts;
    });

    // Auto-remove after duration (if not already paused)
    if (duration > 0 && !pausedRefs.current.has(id)) {
      const timeout = setTimeout(() => {
        removeToast(id);
        onClose?.();
      }, duration);
      timeoutRefs.current.set(id, timeout);
    }

    return id;
  }, [removeToast]);

  const updateToast = useCallback((id: string, updates: Partial<Omit<Toast, 'id'>>) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  const showSuccess = useCallback((message: string, options?: Omit<ToastOptions, 'variant'>) => {
    return showToast(message, { ...options, variant: 'success' });
  }, [showToast]);

  const showError = useCallback((message: string, options?: Omit<ToastOptions, 'variant'>) => {
    return showToast(message, { ...options, variant: 'error' });
  }, [showToast]);

  const showWarning = useCallback((message: string, options?: Omit<ToastOptions, 'variant'>) => {
    return showToast(message, { ...options, variant: 'warning' });
  }, [showToast]);

  const showInfo = useCallback((message: string, options?: Omit<ToastOptions, 'variant'>) => {
    return showToast(message, { ...options, variant: 'info' });
  }, [showToast]);

  const showNeutral = useCallback((message: string, options?: Omit<ToastOptions, 'variant'>) => {
    return showToast(message, { ...options, variant: 'neutral' });
  }, [showToast]);

  // Sorted toasts by priority for display
  const sortedToasts = sortByPriority(toasts);

  return {
    toasts: sortedToasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showNeutral,
    removeToast,
    removeAllToasts,
    updateToast,
    getToast,
    pauseToast,
    resumeToast,
    queue: toasts,
  };
};

// ==================== Toast Context ====================

import React from 'react';

export interface ToastContextValue extends UseToastReturn {
  /** Toast container position */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** Maximum toasts at once */
  maxToasts?: number;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/**
 * ToastProvider - Context provider for toast notifications
 *
 * @example
 * // Wrap your app
 * <ToastProvider>
 *   <App />
 *   <ToastContainer />
 * </ToastProvider>
 *
 * // Use anywhere
 * const { showSuccess } = useToastContext();
 */
export const ToastProvider: React.FC<{
  children: React.ReactNode;
  position?: ToastContextValue['position'];
  maxToasts?: number;
}> = ({ children, position = 'bottom-right', maxToasts = MAX_TOASTS }) => {
  const toast = useToast();

  // Override max toasts if needed (for context only, not affecting the hook's internal limit)
  const enhancedToast = useMemo(() => ({
    ...toast,
    position,
    maxToasts,
  }), [toast, position, maxToasts]);

  return (
    <ToastContext.Provider value={enhancedToast}>
      {children}
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';

/**
 * Hook to use toast from context
 *
 * @example
 * const { showSuccess } = useToastContext();
 * showSuccess('Operation completed!');
 */
export const useToastContext = (): ToastContextValue => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
};

// ==================== Type Exports ====================

export type { ToastOptions, UseToastReturn, ToastContextValue };
