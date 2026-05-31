/**
 * Alert Component - Notification message with variant
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Alert
 * 
 * RULES:
 * ✅ ONLY UI alert component - NO business logic
 * ✅ NO API calls, NO auth logic
 * ✅ Pure UI component
 * ✅ TypeScript strict
 * ✅ Accessibility support (role="alert")
 */

import React from 'react';
import { cn } from '../../utils/cn';

// ==================== Types ====================

export type AlertVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';

export interface AlertProps {
  /** Alert variant/type */
  variant ? : AlertVariant;
  /** Optional title */
  title ? : string;
  /** Alert message content */
  message: React.ReactNode;
  /** Optional description (additional details) */
  description ? : React.ReactNode;
  /** Close handler (if provided, shows close button) */
  onClose ? : () => void;
  /** Whether alert is dismissible */
  dismissible ? : boolean;
  /** Whether to show icon */
  showIcon ? : boolean;
  /** Custom icon component */
  icon ? : React.ReactNode;
  /** Additional CSS classes */
  className ? : string;
  /** Actions to render (buttons) */
  actions ? : React.ReactNode;
  /** Alert ID for accessibility */
  id ? : string;
}

// ==================== Variant Styles ====================

const variantStyles: Record < AlertVariant, string > = {
  success: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
  error: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800',
  warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800',
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
  neutral: 'bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-700',
};

const titleStyles: Record < AlertVariant, string > = {
  success: 'text-green-800 dark:text-green-300',
  error: 'text-red-800 dark:text-red-300',
  warning: 'text-yellow-800 dark:text-yellow-300',
  info: 'text-blue-800 dark:text-blue-300',
  neutral: 'text-gray-800 dark:text-gray-300',
};

const messageStyles: Record < AlertVariant, string > = {
  success: 'text-green-700 dark:text-green-400',
  error: 'text-red-700 dark:text-red-400',
  warning: 'text-yellow-700 dark:text-yellow-400',
  info: 'text-blue-700 dark:text-blue-400',
  neutral: 'text-gray-700 dark:text-gray-400',
};

const iconColors: Record < AlertVariant, string > = {
  success: 'text-green-400 dark:text-green-500',
  error: 'text-red-400 dark:text-red-500',
  warning: 'text-yellow-400 dark:text-yellow-500',
  info: 'text-blue-400 dark:text-blue-500',
  neutral: 'text-gray-400 dark:text-gray-500',
};

// ==================== Icons ====================

const AlertIcon: React.FC < { variant: AlertVariant } > = ({ variant }) => {
  const icons = {
    success: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    neutral: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  };
  return <div className={cn('flex-shrink-0', iconColors[variant])}>{icons[variant]}</div>;
};

// ==================== Component ====================

/**
 * Alert - Notification component for system messages, errors, and status updates
 * 
 * @example
 * // Basic success alert
 * <Alert variant="success" message="Your changes have been saved successfully!" />
 * 
 * @example
 * // Error alert with title and description
 * <Alert
 *   variant="error"
 *   title="Failed to save"
 *   message="There was a problem saving your changes."
 *   description="Please check your internet connection and try again."
 *   dismissible
 * />
 * 
 * @example
 * // Warning alert with actions
 * <Alert
 *   variant="warning"
 *   title="Unsaved changes"
 *   message="You have unsaved changes. Do you want to save them?"
 *   actions={
 *     <div className="flex gap-2">
 *       <Button size="sm">Save</Button>
 *       <Button size="sm" variant="outline">Discard</Button>
 *     </div>
 *   }
 * />
 */
export const Alert: React.FC < AlertProps > = ({
  variant = 'info',
  title,
  message,
  description,
  onClose,
  dismissible = false,
  showIcon = true,
  icon,
  className,
  actions,
  id,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  
  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div
      id={id}
      className={cn(
        'rounded-lg border p-4',
        variantStyles[variant],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex">
        {showIcon && (icon || <AlertIcon variant={variant} />)}
        <div className={cn(showIcon && 'ml-3', 'flex-1')}>
          {title && (
            <h3 className={cn('text-sm font-medium', titleStyles[variant])}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', messageStyles[variant], title && 'mt-1')}>
            <p>{message}</p>
            {description && (
              <p className="mt-1 text-xs opacity-80">{description}</p>
            )}
          </div>
          {actions && <div className="mt-3">{actions}</div>}
        </div>
        {(dismissible || onClose) && (
          <button
            onClick={handleClose}
            className={cn(
              'ml-auto flex-shrink-0 rounded-md p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
              variant === 'info' && 'text-blue-400 hover:bg-blue-100 focus:ring-blue-500 dark:hover:bg-blue-900/50',
              variant === 'success' && 'text-green-400 hover:bg-green-100 focus:ring-green-500 dark:hover:bg-green-900/50',
              variant === 'error' && 'text-red-400 hover:bg-red-100 focus:ring-red-500 dark:hover:bg-red-900/50',
              variant === 'warning' && 'text-yellow-400 hover:bg-yellow-100 focus:ring-yellow-500 dark:hover:bg-yellow-900/50',
              variant === 'neutral' && 'text-gray-400 hover:bg-gray-100 focus:ring-gray-500 dark:hover:bg-gray-800'
            )}
            aria-label="Close alert"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

Alert.displayName = 'Alert';
