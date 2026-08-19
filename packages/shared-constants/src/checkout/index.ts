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

// Re-export from payment-method.constants
export {
  // Enums
  PaymentMethod,
  // Constants
  PAYMENT_METHOD_META,
  PAYMENT_METHOD_ORDER,
  PAYMENT_METHOD_FEE_MAP,
  // Types
  type PaymentMethodMeta,
  type PaymentMethodOrder,
  type PaymentMethodFeeMap,
  // Functions
  getPaymentMethodDisplayName,
  getPaymentMethodFee,
  isPaymentMethodSupportedCurrency,
} from './payment-method.constants';

// Re-export from payment-status.constants
export {
  // Enums
  PaymentStatus,
  // Constants
  PAYMENT_STATUS_META,
  ALLOWED_PAYMENT_STATUS_TRANSITIONS,
  // Types
  type PaymentStatusMeta,
  type PaymentAllowedAction,
  type AllowedPaymentStatusTransitions,
  // Functions
  isPaymentStatusTransitionAllowed,
  isPaymentActionAllowed,
  isRefundable,
} from './payment-status.constants';

// Re-export from payment-gateway.constants
export {
  // Enums
  PaymentGateway,
  GatewayStatus,
  // Constants
  GATEWAY_FEATURES,
  GATEWAY_CONFIG,
  GATEWAY_STATUS,
  // Types
  type GatewayFeature,
  type GatewayConfig,
  type GatewayStatusMap,
  // Functions
  getGatewayConfig,
  getGatewayStatus,
  isGatewayActive,
  getGatewayApiUrl,
  getGatewayTimeout,
  getGatewayRetryAttempts,
  supportsRecurring,
  supportsRefund,
  supportsPartialRefund,
  supportsSubscription,
} from './payment-gateway.constants';

// Re-export from transaction-type.constants
export {
  // Enums
  TransactionType,
  // Constants
  TRANSACTION_TYPE_META,
  // Types
  type TransactionTypeMeta,
  type TransactionAllowedAction,
  // Functions
  getTransactionTypeDescription,
  isTransactionActionAllowed,
} from './transaction-type.constants';

// Re-export from transaction-status.constants
export {
  // Enums
  TransactionStatus,
  // Constants
  TRANSACTION_STATUS_META,
  ALLOWED_TRANSACTION_STATUS_TRANSITIONS,
  // Types
  type TransactionStatusMeta,
  type AllowedTransactionStatusTransitions,
  // Functions
  isTransactionStatusTransitionAllowed,
  getTransactionStatusLabel,
  getTransactionStatusColor,
} from './transaction-status.constants';

// Re-export from billing-address.constants
export {
  // Enums
  BillingAddressField,
  // Constants
  BILLING_ADDRESS_FIELD_META,
  REQUIRED_BILLING_FIELDS,
  BANGLADESH_DISTRICTS,
  BANGLADESH_UPAZILAS,
  // Types
  type BillingAddressFieldMeta,
  type RequiredBillingFields,
  type BangladeshDistrict,
  type BangladeshUpazila,
  // Functions
  isBillingFieldRequired,
  getBillingFieldMaxLength,
  getBillingFieldRegex,
  getBillingFieldLabel,
  getDistrictsByCountry,
  getUpazilasByDistrict,
  isValidBangladeshDistrict,
} from './billing-address.constants';

// Re-export from shipping-address.constants
export {
  // Enums
  ShippingAddressField,
  // Constants
  SHIPPING_ADDRESS_FIELD_META,
  REQUIRED_SHIPPING_FIELDS,
  SHIPPING_FIELDS_DIFFERENT_FROM_BILLING,
  DELIVERY_ZONES,
  COVERAGE_AREAS,
  // Types
  type ShippingAddressFieldMeta,
  type RequiredShippingFields,
  type ShippingFieldsDifferentFromBilling,
  type DeliveryZone,
  type DeliveryZoneCode,
  type CoverageAreas,
  // Functions
  isShippingFieldRequired,
  getShippingFieldMaxLength,
  getShippingFieldRegex,
  getShippingFieldLabel,
  getDeliveryZoneByDistrict,
  getDeliveryCharge,
  getFreeDeliveryMinAmount,
  isAreaCovered,
} from './shipping-address.constants';

// Re-export from delivery-method.constants
export {
  // Enums
  DeliveryMethod,
  // Constants
  DELIVERY_METHOD_META,
  DELIVERY_METHOD_ORDER,
  DELIVERY_METHOD_PRICE_MAP,
  DELIVERY_METHOD_FREE_MIN_AMOUNT,
  // Types
  type DeliveryMethodMeta,
  type DeliveryMethodOrder,
  type DeliveryMethodPriceMap,
  type DeliveryMethodFreeMinAmount,
  // Functions
  getDeliveryMethodName,
  getDeliveryMethodDescription,
  getDeliveryMethodIcon,
  getDeliveryMethodCharge,
  getDeliveryMethodTime,
  getDeliveryMethodFreeMinAmount,
  isDeliveryMethodAvailable,
  isFreeDeliveryEligible,
  calculateDeliveryCharge,
} from './delivery-method.constants';

// Re-export from delivery-status.constants
export {
  // Enums
  DeliveryStatus,
  // Constants
  DELIVERY_STATUS_META,
  ALLOWED_DELIVERY_STATUS_TRANSITIONS,
  TRACKING_STATUS_UPDATE_TIMES,
  DELIVERY_COMPLETION_CONDITIONS,
  // Types
  type DeliveryStatusMeta,
  type AllowedDeliveryStatusTransitions,
  type TrackingStatusUpdateTimes,
  type DeliveryCompletionConditions,
  // Functions
  getDeliveryStatusLabel,
  getDeliveryStatusColor,
  getDeliveryStatusDescription,
  getTrackingStatus,
  getTrackingUpdateTime,
  getCompletionCondition,
  isDeliveryComplete,
  isDeliveryFailed,
  isDeliveryInProgress,
} from './delivery-status.constants';

// Re-export from order-status.constants
export {
  // Enums
  OrderStatus,
  // Constants
  ORDER_STATUS_META,
  ALLOWED_ORDER_STATUS_TRANSITIONS,
  ORDER_STATUS_ORDER,
  // Types
  type OrderStatusMeta,
  type OrderAllowedAction,
  type AllowedOrderStatusTransitions,
  type OrderStatusOrder,
  // Functions
  getOrderStatusLabel,
  getOrderStatusColor,
  getOrderStatusDescription,
  getOrderStatusIcon,
  getOrderStatusPriority,
  isOrderStatusTransitionAllowed,
  isOrderActionAllowed,
  isOrderComplete,
  isOrderActive,
  canCancelOrder,
  canReturnOrder,
  canRefundOrder,
} from './order-status.constants';

// Re-export from order-type.constants
export {
  // Enums
  OrderType,
  // Constants
  ORDER_TYPE_META,
  ORDER_TYPE_ORDER,
  // Types
  type OrderTypeMeta,
  type OrderTypeFeatures,
  type OrderTypeOrder,
  // Functions
  getOrderTypeDescription,
  getOrderTypeIcon,
  getOrderTypeFeatures,
  getOrderTypeDeliveryTime,
  getOrderTypeMinimumQuantity,
  isImmediateDelivery,
  requiresPrePayment,
  isDiscountEligible,
  isReturnEligible,
  isSubscriptionEligible,
  getOrderTypeByQuantity,
} from './order-type.constants';

// Re-export from checkout-error.constants
export {
  // Enums
  CheckoutErrorCode,
  // Constants
  CHECKOUT_ERROR_META,
  // Types
  type CheckoutErrorMeta,
  type CheckoutErrorCategory,
  // Functions
  getCheckoutErrorMessage,
  getUserFriendlyMessage,
  getCheckoutErrorCategory,
  getCheckoutRecoveryAction,
  getCheckoutErrorStatusCode,
  isClientError,
  isServerError,
} from './checkout-error.constants';

// Re-export from payment-error.constants
export {
  // Enums
  PaymentErrorCode,
  // Constants
  PAYMENT_ERROR_META,
  // Types
  type PaymentErrorMeta,
  type PaymentErrorCategory,
  // Functions
  getPaymentErrorMessage,
  getPaymentUserFriendlyMessage,
  getPaymentGatewayCodes,
  getPaymentRecoveryAction,
  getPaymentErrorStatusCode,
  getPaymentErrorCategory,
  isPaymentErrorRetryable,
  isPaymentClientError,
  isPaymentServerError,
  isPaymentNetworkError,
  getGatewayErrorCode,
} from './payment-error.constants';
