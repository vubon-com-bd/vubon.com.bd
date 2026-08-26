/**
 * Order Types
 * Type definitions for orders based on shared-constants
 * @module OrderTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Order Status
  ORDER_STATUS,
  OrderStatusType,
  OrderStatusColor,
  OrderStatusCategory,
  OrderStatusOrder,
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
  // Payment Method
  PaymentMethodType,
  // Payment Status
  PaymentStatusType,
  // Delivery Method
  DeliveryMethodType,
  // Delivery Status
  DeliveryStatusType,
  // Checkout Error
  CheckoutErrorCode,
  CheckoutErrorSeverity,
  // Payment Error
  PaymentErrorCode,
  PaymentErrorSeverity,
} from '@vubon/shared-constants';

// ============================================================
// Order Extended Types
// ============================================================

/**
 * Order item
 */
export interface OrderItem extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  currency: string;
  metadata?: Metadata;
}

/**
 * Order
 */
export interface Order extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  orderNumber: string;
  type: OrderTypeType;
  category: OrderCategory;
  priority: OrderPriority;
  status: OrderStatusType;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  currency: string;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatusType;
  deliveryMethod: DeliveryMethodType;
  deliveryStatus: DeliveryStatusType;
  billingAddress: Address;
  shippingAddress: Address;
  isActive: boolean;
  isCompleted: boolean;
  isCancelled: boolean;
  isFailed: boolean;
  isStandard: boolean;
  isPreOrder: boolean;
  isWholesale: boolean;
  isSubscription: boolean;
  placedAt: Date;
  processedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  metadata?: Metadata;
}

/**
 * Order filter
 */
export interface OrderFilter {
  userIds?: ID[];
  types?: OrderTypeType[];
  categories?: OrderCategory[];
  priorities?: OrderPriority[];
  statuses?: OrderStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minTotal?: number;
  maxTotal?: number;
  isActive?: boolean;
  isCompleted?: boolean;
  isCancelled?: boolean;
  isFailed?: boolean;
  isStandard?: boolean;
  isPreOrder?: boolean;
  isWholesale?: boolean;
  isSubscription?: boolean;
  searchTerm?: string;
  orderNumber?: string;
}

/**
 * Order statistics
 */
export interface OrderStatistics {
  userId: ID;
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  failedOrders: number;
  byType: Record<OrderTypeType, number>;
  byCategory: Record<OrderCategory, number>;
  byPriority: Record<OrderPriority, number>;
  byStatus: Record<OrderStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageOrderValue: number;
  maxOrderValue: number;
  minOrderValue: number;
  totalRevenue: number;
  mostFrequentType: OrderTypeType;
  mostFrequentCategory: OrderCategory;
  mostFrequentStatus: OrderStatusType;
  averageProcessingTime: number;
  averageShippingTime: number;
}

/**
 * Order summary
 */
export interface OrderSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  cancelled: number;
  failed: number;
  byType: Record<OrderTypeType, number>;
  byCategory: Record<OrderCategory, number>;
  byPriority: Record<OrderPriority, number>;
  byStatus: Record<OrderStatusType, number>;
  orderTrend: {
    date: Date;
    total: number;
    completed: number;
    cancelled: number;
  }[];
  topTypes: {
    type: OrderTypeType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: OrderCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: OrderStatusType;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalRevenue: number;
    averageOrderValue: number;
    totalTax: number;
    totalShipping: number;
    totalDiscount: number;
  };
}

/**
 * Order configuration
 */
export interface OrderConfiguration {
  enabled: boolean;
  defaultType: OrderTypeType;
  defaultCategory: OrderCategory;
  defaultPriority: OrderPriority;
  requirePayment: boolean;
  requireShipping: boolean;
  requireBilling: boolean;
  allowCancellation: boolean;
  cancellationWindowHours: number;
  allowReturns: boolean;
  returnWindowDays: number;
  autoProcess: boolean;
  processDelayMinutes: number;
  notificationOnPlace: boolean;
  notificationOnProcess: boolean;
  notificationOnShip: boolean;
  notificationOnDeliver: boolean;
  notificationOnCancel: boolean;
  alertConfig?: OrderAlertConfig;
}

/**
 * Order alert configuration
 */
export interface OrderAlertConfig {
  enabled: boolean;
  cancellationAlert: boolean;
  failureAlert: boolean;
  delayAlert: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Order history
 */
export interface OrderHistory extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  action: 'place' | 'process' | 'ship' | 'deliver' | 'cancel' | 'return' | 'refund' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Order validation
 */
export interface OrderValidation {
  isValid: boolean;
  orderId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Order export
 */
export interface OrderExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: OrderFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Order tracking
 */
export interface OrderTracking extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  trackingNumber: string;
  carrier: string;
  status: DeliveryStatusType;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  trackingUrl?: string;
  events: OrderTrackingEvent[];
  metadata?: Metadata;
}

/**
 * Order tracking event
 */
export interface OrderTrackingEvent extends BaseEntity, Timestamp {
  id: ID;
  trackingId: ID;
  eventType: string;
  description: string;
  location?: string;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Order return
 */
export interface OrderReturn extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  itemId: ID;
  quantity: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  refundAmount: number;
  refundStatus: 'pending' | 'processed' | 'completed' | 'failed';
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Order Status
  ORDER_STATUS,
  OrderStatusType,
  OrderStatusColor,
  OrderStatusCategory,
  OrderStatusOrder,
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
  // Payment Method
  PaymentMethodType,
  // Payment Status
  PaymentStatusType,
  // Delivery Method
  DeliveryMethodType,
  // Delivery Status
  DeliveryStatusType,
  // Checkout Error
  CheckoutErrorCode,
  CheckoutErrorSeverity,
  // Payment Error
  PaymentErrorCode,
  PaymentErrorSeverity,
};
