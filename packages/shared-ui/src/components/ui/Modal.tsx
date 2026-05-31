/**
 * Modal Component - Accessible modal dialog
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Modal
 * 
 * RULES:
 * ✅ ONLY UI modal component - NO business logic
 * ✅ NO auth modal business logic, mutation calls, router redirect
 * ✅ Pure UI component with accessibility
 * ✅ TypeScript strict
 */

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { Button } from './Button';

// ==================== Types ====================

export interface ModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Callback when modal closes */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal description/subtitle */
  description?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to close when overlay is clicked */
  closeOnOverlayClick?: boolean;
  /** Whether to close on Escape key */
  closeOnEscape?: boolean;
  /** Initial focus element selector */
  initialFocus?: string;
  /** Whether to show backdrop */
  showBackdrop?: boolean;
  /** Backdrop blur effect */
  backdropBlur?: boolean;
  /** Animation variant */
  animation?: 'fade' | 'slide' | 'zoom' | 'none';
  /** Modal container element (default: document.body) */
  container?: HTMLElement | null;
  /** Z-index level */
  zIndex?: number;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  /** Whether to show divider */
  withDivider?: boolean;
}

export interface ModalActionsProps {
  /** Confirm handler */
  onConfirm?: () => void;
  /** Cancel handler */
  onCancel?: () => void;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button variant */
  confirmVariant?: 'primary' | 'success' | 'danger';
  /** Whether confirm is loading */
  isLoading?: boolean;
  /** Whether confirm is disabled */
  confirmDisabled?: boolean;
  /** Additional content between buttons */
  extraContent?: React.ReactNode;
}

// ==================== Size Classes ====================

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[90vw]',
  auto: 'max-w-fit',
};

// ==================== Animation Classes ====================

const backdropAnimationClasses = {
  fade: 'animate-in fade-in duration-200',
  slide: 'animate-in slide-in-from-bottom duration-300',
  zoom: 'animate-in zoom-in-95 duration-200',
  none: '',
};

const modalAnimationClasses = {
  fade: 'animate-in fade-in-0 zoom-in-95 duration-200',
  slide: 'animate-in slide-in-from-bottom duration-300',
  zoom: 'animate-in zoom-in-95 duration-200',
  none: '',
};

// ==================== Component ====================

/**
 * Modal - Accessible modal dialog component
 * 
 * @example
 * // Basic modal
 * <Modal isOpen={open} onClose={() => setOpen(false)} title="Modal Title">
 *   <p>Modal content goes here</p>
 *   <ModalActions onConfirm={handleConfirm} onCancel={() => setOpen(false)} />
 * </Modal>
 * 
 * @example
 * // Large modal with custom footer
 * <Modal isOpen={open} onClose={() => setOpen(false)} size="lg" title="Settings">
 *   <div>Settings form</div>
 *   <ModalFooter>
 *     <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button onClick={handleSave}>Save</Button>
 *   </ModalFooter>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  initialFocus,
  showBackdrop = true,
  backdropBlur = true,
  animation = 'fade',
  container,
  zIndex = 50,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const initialFocusRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    // Set focus
    if (initialFocus) {
      const element = document.querySelector(initialFocus) as HTMLElement;
      if (element) {
        element.focus();
        initialFocusRef.current = element;
      }
    } else if (modalRef.current) {
      modalRef.current.focus();
    }

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEscape, initialFocus]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        showBackdrop && 'bg-black/50',
        backdropBlur && 'backdrop-blur-sm',
        backdropAnimationClasses[animation]
      )}
      style={{ zIndex }}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={cn(
          'relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-900',
          sizeClasses[size],
          modalAnimationClasses[animation]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || description || showCloseButton) && (
          <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h2>
              )}
              {description && (
                <p id="modal-description" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );

  const targetContainer = container ?? (typeof document !== 'undefined' ? document.body : null);
  if (!targetContainer) return null;

  return createPortal(modalContent, targetContainer);
};

Modal.displayName = 'Modal';

// ==================== Modal Footer ====================

/**
 * ModalFooter - Footer section for modal actions
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className, withDivider = true }) => {
  return (
    <div
      className={cn(
        'flex justify-end space-x-3 px-6 py-4',
        withDivider && 'border-t border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

ModalFooter.displayName = 'ModalFooter';

// ==================== Modal Actions ====================

/**
 * ModalActions - Pre-configured action buttons for confirm/cancel
 * 
 * @example
 * <ModalActions
 *   onConfirm={handleDelete}
 *   onCancel={() => setOpen(false)}
 *   confirmText="Delete"
 *   confirmVariant="danger"
 *   isLoading={isDeleting}
 * />
 */
export const ModalActions: React.FC<ModalActionsProps> = ({
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  isLoading = false,
  confirmDisabled = false,
  extraContent,
}) => {
  return (
    <ModalFooter>
      <div className="flex flex-1 items-center justify-between">
        {extraContent && <div>{extraContent}</div>}
        <div className="flex space-x-3">
          <Button variant="ghost" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            loading={isLoading}
            disabled={confirmDisabled}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </ModalFooter>
  );
};

ModalActions.displayName = 'ModalActions';

// ==================== ConfirmModal ====================

export interface ConfirmModalProps extends Omit<ModalProps, 'children' | 'title' | 'description' | 'size'> {
  /** Confirmation message */
  message: string;
  /** Title (default: 'Confirm Action') */
  title?: string;
  /** Description text */
  description?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button variant */
  confirmVariant?: 'primary' | 'danger';
  /** Whether confirm is loading */
  isLoading?: boolean;
  /** On confirm handler */
  onConfirm: () => void;
}

/**
 * ConfirmModal - Pre-configured confirmation dialog
 * 
 * @example
 * <ConfirmModal
 *   isOpen={showDeleteConfirm}
 *   onClose={() => setShowDeleteConfirm(false)}
 *   message="Are you sure you want to delete this item?"
 *   title="Delete Item"
 *   confirmText="Delete"
 *   confirmVariant="danger"
 *   onConfirm={handleDelete}
 *   isLoading={isDeleting}
 * />
 */
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  message,
  title = 'Confirm Action',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  isLoading = false,
  onConfirm,
  ...modalProps
}) => {
  const handleConfirm = () => {
    onConfirm();
    // Don't close automatically - let parent close after async operation
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      {...modalProps}
    >
      <p className="text-gray-600 dark:text-gray-300">{message}</p>
      <ModalActions
        onConfirm={handleConfirm}
        onCancel={onClose}
        confirmText={confirmText}
        cancelText={cancelText}
        confirmVariant={confirmVariant}
        isLoading={isLoading}
      />
    </Modal>
  );
};

ConfirmModal.displayName = 'ConfirmModal';
