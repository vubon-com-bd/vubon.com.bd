/**
 * Checkout Constants Index
 * Export all checkout constants and types for easy importing
 */

// Checkout Constants
export {
  CHECKOUT,
  checkoutGetTypeLabel,
  checkoutGetModeLabel,
  checkoutGetStepLabel,
  checkoutGetErrorLabel,
  checkoutIsGuestType,
  checkoutIsRegisteredType,
  checkoutIsExpressType,
  checkoutGetDefaultSessionTimeout,
  checkoutGetDefaultCurrency,
  checkoutIsValidStep,
  checkoutIsValidType,
} from './checkout.constants';

export type {
  CheckoutType,
  CheckoutMode,
  CheckoutStep,
  CheckoutDefault,
  CheckoutLimit,
  CheckoutError,
} from './checkout.constants';

// Checkout Status Constants
export {
  CHECKOUT_STATUS,
  checkoutGetStatusLabel,
  checkoutGetStatusColor,
  checkoutGetStatusCategory,
  checkoutIsActive,
  checkoutIsCompleted,
  checkoutCanTransition,
} from './checkout-status.constants';

export type {
  CheckoutStatusType,
  CheckoutStatusColor,
  CheckoutStatusCategory,
  CheckoutStatusOrder,
  CheckoutStatusTransition,
} from './checkout-status.constants';

// Checkout Step Constants
export {
  CHECKOUT_STEP,
  checkoutstepGetStepLabel,
  checkoutstepGetStepStatusLabel,
  checkoutstepGetStepPosition,
  checkoutstepGetStepIcon,
  checkoutstepIsValidStep,
  checkoutstepIsActive,
  checkoutstepIsCompleted,
  checkoutstepCanProceed,
  checkoutstepIsLocked,
  checkoutstepGetDefaultStep,
} from './checkout-step.constants';

export type {
  CheckoutStepType,
  CheckoutStepStatus,
  CheckoutStepPosition,
  CheckoutStepIcon,
  CheckoutStepDefault,
} from './checkout-step.constants';

// Payment Method Constants
export {
  PAYMENT_METHOD,
  paymentmethodGetMethodLabel,
  paymentmethodGetCategoryLabel,
  paymentmethodGetStatusLabel,
  paymentmethodGetMethodIcon,
  paymentmethodIsCardMethod,
  paymentmethodIsMobileMethod,
  paymentmethodIsCashMethod,
  paymentmethodIsOnlineMethod,
  paymentmethodGetDefaultMethod,
  paymentmethodIsActive,
} from './payment-method.constants';

export type {
  PaymentMethodType,
  PaymentMethodCategory,
  PaymentMethodStatus,
  PaymentMethodIcon,
  PaymentMethodDefault,
  PaymentMethodLimit,
} from './payment-method.constants';

// Payment Status Constants
export {
  PAYMENT_STATUS,
  paymentstatusGetStatusLabel,
  paymentstatusGetStatusColor,
  paymentstatusGetStatusCategory,
  paymentstatusIsCompleted,
  paymentstatusIsFailed,
  paymentstatusIsRefunded,
  paymentstatusIsPending,
  paymentstatusCanTransition,
} from './payment-status.constants';

export type {
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  PaymentStatusOrder,
  PaymentStatusTransition,
} from './payment-status.constants';

// Payment Gateway Constants
export {
  PAYMENT_GATEWAY,
  paymentgatewayGetGatewayLabel,
  paymentgatewayGetCategoryLabel,
  paymentgatewayGetStatusLabel,
  paymentgatewayGetCurrencyLabel,
  paymentgatewayGetFee,
  paymentgatewayIsActive,
  paymentgatewayIsMaintenance,
  paymentgatewayGetDefaultGateway,
  paymentgatewayGetDefaultCurrency,
} from './payment-gateway.constants';

export type {
  PaymentGatewayType,
  PaymentGatewayCategory,
  PaymentGatewayStatus,
  PaymentGatewayCurrency,
  PaymentGatewayFee,
  PaymentGatewayDefault,
  PaymentGatewayLimit,
} from './payment-gateway.constants';

// Transaction Type Constants
export {
  TRANSACTION_TYPE,
  transactiontypeGetTypeLabel,
  transactiontypeGetCategoryLabel,
  transactiontypeGetDirectionLabel,
  transactiontypeIsPayment,
  transactiontypeIsRefund,
  transactiontypeIsAdjustment,
  transactiontypeGetDefaultType,
} from './transaction-type.constants';

export type {
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  TransactionDefault,
} from './transaction-type.constants';

// Transaction Status Constants
export {
  TRANSACTION_STATUS,
  transactionstatusGetStatusLabel,
  transactionstatusGetStatusColor,
  transactionstatusGetStatusCategory,
  transactionstatusIsCompleted,
  transactionstatusIsFailed,
  transactionstatusIsRefunded,
  transactionstatusIsPending,
  transactionstatusCanTransition,
} from './transaction-status.constants';

export type {
  TransactionStatusType,
  TransactionStatusColor,
  TransactionStatusCategory,
  TransactionStatusOrder,
  TransactionStatusTransition,
} from './transaction-status.constants';

// Billing Address Constants
export {
  BILLING_ADDRESS,
  billingaddressGetTypeLabel,
  billingaddressGetStatusLabel,
  billingaddressGetFieldLabel,
  billingaddressIsResidential,
  billingaddressIsCommercial,
  billingaddressIsVerified,
  billingaddressGetDefaultCountry,
  billingaddressGetDefaultCountryCode,
  billingaddressGetDefaultPostalCode,
} from './billing-address.constants';

export type {
  BillingAddressType,
  BillingAddressStatus,
  BillingAddressField,
  BillingAddressDefault,
  BillingAddressLimit,
} from './billing-address.constants';

// Shipping Address Constants
export {
  SHIPPING_ADDRESS,
  shippingaddressGetTypeLabel,
  shippingaddressGetStatusLabel,
  shippingaddressGetFieldLabel,
  shippingaddressIsHome,
  shippingaddressIsOffice,
  shippingaddressIsPickupPoint,
  shippingaddressIsVerified,
  shippingaddressGetDefaultCountry,
  shippingaddressGetDefaultDeliveryTime,
} from './shipping-address.constants';

export type {
  ShippingAddressType,
  ShippingAddressStatus,
  ShippingAddressField,
  ShippingAddressDefault,
  ShippingAddressLimit,
} from './shipping-address.constants';

// Delivery Method Constants
export {
  DELIVERY_METHOD,
  deliverymethodGetMethodLabel,
  deliverymethodGetCategoryLabel,
  deliverymethodGetStatusLabel,
  deliverymethodIsStandard,
  deliverymethodIsExpedited,
  deliverymethodIsPickup,
  deliverymethodIsActive,
  deliverymethodGetDefaultMethod,
  deliverymethodGetDefaultDeliveryTime,
} from './delivery-method.constants';

export type {
  DeliveryMethodType,
  DeliveryCategory,
  DeliveryMethodStatus,
  DeliveryMethodDefault,
  DeliveryMethodLimit,
} from './delivery-method.constants';

// Delivery Status Constants
export {
  DELIVERY_STATUS,
  deliverystatusGetStatusLabel,
  deliverystatusGetStatusColor,
  deliverystatusGetStatusCategory,
  deliverystatusIsDelivered,
  deliverystatusIsInTransit,
  deliverystatusIsFailed,
  deliverystatusIsPending,
  deliverystatusCanTransition,
} from './delivery-status.constants';

export type {
  DeliveryStatusType,
  DeliveryStatusColor,
  DeliveryStatusCategory,
  DeliveryStatusOrder,
  DeliveryStatusTransition,
} from './delivery-status.constants';

// Order Status Constants
export {
  ORDER_STATUS,
  orderstatusGetStatusLabel,
  orderstatusGetStatusColor,
  orderstatusGetStatusCategory,
  orderstatusIsActive,
  orderstatusIsCompleted,
  orderstatusIsCancelled,
  orderstatusIsFailed,
  orderstatusCanTransition,
} from './order-status.constants';

export type {
  OrderStatusType,
  OrderStatusColor,
  OrderStatusCategory,
  OrderStatusOrder,
  OrderStatusTransition,
} from './order-status.constants';

// Order Type Constants
export {
  ORDER_TYPE,
  ordertypeGetTypeLabel,
  ordertypeGetCategoryLabel,
  ordertypeGetPriorityLabel,
  ordertypeIsStandard,
  ordertypeIsPreOrder,
  ordertypeIsWholesale,
  ordertypeIsSubscription,
  ordertypeGetDefaultType,
  ordertypeGetDefaultPriority,
} from './order-type.constants';

export type {
  OrderTypeType,
  OrderCategory,
  OrderPriority,
  OrderTypeDefault,
} from './order-type.constants';

// Checkout Error Constants
export {
  CHECKOUT_ERROR,
  CHECKOUT_ERROR_MESSAGES,
  checkouterrorGetMessage,
  checkouterrorGetSeverityLabel,
  checkouterrorGetSourceLabel,
  checkouterrorIsRetryable,
  checkouterrorIsActionable,
  checkouterrorGetDefaultSeverity,
} from './checkout-error.constants';

export type {
  CheckoutErrorCode,
  CheckoutErrorSeverity,
  CheckoutErrorSource,
  CheckoutErrorDefault,
} from './checkout-error.constants';

// Payment Error Constants
export {
  PAYMENT_ERROR,
  PAYMENT_ERROR_MESSAGES,
  paymenterrorGetMessage,
  paymenterrorGetSeverityLabel,
  paymenterrorGetCategoryLabel,
  paymenterrorIsCardError,
  paymenterrorIsAuthError,
  paymenterrorIsGatewayError,
  paymenterrorIsRetryable,
  paymenterrorIsActionable,
  paymenterrorGetDefaultSeverity,
} from './payment-error.constants';

export type {
  PaymentErrorCode,
  PaymentErrorSeverity,
  PaymentErrorCategory,
  PaymentErrorDefault,
} from './payment-error.constants';
