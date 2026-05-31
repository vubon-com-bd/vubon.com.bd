/**
 * useModal Hook - Modal state management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/hooks/useModal
 * 
 * RULES:
 * ✅ ONLY modal state management - NO business logic
 * ✅ NO login state, token refresh, API mutation
 * ✅ Pure UI hook
 * ✅ TypeScript strict
 */

import { useState, useCallback, useEffect } from 'react';

// ==================== Types ====================

export interface UseModalOptions {
  /** Initial open state (default: false) */
  initialOpen?: boolean;
  /** Callback when modal opens */
  onOpen?: () => void;
  /** Callback when modal closes */
  onClose?: () => void;
  /** Whether to close on escape key (default: true) */
  closeOnEscape?: boolean;
  /** Whether to close on overlay click (default: true) */
  closeOnOverlayClick?: boolean;
  /** Prevent body scroll when modal is open (default: true) */
  preventScroll?: boolean;
  /** Focus element when modal opens */
  initialFocus?: string | HTMLElement;
  /** Element to focus when modal closes */
  returnFocus?: HTMLElement;
}

export interface UseModalReturn {
  /** Whether modal is open */
  isOpen: boolean;
  /** Open the modal */
  open: () => void;
  /** Close the modal */
  close: () => void;
  /** Toggle modal state */
  toggle: () => void;
  /** Set modal open state directly */
  setIsOpen: (open: boolean) => void;
  /** Modal props for accessibility */
  getModalProps: () => {
    role: 'dialog';
    'aria-modal': true;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
  };
  /** Trigger props for opening modal */
  getTriggerProps: () => {
    onClick: () => void;
    'aria-haspopup': 'dialog';
    'aria-expanded': boolean;
  };
}

// ==================== Hook ====================

/**
 * Hook for managing modal open/close state with accessibility support
 * 
 * @example
 * // Basic usage
 * const { isOpen, open, close } = useModal();
 * 
 * return (
 *   <>
 *     <button {...getTriggerProps()}>Open Modal</button>
 *     <Modal isOpen={isOpen} onClose={close}>
 *       <ModalContent />
 *     </Modal>
 *   </>
 * );
 * 
 * @example
 * // With callbacks and options
 * const modal = useModal({
 *   initialOpen: false,
 *   onOpen: () => console.log('Modal opened'),
 *   onClose: () => console.log('Modal closed'),
 *   preventScroll: true,
 *   closeOnEscape: true
 * });
 * 
 * @example
 * // With focus management
 * const modal = useModal({
 *   initialFocus: '#confirm-button',
 *   returnFocus: document.querySelector('#open-button')
 * });
 */
export const useModal = (options: UseModalOptions = {}): UseModalReturn => {
  const {
    initialOpen = false,
    onOpen,
    onClose,
    closeOnEscape = true,
    closeOnOverlayClick = true,
    preventScroll = true,
    initialFocus,
    returnFocus,
  } = options;

  const [isOpen, setIsOpen] = useState(initialOpen);
  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);

  // Handle body scroll lock
  useEffect(() => {
    if (!preventScroll) return;

    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, preventScroll]);

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      // Store current focus to return later
      setPreviousFocus(document.activeElement as HTMLElement);

      // Set initial focus
      if (initialFocus) {
        setTimeout(() => {
          const element = typeof initialFocus === 'string'
            ? document.querySelector(initialFocus) as HTMLElement
            : initialFocus;
          element?.focus();
        }, 50);
      }
    } else if (returnFocus && previousFocus) {
      // Return focus to previous element
      previousFocus.focus();
    } else if (!returnFocus && previousFocus && previousFocus.focus) {
      previousFocus.focus();
    }
  }, [isOpen, initialFocus, returnFocus, previousFocus]);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEscape, isOpen, close]);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const setOpen = useCallback((openState: boolean) => {
    if (openState) {
      open();
    } else {
      close();
    }
  }, [open, close]);

  const getModalProps = useCallback(() => ({
    role: 'dialog' as const,
    'aria-modal': true as const,
  }), []);

  const getTriggerProps = useCallback(() => ({
    onClick: open,
    'aria-haspopup': 'dialog' as const,
    'aria-expanded': isOpen,
  }), [open, isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen: setOpen,
    getModalProps,
    getTriggerProps,
  };
};

// ==================== Modal State with Data ====================

export interface UseModalWithDataReturn<T = unknown> extends UseModalReturn {
  /** Data passed to modal */
  data: T | null;
  /** Open modal with data */
  openWithData: (data: T) => void;
  /** Clear data when closing */
  closeAndClear: () => void;
}

/**
 * Hook for modal with associated data (e.g., edit form, confirmation dialog)
 * 
 * @example
 * const modal = useModalWithData<{ id: string; name: string }>();
 * 
 * // Open with data
 * modal.openWithData({ id: '1', name: 'Item' });
 * 
 * // Access data in modal
 * {modal.data?.name}
 */
export function useModalWithData<T = unknown>(options?: UseModalOptions): UseModalWithDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const modal = useModal(options);

  const openWithData = useCallback((newData: T) => {
    setData(newData);
    modal.open();
  }, [modal]);

  const closeAndClear = useCallback(() => {
    modal.close();
    setData(null);
  }, [modal]);

  return {
    ...modal,
    data,
    openWithData,
    closeAndClear,
  };
}

// ==================== Modal Multi-Step ====================

export interface ModalStep {
  id: string;
  title?: string;
  component: React.ReactNode;
  canGoNext?: boolean;
  canGoPrev?: boolean;
}

export interface UseMultiStepModalReturn extends UseModalReturn {
  /** Current step index */
  currentStep: number;
  /** Current step ID */
  currentStepId: string;
  /** Total number of steps */
  totalSteps: number;
  /** Go to next step */
  nextStep: () => void;
  /** Go to previous step */
  prevStep: () => void;
  /** Go to specific step */
  goToStep: (index: number) => void;
  /** Whether can go next */
  canGoNext: boolean;
  /** Whether can go previous */
  canGoPrev: boolean;
  /** Whether this is the first step */
  isFirstStep: boolean;
  /** Whether this is the last step */
  isLastStep: boolean;
  /** Current step data */
  currentStepData: ModalStep;
}

/**
 * Hook for multi-step modals (wizards, checkout steps)
 * 
 * @example
 * const steps: ModalStep[] = [
 *   { id: 'info', title: 'Personal Info', component: <InfoForm /> },
 *   { id: 'payment', title: 'Payment', component: <PaymentForm /> },
 *   { id: 'confirm', title: 'Confirm', component: <ConfirmStep /> },
 * ];
 * 
 * const modal = useMultiStepModal({ steps });
 */
export const useMultiStepModal = ({
  steps,
  initialStep = 0,
  ...options
}: UseModalOptions & {
  steps: ModalStep[];
  initialStep?: number;
}): UseMultiStepModalReturn => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const modal = useModal(options);

  const canGoNext = steps[currentStep]?.canGoNext !== false;
  const canGoPrev = steps[currentStep]?.canGoPrev !== false && currentStep > 0;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const nextStep = useCallback(() => {
    if (canGoNext && !isLastStep) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [canGoNext, isLastStep, steps.length]);

  const prevStep = useCallback(() => {
    if (canGoPrev && !isFirstStep) {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }
  }, [canGoPrev, isFirstStep]);

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
    }
  }, [steps.length]);

  // Reset to initial step when modal closes
  const handleClose = useCallback(() => {
    setCurrentStep(initialStep);
    modal.close();
    options.onClose?.();
  }, [initialStep, modal, options.onClose]);

  return {
    ...modal,
    close: handleClose,
    currentStep,
    currentStepId: steps[currentStep]?.id || '',
    totalSteps: steps.length,
    nextStep,
    prevStep,
    goToStep,
    canGoNext,
    canGoPrev,
    isFirstStep,
    isLastStep,
    currentStepData: steps[currentStep],
  };
};

// ==================== Type Exports ====================

export type { UseModalOptions, UseModalReturn, UseModalWithDataReturn, UseMultiStepModalReturn, ModalStep };
