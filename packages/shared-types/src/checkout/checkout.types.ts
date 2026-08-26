/**
 * Checkout Types
 * Type definitions for checkout module based on shared-constants
 * @module CheckoutTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Checkout Core
  CHECKOUT,
  CheckoutType,
  CheckoutMode,
  CheckoutStep,
  CheckoutDefault,
  CheckoutLimit,
  CheckoutError,
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
  // Checkout Status
  CHECKOUT_STATUS,
  CheckoutStatusType,
  CheckoutStatusColor,
  CheckoutStatusCategory,
  CheckoutStatusOrder,
  CheckoutStatusTransition,
  checkoutGetStatusLabel,
  checkoutGetStatusColor,
  checkoutGetStatusCategory,
  checkoutIsActive,
  checkoutIsCompleted,
  checkoutCanTransition,
  // Checkout Step
  CHECKOUT_STEP,
  CheckoutStepType,
  CheckoutStepStatus,
  CheckoutStepPosition,
  CheckoutStepIcon,
  CheckoutStepDefault,
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
  // Payment Method
  PAYMENT_METHOD,
  PaymentMethodType,
  PaymentMethodCategory,
  PaymentMethodStatus,
  PaymentMethodIcon,
  PaymentMethodDefault,
  PaymentMethodLimit,
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
  // Payment Status
  PAYMENT_STATUS,
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  PaymentStatusOrder,
  PaymentStatusTransition,
  paymentstatusGetStatusLabel,
  paymentstatusGetStatusColor,
  paymentstatusGetStatusCategory,
  paymentstatusIsCompleted,
  paymentstatusIsFailed,
  paymentstatusIsRefunded,
  paymentstatusIsPending,
  paymentstatusCanTransition,
  // Payment Gateway
  PAYMENT_GATEWAY,
  PaymentGatewayType,
  PaymentGatewayCategory,
  PaymentGatewayStatus,
  PaymentGatewayCurrency,
  PaymentGatewayFee,
  PaymentGatewayDefault,
  PaymentGatewayLimit,
  paymentgatewayGetGatewayLabel,
  paymentgatewayGetCategoryLabel,
  paymentgatewayGetStatusLabel,
  paymentgatewayGetCurrencyLabel,
  paymentgatewayGetFee,
  paymentgatewayIsActive,
  paymentgatewayIsMaintenance,
  paymentgatewayGetDefaultGateway,
  paymentgatewayGetDefaultCurrency,
  // Transaction Type
  TRANSACTION_TYPE,
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  TransactionDefault,
  transactiontypeGetTypeLabel,
  transactiontypeGetCategoryLabel,
  transactiontypeGetDirectionLabel,
  transactiontypeIsPayment,
  transactiontypeIsRefund,
  transactiontypeIsAdjustment,
  transactiontypeGetDefaultType,
  // Transaction Status
  TRANSACTION_STATUS,
  TransactionStatusType,
  TransactionStatusColor,
  TransactionStatusCategory,
  TransactionStatusOrder,
  TransactionStatusTransition,
  transactionstatusGetStatusLabel,
  transactionstatusGetStatusColor,
  transactionstatusGetStatusCategory,
  transactionstatusIsCompleted,
  transactionstatusIsFailed,
  transactionstatusIsRefunded,
  transactionstatusIsPending,
  transactionstatusCanTransition,
  // Billing Address
  BILLING_ADDRESS,
  BillingAddressType,
  BillingAddressStatus,
  BillingAddressField,
  BillingAddressDefault,
  BillingAddressLimit,
  billingaddressGetTypeLabel,
  billingaddressGetStatusLabel,
  billingaddressGetFieldLabel,
  billingaddressIsResidential,
  billingaddressIsCommercial,
  billingaddressIsVerified,
  billingaddressGetDefaultCountry,
  billingaddressGetDefaultCountryCode,
  billingaddressGetDefaultPostalCode,
  // Shipping Address
  SHIPPING_ADDRESS,
  ShippingAddressType,
  ShippingAddressStatus,
  ShippingAddressField,
  ShippingAddressDefault,
  ShippingAddressLimit,
  shippingaddressGetTypeLabel,
  shippingaddressGetStatusLabel,
  shippingaddressGetFieldLabel,
  shippingaddressIsHome,
  shippingaddressIsOffice,
  shippingaddressIsPickupPoint,
  shippingaddressIsVerified,
  shippingaddressGetDefaultCountry,
  shippingaddressGetDefaultDeliveryTime,
  // Delivery Method
  DELIVERY_METHOD,
  DeliveryMethodType,
  DeliveryCategory,
  DeliveryMethodStatus,
  DeliveryMethodDefault,
  DeliveryMethodLimit,
  deliverymethodGetMethodLabel,
  deliverymethodGetCategoryLabel,
  deliverymethodGetStatusLabel,
  deliverymethodIsStandard,
  deliverymethodIsExpedited,
  deliverymethodIsPickup,
  deliverymethodIsActive,
  deliverymethodGetDefaultMethod,
  deliverymethodGetDefaultDeliveryTime,
  // Delivery Status
  DELIVERY_STATUS,
  DeliveryStatusType,
  DeliveryStatusColor,
  DeliveryStatusCategory,
  DeliveryStatusOrder,
  DeliveryStatusTransition,
  deliverystatusGetStatusLabel,
  deliverystatusGetStatusColor,
  deliverystatusGetStatusCategory,
  deliverystatusIsDelivered,
  deliverystatusIsInTransit,
  deliverystatusIsFailed,
  deliverystatusIsPending,
  deliverystatusCanTransition,
  // Order Status
  ORDER_STATUS,
  OrderStatusType,
  OrderStatusColor,
  OrderStatusCategory,
  OrderStatusOrder,
  OrderStatusTransition,
  orderstatusGetStatusLabel,
  orderstatusGetStatusColor,
  orderstatusGetStatusCategory,
  orderstatusIsActive,
  orderstatusIsCompleted,
  orderstatusIsCancelled,
  orderstatusIsFailed,
  orderstatusCanTransition,
  // Order Type
  ORDER_TYPE,
  OrderTypeType,
  OrderCategory,
  OrderPriority,
  OrderTypeDefault,
  ordertypeGetTypeLabel,
  ordertypeGetCategoryLabel,
  ordertypeGetPriorityLabel,
  ordertypeIsStandard,
  ordertypeIsPreOrder,
  ordertypeIsWholesale,
  ordertypeIsSubscription,
  ordertypeGetDefaultType,
  ordertypeGetDefaultPriority,
  // Checkout Error
  CHECKOUT_ERROR,
  CHECKOUT_ERROR_MESSAGES,
  CheckoutErrorCode,
  CheckoutErrorSeverity,
  CheckoutErrorSource,
  CheckoutErrorDefault,
  checkouterrorGetMessage,
  checkouterrorGetSeverityLabel,
  checkouterrorGetSourceLabel,
  checkouterrorIsRetryable,
  checkouterrorIsActionable,
  checkouterrorGetDefaultSeverity,
  // Payment Error
  PAYMENT_ERROR,
  PAYMENT_ERROR_MESSAGES,
  PaymentErrorCode,
  PaymentErrorSeverity,
  PaymentErrorCategory,
  PaymentErrorDefault,
  paymenterrorGetMessage,
  paymenterrorGetSeverityLabel,
  paymenterrorGetCategoryLabel,
  paymenterrorIsCardError,
  paymenterrorIsAuthError,
  paymenterrorIsGatewayError,
  paymenterrorIsRetryable,
  paymenterrorIsActionable,
  paymenterrorGetDefaultSeverity,
} from '@vubon/shared-constants';

// ============================================================
// Checkout Extended Types
// ============================================================

/**
 * Checkout session
 */
export interface CheckoutSession extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: CheckoutType;
  mode: CheckoutMode;
  status: CheckoutStatusType;
  step: CheckoutStepType;
  currency: string;
  sessionTimeout: number;
  isGuest: boolean;
  isRegistered: boolean;
  isExpress: boolean;
  isActive: boolean;
  isCompleted: boolean;
  metadata?: Metadata;
}

/**
 * Checkout filter
 */
export interface CheckoutFilter {
  userIds?: ID[];
  types?: CheckoutType[];
  modes?: CheckoutMode[];
  statuses?: CheckoutStatusType[];
  steps?: CheckoutStepType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isGuest?: boolean;
  isRegistered?: boolean;
  isExpress?: boolean;
  searchTerm?: string;
}

/**
 * Checkout statistics
 */
export interface CheckoutStatistics {
  totalCheckouts: number;
  activeCheckouts: number;
  completedCheckouts: number;
  byType: Record<CheckoutType, number>;
  byMode: Record<CheckoutMode, number>;
  byStatus: Record<CheckoutStatusType, number>;
  byStep: Record<CheckoutStepType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCompletionTime: number;
  conversionRate: number;
  abandonmentRate: number;
  mostFrequentType: CheckoutType;
  mostFrequentStep: CheckoutStepType;
}

/**
 * Checkout summary
 */
export interface CheckoutSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  byType: Record<CheckoutType, number>;
  byMode: Record<CheckoutMode, number>;
  byStatus: Record<CheckoutStatusType, number>;
  byStep: Record<CheckoutStepType, number>;
  checkoutTrend: {
    date: Date;
    total: number;
    completed: number;
  }[];
  topTypes: {
    type: CheckoutType;
    count: number;
    label: string;
  }[];
  topSteps: {
    step: CheckoutStepType;
    count: number;
    label: string;
  }[];
}

/**
 * Checkout configuration
 */
export interface CheckoutConfiguration {
  enabled: boolean;
  defaultType: CheckoutType;
  defaultMode: CheckoutMode;
  defaultCurrency: string;
  sessionTimeout: number;
  allowGuestCheckout: boolean;
  allowExpressCheckout: boolean;
  requireShipping: boolean;
  requireBilling: boolean;
  requirePayment: boolean;
  notificationOnComplete: boolean;
  notificationOnAbandon: boolean;
  notificationOnError: boolean;
  alertConfig?: CheckoutAlertConfig;
}

/**
 * Checkout alert configuration
 */
export interface CheckoutAlertConfig {
  enabled: boolean;
  abandonmentAlert: boolean;
  abandonmentThreshold: number;
  sessionTimeoutAlert: boolean;
  paymentErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Checkout history
 */
export interface CheckoutHistory extends BaseEntity, Timestamp {
  id: ID;
  checkoutId: ID;
  userId: ID;
  action: 'create' | 'update' | 'step_change' | 'complete' | 'abandon' | 'expire';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Checkout step transition
 */
export interface CheckoutStepTransition {
  from: CheckoutStepType;
  to: CheckoutStepType;
  isValid: boolean;
  canProceed: boolean;
  isLocked: boolean;
  requiredFields: string[];
}

/**
 * Checkout payment
 */
export interface CheckoutPayment extends BaseEntity, Timestamp {
  id: ID;
  checkoutId: ID;
  userId: ID;
  method: PaymentMethodType;
  gateway: PaymentGatewayType;
  status: PaymentStatusType;
  amount: number;
  currency: string;
  transactionId?: string;
  gatewayReference?: string;
  metadata?: Metadata;
}

/**
 * Checkout shipping
 */
export interface CheckoutShipping extends BaseEntity, Timestamp {
  id: ID;
  checkoutId: ID;
  userId: ID;
  address: Address;
  method: DeliveryMethodType;
  status: DeliveryStatusType;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  metadata?: Metadata;
}

/**
 * Checkout export
 */
export interface CheckoutExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: CheckoutFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Checkout Core
  CHECKOUT,
  CheckoutType,
  CheckoutMode,
  CheckoutStep,
  CheckoutDefault,
  CheckoutLimit,
  CheckoutError,
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
  // Checkout Status
  CHECKOUT_STATUS,
  CheckoutStatusType,
  CheckoutStatusColor,
  CheckoutStatusCategory,
  CheckoutStatusOrder,
  CheckoutStatusTransition,
  checkoutGetStatusLabel,
  checkoutGetStatusColor,
  checkoutGetStatusCategory,
  checkoutIsActive,
  checkoutIsCompleted,
  checkoutCanTransition,
  // Checkout Step
  CHECKOUT_STEP,
  CheckoutStepType,
  CheckoutStepStatus,
  CheckoutStepPosition,
  CheckoutStepIcon,
  CheckoutStepDefault,
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
  // Payment Method
  PAYMENT_METHOD,
  PaymentMethodType,
  PaymentMethodCategory,
  PaymentMethodStatus,
  PaymentMethodIcon,
  PaymentMethodDefault,
  PaymentMethodLimit,
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
  // Payment Status
  PAYMENT_STATUS,
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  PaymentStatusOrder,
  PaymentStatusTransition,
  paymentstatusGetStatusLabel,
  paymentstatusGetStatusColor,
  paymentstatusGetStatusCategory,
  paymentstatusIsCompleted,
  paymentstatusIsFailed,
  paymentstatusIsRefunded,
  paymentstatusIsPending,
  paymentstatusCanTransition,
  // Payment Gateway
  PAYMENT_GATEWAY,
  PaymentGatewayType,
  PaymentGatewayCategory,
  PaymentGatewayStatus,
  PaymentGatewayCurrency,
  PaymentGatewayFee,
  PaymentGatewayDefault,
  PaymentGatewayLimit,
  paymentgatewayGetGatewayLabel,
  paymentgatewayGetCategoryLabel,
  paymentgatewayGetStatusLabel,
  paymentgatewayGetCurrencyLabel,
  paymentgatewayGetFee,
  paymentgatewayIsActive,
  paymentgatewayIsMaintenance,
  paymentgatewayGetDefaultGateway,
  paymentgatewayGetDefaultCurrency,
  // Transaction Type
  TRANSACTION_TYPE,
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  TransactionDefault,
  transactiontypeGetTypeLabel,
  transactiontypeGetCategoryLabel,
  transactiontypeGetDirectionLabel,
  transactiontypeIsPayment,
  transactiontypeIsRefund,
  transactiontypeIsAdjustment,
  transactiontypeGetDefaultType,
  // Transaction Status
  TRANSACTION_STATUS,
  TransactionStatusType,
  TransactionStatusColor,
  TransactionStatusCategory,
  TransactionStatusOrder,
  TransactionStatusTransition,
  transactionstatusGetStatusLabel,
  transactionstatusGetStatusColor,
  transactionstatusGetStatusCategory,
  transactionstatusIsCompleted,
  transactionstatusIsFailed,
  transactionstatusIsRefunded,
  transactionstatusIsPending,
  transactionstatusCanTransition,
  // Billing Address
  BILLING_ADDRESS,
  BillingAddressType,
  BillingAddressStatus,
  BillingAddressField,
  BillingAddressDefault,
  BillingAddressLimit,
  billingaddressGetTypeLabel,
  billingaddressGetStatusLabel,
  billingaddressGetFieldLabel,
  billingaddressIsResidential,
  billingaddressIsCommercial,
  billingaddressIsVerified,
  billingaddressGetDefaultCountry,
  billingaddressGetDefaultCountryCode,
  billingaddressGetDefaultPostalCode,
  // Shipping Address
  SHIPPING_ADDRESS,
  ShippingAddressType,
  ShippingAddressStatus,
  ShippingAddressField,
  ShippingAddressDefault,
  ShippingAddressLimit,
  shippingaddressGetTypeLabel,
  shippingaddressGetStatusLabel,
  shippingaddressGetFieldLabel,
  shippingaddressIsHome,
  shippingaddressIsOffice,
  shippingaddressIsPickupPoint,
  shippingaddressIsVerified,
  shippingaddressGetDefaultCountry,
  shippingaddressGetDefaultDeliveryTime,
  // Delivery Method
  DELIVERY_METHOD,
  DeliveryMethodType,
  DeliveryCategory,
  DeliveryMethodStatus,
  DeliveryMethodDefault,
  DeliveryMethodLimit,
  deliverymethodGetMethodLabel,
  deliverymethodGetCategoryLabel,
  deliverymethodGetStatusLabel,
  deliverymethodIsStandard,
  deliverymethodIsExpedited,
  deliverymethodIsPickup,
  deliverymethodIsActive,
  deliverymethodGetDefaultMethod,
  deliverymethodGetDefaultDeliveryTime,
  // Delivery Status
  DELIVERY_STATUS,
  DeliveryStatusType,
  DeliveryStatusColor,
  DeliveryStatusCategory,
  DeliveryStatusOrder,
  DeliveryStatusTransition,
  deliverystatusGetStatusLabel,
  deliverystatusGetStatusColor,
  deliverystatusGetStatusCategory,
  deliverystatusIsDelivered,
  deliverystatusIsInTransit,
  deliverystatusIsFailed,
  deliverystatusIsPending,
  deliverystatusCanTransition,
  // Order Status
  ORDER_STATUS,
  OrderStatusType,
  OrderStatusColor,
  OrderStatusCategory,
  OrderStatusOrder,
  OrderStatusTransition,
  orderstatusGetStatusLabel,
  orderstatusGetStatusColor,
  orderstatusGetStatusCategory,
  orderstatusIsActive,
  orderstatusIsCompleted,
  orderstatusIsCancelled,
  orderstatusIsFailed,
  orderstatusCanTransition,
  // Order Type
  ORDER_TYPE,
  OrderTypeType,
  OrderCategory,
  OrderPriority,
  OrderTypeDefault,
  ordertypeGetTypeLabel,
  ordertypeGetCategoryLabel,
  ordertypeGetPriorityLabel,
  ordertypeIsStandard,
  ordertypeIsPreOrder,
  ordertypeIsWholesale,
  ordertypeIsSubscription,
  ordertypeGetDefaultType,
  ordertypeGetDefaultPriority,
  // Checkout Error
  CHECKOUT_ERROR,
  CHECKOUT_ERROR_MESSAGES,
  CheckoutErrorCode,
  CheckoutErrorSeverity,
  CheckoutErrorSource,
  CheckoutErrorDefault,
  checkouterrorGetMessage,
  checkouterrorGetSeverityLabel,
  checkouterrorGetSourceLabel,
  checkouterrorIsRetryable,
  checkouterrorIsActionable,
  checkouterrorGetDefaultSeverity,
  // Payment Error
  PAYMENT_ERROR,
  PAYMENT_ERROR_MESSAGES,
  PaymentErrorCode,
  PaymentErrorSeverity,
  PaymentErrorCategory,
  PaymentErrorDefault,
  paymenterrorGetMessage,
  paymenterrorGetSeverityLabel,
  paymenterrorGetCategoryLabel,
  paymenterrorIsCardError,
  paymenterrorIsAuthError,
  paymenterrorIsGatewayError,
  paymenterrorIsRetryable,
  paymenterrorIsActionable,
  paymenterrorGetDefaultSeverity,
};
