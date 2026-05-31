/**
 * Toast Component - Notification UI
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Toast
 * 
 * RULES:
 * ✅ ONLY UI toast component - NO business logic
 * ✅ NO direct API error handling, auth retry logic
 * ✅ Pure UI component with animations
 * ✅ TypeScript strict
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';

export interface Toast {
  id: string;
  message: string;
  messageBn ? : string;
  title ? : string;
  titleBn ? : string;
  variant: ToastVariant;
  duration ? : number;
  action ? : {
    label: string;
    onClick: () => void;
  };
  onClose ? : () => void;
}

export interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
  position ? : 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  locale ? : 'en' | 'bn';
}

// ==================== Variant Styles ====================

const variantStyles: Record < ToastVariant, string > = {
  success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800',
  error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-800',
  info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800',
  neutral: 'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
};

const iconColors: Record < ToastVariant, string > = {
  success: 'text-green-400 dark:text-green-500',
  error: 'text-red-400 dark:text-red-500',
  warning: 'text-yellow-400 dark:text-yellow-500',
  info: 'text-blue-400 dark:text-blue-500',
  neutral: 'text-gray-400 dark:text-gray-500',
};

// ==================== Position Classes ====================

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

// ==================== Toast Item ====================

interface ToastItemProps extends Toast {
  onRemove: (id: string) => void;
  locale ? : 'en' | 'bn';
}

const ToastItem: React.FC < ToastItemProps > = ({
  id,
  message,
  messageBn,
  title,
  titleBn,
  variant,
  duration = 5000,
  action,
  onClose,
  onRemove,
  locale = 'en',
}) => {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onRemove, onClose]);
  
  const displayTitle = locale === 'bn' && titleBn ? titleBn : title;
  const displayMessage = locale === 'bn' && messageBn ? messageBn : message;
  
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      case 'neutral':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'pointer-events-auto mb-3 flex w-full max-w-sm rounded-lg border shadow-lg',
        variantStyles[variant]
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-1 items-start p-4">
        <div className={cn('flex-shrink-0', iconColors[variant])}>{getIcon()}</div>
        <div className="ml-3 flex-1">
          {displayTitle && (
            <p className="text-sm font-medium">{displayTitle}</p>
          )}
          <p className={cn('text-sm', displayTitle && 'mt-1')}>{displayMessage}</p>
          {action && (
            <button
              onClick={() => {
                action.onClick();
                onRemove(id);
              }}
              className="mt-2 text-sm font-medium underline underline-offset-2 hover:opacity-80"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => {
            onRemove(id);
            onClose?.();
          }}
          className="ml-4 flex-shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-black/10 hover:text-gray-500 dark:hover:bg-white/10"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

// ==================== Toast Container ====================

/**
 * ToastContainer - Container for toast notifications
 * 
 * @example
 * const [toasts, setToasts] = useState<Toast[]>([]);
 * 
 * const addToast = (toast: Omit<Toast, 'id'>) => {
 *   setToasts(prev => [...prev, { ...toast, id: Math.random().toString() }]);
 * };
 * 
 * return <ToastContainer toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
 */
export const ToastContainer: React.FC < ToastContainerProps > = ({
  toasts,
  onRemove,
  position = 'bottom-right',
  locale = 'en',
}) => {
  return (
    <div className={cn('fixed z-50 flex flex-col', positionClasses[position])}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onRemove={onRemove} locale={locale} />
        ))}
      </AnimatePresence>
    </div>
  );
};

ToastContainer.displayName = 'ToastContainer';

// ==================== useToast Hook ====================

export interface UseToastReturn {
  toasts: Toast[];
  addToast: (toast: Omit < Toast, 'id' > ) => string;
  removeToast: (id: string) => void;
  success: (message: string, options ? : Partial < Omit < Toast, 'id' | 'message' | 'variant' >> ) => string;
  error: (message: string, options ? : Partial < Omit < Toast, 'id' | 'message' | 'variant' >> ) => string;
  warning: (message: string, options ? : Partial < Omit < Toast, 'id' | 'message' | 'variant' >> ) => string;
  info: (message: string, options ? : Partial < Omit < Toast, 'id' | 'message' | 'variant' >> ) => string;
}

/**
 * useToast - Hook for managing toast notifications
 * 
 * @example
 * const { success, error } = useToast();
 * 
 * success('Profile updated successfully!');
 * error('Something went wrong');
 */
export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = React.useState < Toast[] > ([]);
  
  const addToast = React.useCallback((toast: Omit < Toast, 'id' > ): string => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);
  
  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  
  const success = React.useCallback(
    (message: string, options ? : Partial < Omit < Toast, 'id' | 'message' | 'variant' >> ) => {
      return addToast({ message, variant: 'success', ...options });
    },
    [addToast]
  );
  
  const error = React.useCallback(
    (message: string, options ? : Partial < Omit < Toast, 'id' | 'message' | 'variant' >> ) => {
      return addToast({ message, variant: 'error', ...options });
    },
    [addToast]
  );
  
  const warning = React.useCallback(
    (message: string, options ? : Partial < Omit < Toast, 'id' | 'message' | 'variant' >> ) => {
      return addToast({ message, variant: 'warning', ...options });
    },
    [addToast]
  );
  
  const info = React.useCallback(
    (message: string, options ? : Partial < Omit < Toast, 'id' | 'message' | 'variant' >> ) => {
      return addToast({ message, variant: 'info', ...options });
    },
    [addToast]
  );
  
  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
};
