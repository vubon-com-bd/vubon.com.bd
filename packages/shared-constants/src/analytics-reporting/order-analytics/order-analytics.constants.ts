/**
 * @fileoverview Order analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Order status for tracking
 */
export enum OrderStatus {
  /** Order created but not confirmed */
  PENDING = 'PENDING',
  /** Order confirmed and processing */
  CONFIRMED = 'CONFIRMED',
  /** Order being prepared */
  PROCESSING = 'PROCESSING',
  /** Order ready for shipment */
  READY_TO_SHIP = 'READY_TO_SHIP',
  /** Order shipped */
  SHIPPED = 'SHIPPED',
  /** Order in transit */
  IN_TRANSIT = 'IN_TRANSIT',
  /** Order delivered */
  DELIVERED = 'DELIVERED',
  /** Order completed */
  COMPLETED = 'COMPLETED',
  /** Order cancelled */
  CANCELLED = 'CANCELLED',
  /** Order returned */
  RETURNED = 'RETURNED',
  /** Order refunded */
  REFUNDED = 'REFUNDED',
  /** Order on hold */
  ON_HOLD = 'ON_HOLD',
  /** Order failed */
  FAILED = 'FAILED',
}

/**
 * Order processing timelines
 */
export interface OrderProcessingTimeline {
  /** Order creation to confirmation time in minutes */
  confirmationTimeMinutes: number;
  /** Order confirmation to processing time in minutes */
  processingStartTimeMinutes: number;
  /** Order processing to ready to ship time in minutes */
  readyToShipTimeMinutes: number;
  /** Order ready to ship to shipped time in minutes */
  shippingTimeMinutes: number;
  /** Order shipped to delivered time in minutes */
  deliveryTimeMinutes: number;
  /** Order delivered to completed time in minutes */
  completionTimeMinutes: number;
}

export const DEFAULT_ORDER_PROCESSING_TIMELINE: OrderProcessingTimeline = {
  confirmationTimeMinutes: 5,
  processingStartTimeMinutes: 10,
  readyToShipTimeMinutes: 15,
  shippingTimeMinutes: 30,
  deliveryTimeMinutes: 120,
  completionTimeMinutes: 5,
};

/**
 * Order cancellation policy
 */
export interface OrderCancellationPolicy {
  /** Allow cancellation before shipping */
  allowBeforeShipping: boolean;
  /** Allow cancellation after shipping but before delivery */
  allowAfterShipping: boolean;
  /** Cancellation fee percentage */
  cancellationFeePercentage: number;
  /** Cancellation window in minutes */
  cancellationWindowMinutes: number;
  /** Auto-cancel orders after inactivity in minutes */
  autoCancelAfterMinutes: number;
  /** Require reason for cancellation */
  requireReason: boolean;
}

export const DEFAULT_ORDER_CANCELLATION_POLICY: OrderCancellationPolicy = {
  allowBeforeShipping: true,
  allowAfterShipping: false,
  cancellationFeePercentage: 5,
  cancellationWindowMinutes: 60,
  autoCancelAfterMinutes: 120,
  requireReason: true,
};

/**
 * Order return policy
 */
export interface OrderReturnPolicy {
  /** Return window in days */
  returnWindowDays: number;
  /** Free return period in days */
  freeReturnDays: number;
  /** Restocking fee percentage */
  restockingFeePercentage: number;
  /** Allow partial returns */
  allowPartialReturns: boolean;
  /** Require reason for return */
  requireReason: boolean;
  /** Require return approval */
  requireApproval: boolean;
  /** Return shipping paid by */
  returnShippingPaidBy: 'CUSTOMER' | 'SELLER' | 'SHARED';
}

export const DEFAULT_ORDER_RETURN_POLICY: OrderReturnPolicy = {
  returnWindowDays: 30,
  freeReturnDays: 14,
  restockingFeePercentage: 10,
  allowPartialReturns: true,
  requireReason: true,
  requireApproval: true,
  returnShippingPaidBy: 'CUSTOMER',
};

/**
 * Order payment settings
 */
export interface OrderPaymentSettings {
  /** Payment timeout in minutes */
  paymentTimeoutMinutes: number;
  /** Auto-cancel unpaid orders in minutes */
  autoCancelUnpaidMinutes: number;
  /** Retry payment attempts */
  retryAttempts: number;
  /** Retry interval in minutes */
  retryIntervalMinutes: number;
  /** Enable payment verification */
  enablePaymentVerification: boolean;
  /** Require payment confirmation */
  requirePaymentConfirmation: boolean;
}

export const DEFAULT_ORDER_PAYMENT_SETTINGS: OrderPaymentSettings = {
  paymentTimeoutMinutes: 30,
  autoCancelUnpaidMinutes: 60,
  retryAttempts: 3,
  retryIntervalMinutes: 10,
  enablePaymentVerification: true,
  requirePaymentConfirmation: true,
};

/**
 * Order delivery timeline
 */
export interface OrderDeliveryTimeline {
  /** Estimated delivery time in days */
  estimatedDeliveryDays: number;
  /** Express delivery time in days */
  expressDeliveryDays: number;
  /** Standard delivery time in days */
  standardDeliveryDays: number;
  /** Delivery tracking update interval in minutes */
  trackingUpdateIntervalMinutes: number;
  /** Delivery confirmation window in hours */
  confirmationWindowHours: number;
  /** Delivery grace period in hours */
  gracePeriodHours: number;
}

export const DEFAULT_ORDER_DELIVERY_TIMELINE: OrderDeliveryTimeline = {
  estimatedDeliveryDays: 5,
  expressDeliveryDays: 2,
  standardDeliveryDays: 5,
  trackingUpdateIntervalMinutes: 60,
  confirmationWindowHours: 24,
  gracePeriodHours: 4,
};

/**
 * Order tracking update settings
 */
export interface OrderTrackingSettings {
  /** Tracking update interval in minutes */
  updateIntervalMinutes: number;
  /** Enable real-time tracking */
  enableRealTimeTracking: boolean;
  /** Enable tracking notifications */
  enableTrackingNotifications: boolean;
  /** Notification channels */
  notificationChannels: ('EMAIL' | 'SMS' | 'PUSH' | 'IN_APP')[];
  /** Tracking history retention days */
  historyRetentionDays: number;
}

export const DEFAULT_ORDER_TRACKING_SETTINGS: OrderTrackingSettings = {
  updateIntervalMinutes: 60,
  enableRealTimeTracking: true,
  enableTrackingNotifications: true,
  notificationChannels: ['EMAIL', 'SMS', 'PUSH'],
  historyRetentionDays: 90,
};

/**
 * Order completion thresholds
 */
export interface OrderCompletionThresholds {
  /** Minimum order value */
  minimumOrderValue: number;
  /** Maximum order value */
  maximumOrderValue: number;
  /** Minimum items per order */
  minimumItemsPerOrder: number;
  /** Maximum items per order */
  maximumItemsPerOrder: number;
  /** Completion rating threshold */
  completionRatingThreshold: number;
  /** On-time delivery threshold percentage */
  onTimeDeliveryThreshold: number;
}

export const DEFAULT_ORDER_COMPLETION_THRESHOLDS: OrderCompletionThresholds = {
  minimumOrderValue: 1,
  maximumOrderValue: 10000,
  minimumItemsPerOrder: 1,
  maximumItemsPerOrder: 100,
  completionRatingThreshold: 4.0,
  onTimeDeliveryThreshold: 95,
};

/**
 * Order validation rules
 */
export interface OrderValidationRules {
  /** Validate shipping address */
  validateShippingAddress: boolean;
  /** Validate billing address */
  validateBillingAddress: boolean;
  /** Validate payment method */
  validatePaymentMethod: boolean;
  /** Validate inventory availability */
  validateInventoryAvailability: boolean;
  /** Validate discount codes */
  validateDiscountCodes: boolean;
  /** Validate promotional offers */
  validatePromotionalOffers: boolean;
  /** Validate customer limits */
  validateCustomerLimits: boolean;
  /** Validate fraud detection */
  enableFraudDetection: boolean;
}

export const DEFAULT_ORDER_VALIDATION_RULES: OrderValidationRules = {
  validateShippingAddress: true,
  validateBillingAddress: true,
  validatePaymentMethod: true,
  validateInventoryAvailability: true,
  validateDiscountCodes: true,
  validatePromotionalOffers: true,
  validateCustomerLimits: true,
  enableFraudDetection: true,
};

/**
 * Order duplicate check settings
 */
export interface OrderDuplicateCheckSettings {
  /** Enable duplicate order check */
  enableDuplicateCheck: boolean;
  /** Duplicate check window in hours */
  checkWindowHours: number;
  /** Match criteria fields */
  matchFields: ('EMAIL' | 'PHONE' | 'ADDRESS' | 'PRODUCTS' | 'AMOUNT')[];
  /** Duplicate action */
  duplicateAction: 'BLOCK' | 'WARN' | 'ALLOW';
  /** Auto-merge duplicates */
  autoMergeDuplicates: boolean;
}

export const DEFAULT_ORDER_DUPLICATE_CHECK_SETTINGS: OrderDuplicateCheckSettings = {
  enableDuplicateCheck: true,
  checkWindowHours: 24,
  matchFields: ['EMAIL', 'ADDRESS', 'PRODUCTS'],
  duplicateAction: 'WARN',
  autoMergeDuplicates: false,
};

/**
 * Order analytics configuration
 */
export const ORDER_ANALYTICS_CONFIG = {
  /** Maximum orders to process */
  MAX_ORDERS: 100000,
  /** Order analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Order query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum orders in report */
  MAX_ORDERS_IN_REPORT: 10000,
  /** Order data export limit */
  EXPORT_LIMIT: 50000,
  /** Order analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Order event types
 */
export enum OrderEventType {
  /** Order created */
  ORDER_CREATED = 'ORDER_CREATED',
  /** Order updated */
  ORDER_UPDATED = 'ORDER_UPDATED',
  /** Order confirmed */
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  /** Order processing started */
  ORDER_PROCESSING_STARTED = 'ORDER_PROCESSING_STARTED',
  /** Order ready to ship */
  ORDER_READY_TO_SHIP = 'ORDER_READY_TO_SHIP',
  /** Order shipped */
  ORDER_SHIPPED = 'ORDER_SHIPPED',
  /** Order in transit */
  ORDER_IN_TRANSIT = 'ORDER_IN_TRANSIT',
  /** Order delivered */
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  /** Order completed */
  ORDER_COMPLETED = 'ORDER_COMPLETED',
  /** Order cancelled */
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  /** Order returned */
  ORDER_RETURNED = 'ORDER_RETURNED',
  /** Order refunded */
  ORDER_REFUNDED = 'ORDER_REFUNDED',
  /** Order on hold */
  ORDER_ON_HOLD = 'ORDER_ON_HOLD',
  /** Order failed */
  ORDER_FAILED = 'ORDER_FAILED',
}

/**
 * Order event configuration
 */
export const ORDER_EVENT_CONFIG: Record<
  OrderEventType,
  { label: string; description: string; isCritical: boolean }
> = {
  [OrderEventType.ORDER_CREATED]: {
    label: 'Order Created',
    description: 'New order has been created',
    isCritical: false,
  },
  [OrderEventType.ORDER_UPDATED]: {
    label: 'Order Updated',
    description: 'Order details have been updated',
    isCritical: false,
  },
  [OrderEventType.ORDER_CONFIRMED]: {
    label: 'Order Confirmed',
    description: 'Order has been confirmed',
    isCritical: true,
  },
  [OrderEventType.ORDER_PROCESSING_STARTED]: {
    label: 'Processing Started',
    description: 'Order processing has started',
    isCritical: false,
  },
  [OrderEventType.ORDER_READY_TO_SHIP]: {
    label: 'Ready to Ship',
    description: 'Order is ready for shipping',
    isCritical: false,
  },
  [OrderEventType.ORDER_SHIPPED]: {
    label: 'Order Shipped',
    description: 'Order has been shipped',
    isCritical: true,
  },
  [OrderEventType.ORDER_IN_TRANSIT]: {
    label: 'In Transit',
    description: 'Order is in transit',
    isCritical: false,
  },
  [OrderEventType.ORDER_DELIVERED]: {
    label: 'Order Delivered',
    description: 'Order has been delivered',
    isCritical: true,
  },
  [OrderEventType.ORDER_COMPLETED]: {
    label: 'Order Completed',
    description: 'Order has been completed',
    isCritical: true,
  },
  [OrderEventType.ORDER_CANCELLED]: {
    label: 'Order Cancelled',
    description: 'Order has been cancelled',
    isCritical: true,
  },
  [OrderEventType.ORDER_RETURNED]: {
    label: 'Order Returned',
    description: 'Order has been returned',
    isCritical: true,
  },
  [OrderEventType.ORDER_REFUNDED]: {
    label: 'Order Refunded',
    description: 'Order has been refunded',
    isCritical: true,
  },
  [OrderEventType.ORDER_ON_HOLD]: {
    label: 'Order On Hold',
    description: 'Order has been put on hold',
    isCritical: true,
  },
  [OrderEventType.ORDER_FAILED]: {
    label: 'Order Failed',
    description: 'Order processing has failed',
    isCritical: true,
  },
};

/**
 * Order functions
 */
export function getOrderStatusLabel(status: OrderStatus): string {
  return status;
}

export function getOrderEventLabel(event: OrderEventType): string {
  return ORDER_EVENT_CONFIG[event]?.label || event;
}

export function isOrderEventCritical(event: OrderEventType): boolean {
  return ORDER_EVENT_CONFIG[event]?.isCritical || false;
}

export function getOrderStatusFlow(): OrderStatus[] {
  return [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.PROCESSING,
    OrderStatus.READY_TO_SHIP,
    OrderStatus.SHIPPED,
    OrderStatus.IN_TRANSIT,
    OrderStatus.DELIVERED,
    OrderStatus.COMPLETED,
  ];
}

export function isOrderTerminalStatus(status: OrderStatus): boolean {
  return [
    OrderStatus.COMPLETED,
    OrderStatus.CANCELLED,
    OrderStatus.RETURNED,
    OrderStatus.REFUNDED,
    OrderStatus.FAILED,
  ].includes(status);
}

export function canCancelOrder(status: OrderStatus): boolean {
  return [OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.PROCESSING].includes(status);
}

export function canReturnOrder(status: OrderStatus): boolean {
  return [OrderStatus.DELIVERED, OrderStatus.COMPLETED].includes(status);
}
