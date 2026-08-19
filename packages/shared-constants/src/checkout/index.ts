/**
 * @fileoverview Checkout constants exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Constants
  CHECKOUT_CONFIG,
  CURRENCY_SYMBOLS,
  // Types
  type CheckoutConfig,
  type AllowedCurrency,
  type CurrencySymbol,
} from './checkout.constants';

// Re-export from checkout-status.constants
export {
  // Enums
  CheckoutStatus,
  // Constants
  CHECKOUT_STATUS_META,
  ALLOWED_STATUS_TRANSITIONS,
  // Types
  type CheckoutStatusMeta,
  type AllowedStatusTransitions,
  // Functions
  isStatusTransitionAllowed,
} from './checkout-status.constants';

// Re-export from checkout-step.constants
export {
  // Enums
  CheckoutStep,
  // Constants
  CHECKOUT_STEP_META,
  STEP_ORDER,
  STEP_VALIDATION_MAP,
  STEP_COMPLETION_MAP,
  // Types
  type CheckoutStepMeta,
  type StepOrder,
  type StepValidationMap,
  type StepCompletionMap,
  // Functions
  getNextStep,
  getPreviousStep,
} from './checkout-step.constants';
