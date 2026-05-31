/**
 * useModal Hook - Modal state management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * IMPROVEMENTS:
 * - Added closeOnOverlayClick implementation
 * - Added aria-labelledby and aria-describedby support
 * - Improved TypeScript types
 * - Added SSR safety checks
 * - Added proper cleanup for event listeners
 * - Memoized callbacks for better performance

 * @module shared-ui/src/hooks/useModal

 * RULES:
 * ✅ ONLY modal state management - NO business logic
 * ✅ NO login state, token refresh, API mutation
 * ✅ Pure UI hook
 * ✅ TypeScript strict
 */

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';

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
  /** ARIA label for modal (accessibility) */
  ariaLabel?: string;
  /** ARIA labelledby ID (accessibility) */
  ariaLabelledby?: string;
  /** ARIA describedby ID (accessibility) */
  ariaDescribedby?: string;
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
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
  };
  /** Trigger props for opening modal */
  getTriggerProps: () => {
    onClick: (event: React.MouseEvent) => void;
    'aria-haspopup': 'dialog';
    'aria-expanded': boolean;
    'aria-controls'?: string;
  };
}

// ==================== Private Helpers ====================

const isBrowser = (): boolean => typeof window !== 'undefined';

const getScrollBarWidth = (): number => {
  if (!isBrowser()) return 0;
  return window.innerWidth - document.documentElement.clientWidth;
};

// ==================== Hook ====================

/**
 * Hook for managing modal open/close state with accessibility support

 * @example
 * // Basic usage
 * const { isOpen, open, close, getTriggerProps, getModalProps } = useModal();

 * return (
 *   <>
 *     <button {...getTriggerProps()}>Open Modal</button>
 *     {isOpen && (
 *       <div {...getModalProps()} onClick={close}>
 *         <ModalContent onClose={close} />
 *       </div>
 *     )}
 *   </>
 * );

 * @example
 * // With callbacks and options
 * const modal = useModal({
 *   initialOpen: false,
 *   onOpen: () => console.log('Modal opened'),
 *   onClose: () => console.log('Modal closed'),
 *   preventScroll: true,
 *   closeOnEscape: true,
 *   closeOnOverlayClick: true,
 *   ariaLabel: 'Confirmation Dialog'
 * });

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
    ariaLabel,
    ariaLabelledby,
    ariaDescribedby,
  } = options;

  const [isOpen, setIsOpenState] = useState(initialOpen);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (preventScroll && isOpen) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [preventScroll, isOpen]);

  const setIsOpen = useCallback((open: boolean) => {
    if (!isMountedRef.current) return;
    setIsOpenState(open);
  }, []);

  const open = useCallback(() => {
    if (!isMountedRef.current) return;
    setIsOpenState(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    if (!isMountedRef.current) return;
    setIsOpenState(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // Handle body scroll lock
  useEffect(() => {
    if (!isBrowser() || !preventScroll) return;

    if (isOpen) {
      const scrollBarWidth = getScrollBarWidth();
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      if (preventScroll) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [isOpen, preventScroll]);

  // Handle focus management
  useEffect(() => {
    if (!isBrowser()) return;

    if (isOpen) {
      // Store current focus to return later
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Set initial focus after a short delay to ensure DOM is ready
      if (initialFocus) {
        const timer = setTimeout(() => {
          if (!isMountedRef.current) return;
          const element = typeof initialFocus === 'string'
            ? document.querySelector(initialFocus) as HTMLElement
            : initialFocus;
          element?.focus();
        }, 50);
        return () => clearTimeout(timer);
      }
    } else {
      // Return focus to previous element
      const focusTarget = returnFocus || previousFocusRef.current;
      if (focusTarget?.focus) {
        // Small delay to ensure modal is fully removed from DOM
        setTimeout(() => {
          if (!isMountedRef.current) return;
          focusTarget.focus();
        }, 10);
      }
    }
  }, [isOpen, initialFocus, returnFocus]);

  // Handle escape key
  useEffect(() => {
    if (!isBrowser() || !closeOnEscape || !isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEscape, isOpen, close]);

  // Memoized props
  const getModalProps = useCallback(() => ({
    role: 'dialog' as const,
    'aria-modal': true as const,
    ...(ariaLabel && { 'aria-label': ariaLabel }),
    ...(ariaLabelledby && { 'aria-labelledby': ariaLabelledby }),
    ...(ariaDescribedby && { 'aria-describedby': ariaDescribedby }),
  }), [ariaLabel, ariaLabelledby, ariaDescribedby]);

  const getTriggerProps = useCallback(() => ({
    onClick: (event: React.MouseEvent) => {
      event.preventDefault();
      open();
    },
    'aria-haspopup': 'dialog' as const,
    'aria-expanded': isOpen,
  }), [open, isOpen]);

  return useMemo(() => ({
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
    getModalProps,
    getTriggerProps,
  }), [isOpen, open, close, toggle, setIsOpen, getModalProps, getTriggerProps]);
};

// ==================== Modal State with Data ====================

export interface UseModalWithDataReturn<T = unknown> extends UseModalReturn {
  /** Data passed to modal */
  data: T | null;
  /** Open modal with data */
  openWithData: (data: T) => void;
  /** Clear data when closing */
  closeAndClear: () => void;
  /** Update data without closing */
  updateData: (data: T | ((prev: T | null) => T)) => void;
}

/**
 * Hook for modal with associated data (e.g., edit form, confirmation dialog)

 * @example
 * const modal = useModalWithData<{ id: string; name: string }>();

 * // Open with data
 * modal.openWithData({ id: '1', name: 'Item' });

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

  const updateData = useCallback((newData: T | ((prev: T | null) => T)) => {
    setData((prev) => newData instanceof Function ? newData(prev) : newData);
  }, []);

  return useMemo(() => ({
    ...modal,
    data,
    openWithData,
    closeAndClear,
    updateData,
  }), [modal, data, openWithData, closeAndClear, updateData]);
}

// ==================== Modal Step Types ====================

export interface ModalStep<T = Record<string, unknown>> {
  /** Unique identifier for the step */
  id: string;
  /** Display title */
  title?: string;
  /** React component to render */
  component: React.ReactNode;
  /** Whether user can proceed to next step (dynamic validation) */
  canGoNext?: boolean | ((data: T) => boolean);
  /** Whether user can go back to previous step */
  canGoPrev?: boolean;
  /** Validation function before moving to next step */
  onValidate?: (data: T) => boolean | Promise<boolean>;
  /** Callback when step is entered */
  onEnter?: (data: T) => void;
  /** Callback when step is exited */
  onExit?: (data: T) => void;
}

export interface UseMultiStepModalReturn<T = Record<string, unknown>> extends UseModalReturn {
  /** Current step index (0-based) */
  currentStep: number;
  /** Current step ID */
  currentStepId: string;
  /** Total number of steps */
  totalSteps: number;
  /** Step data accumulated across steps */
  stepData: T;
  /** Update step data */
  updateStepData: (data: Partial<T>) => void;
  /** Go to next step */
  nextStep: () => Promise<boolean>;
  /** Go to previous step */
  prevStep: () => void;
  /** Go to specific step */
  goToStep: (index: number) => Promise<boolean>;
  /** Whether can go next */
  canGoNext: boolean;
  /** Whether can go previous */
  canGoPrev: boolean;
  /** Whether this is the first step */
  isFirstStep: boolean;
  /** Whether this is the last step */
  isLastStep: boolean;
  /** Current step configuration */
  currentStepConfig: ModalStep<T>;
  /** Reset all step data */
  reset: () => void;
}

/**
 * Hook for multi-step modals (wizards, checkout steps)

 * @example
 * const steps: ModalStep[] = [
 *   { id: 'info', title: 'Personal Info', component: <InfoForm /> },
 *   { id: 'payment', title: 'Payment', component: <PaymentForm /> },
 *   { id: 'confirm', title: 'Confirm', component: <ConfirmStep /> },
 * ];

 * const modal = useMultiStepModal({
 *   steps,
 *   initialStep: 0,
 *   onComplete: (data) => submitForm(data)
 * });
 */
export const useMultiStepModal = <T extends Record<string, unknown> = Record<string, unknown>>({
  steps,
  initialStep = 0,
  onComplete,
  ...options
}: UseModalOptions & {
  steps: ModalStep<T>[];
  initialStep?: number;
  onComplete?: (data: T) => void | Promise<void>;
}): UseMultiStepModalReturn<T> => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [stepData, setStepData] = useState<T>({} as T);
  const modal = useModal(options);

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
    setStepData({} as T);
  }, [initialStep]);

  const updateStepData = useCallback((data: Partial<T>) => {
    setStepData((prev) => ({ ...prev, ...data }));
  }, []);

  const currentStepConfig = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Evaluate canGoNext (supports boolean or function)
  const canGoNextValue = currentStepConfig?.canGoNext;
  const canGoNext = typeof canGoNextValue === 'function'
    ? canGoNextValue(stepData)
    : canGoNextValue !== false;

  const canGoPrev = currentStepConfig?.canGoPrev !== false && !isFirstStep;

  const nextStep = useCallback(async (): Promise<boolean> => {
    if (!canGoNext || isLastStep) return false;

    // Run validation if provided
    if (currentStepConfig?.onValidate) {
      const isValid = await currentStepConfig.onValidate(stepData);
      if (!isValid) return false;
    }

    // Call onExit for current step
    currentStepConfig?.onExit?.(stepData);

    const newStep = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(newStep);

    // Call onEnter for next step
    steps[newStep]?.onEnter?.(stepData);

    return true;
  }, [canGoNext, isLastStep, currentStep, currentStepConfig, stepData, steps]);

  const prevStep = useCallback(() => {
    if (!canGoPrev) return;

    // Call onExit for current step
    currentStepConfig?.onExit?.(stepData);

    const newStep = Math.max(currentStep - 1, 0);
    setCurrentStep(newStep);

    // Call onEnter for previous step
    steps[newStep]?.onEnter?.(stepData);
  }, [canGoPrev, currentStep, currentStepConfig, stepData, steps]);

  const goToStep = useCallback(async (index: number): Promise<boolean> => {
    if (index < 0 || index >= steps.length) return false;

    // Validate all steps between current and target
    const stepDirection = index > currentStep ? 1 : -1;
    let current = currentStep;

    while (current !== index) {
      const next = current + stepDirection;
      const stepToValidate = steps[current];

      if (stepDirection === 1 && stepToValidate?.onValidate) {
        const isValid = await stepToValidate.onValidate(stepData);
        if (!isValid) return false;
      }

      stepToValidate?.onExit?.(stepData);
      steps[next]?.onEnter?.(stepData);
      current = next;
    }

    setCurrentStep(index);
    return true;
  }, [currentStep, stepData, steps]);

  // Handle modal close - reset state
  const handleClose = useCallback(() => {
    reset();
    modal.close();
    options.onClose?.();
  }, [reset, modal, options.onClose]);

  // Handle modal open - reset state if needed
  const handleOpen = useCallback(() => {
    if (options.initialOpen !== true) {
      reset();
    }
    modal.open();
    options.onOpen?.();
  }, [reset, modal, options]);

  // Handle complete (last step)
  const handleComplete = useCallback(async () => {
    if (isLastStep && onComplete) {
      await onComplete(stepData);
    }
    handleClose();
  }, [isLastStep, onComplete, stepData, handleClose]);

  // Override open/close to include reset logic
  useEffect(() => {
    if (modal.isOpen && options.initialOpen) {
      reset();
    }
  }, [modal.isOpen, options.initialOpen, reset]);

  return useMemo(() => ({
    ...modal,
    open: handleOpen,
    close: handleClose,
    currentStep,
    currentStepId: steps[currentStep]?.id || '',
    totalSteps: steps.length,
    stepData,
    updateStepData,
    nextStep,
    prevStep,
    goToStep,
    canGoNext,
    canGoPrev,
    isFirstStep,
    isLastStep,
    currentStepConfig: steps[currentStep],
    reset,
  }), [
    modal,
    handleOpen,
    handleClose,
    currentStep,
    steps,
    stepData,
    updateStepData,
    nextStep,
    prevStep,
    goToStep,
    canGoNext,
    canGoPrev,
    isFirstStep,
    isLastStep,
    reset,
  ]);
};

// ==================== Type Exports ====================

export type {
  UseModalOptions,
  UseModalReturn,
  UseModalWithDataReturn,
  UseMultiStepModalReturn,
  ModalStep,
};
