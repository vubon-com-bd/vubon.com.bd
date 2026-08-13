/**
 * @fileoverview Order analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Order analytics types enum for different order-related analytics
 */
export enum OrderAnalyticsType {
  /** New order analytics */
  NEW_ORDER = 'NEW_ORDER',
  /** Pending order analytics */
  PENDING_ORDER = 'PENDING_ORDER',
  /** Processing order analytics */
  PROCESSING_ORDER = 'PROCESSING_ORDER',
  /** Shipped order analytics */
  SHIPPED_ORDER = 'SHIPPED_ORDER',
  /** Delivered order analytics */
  DELIVERED_ORDER = 'DELIVERED_ORDER',
  /** Cancelled order analytics */
  CANCELLED_ORDER = 'CANCELLED_ORDER',
  /** Returned order analytics */
  RETURNED_ORDER = 'RETURNED_ORDER',
  /** Refunded order analytics */
  REFUNDED_ORDER = 'REFUNDED_ORDER',
  /** Completed order analytics */
  COMPLETED_ORDER = 'COMPLETED_ORDER',
  /** Failed order analytics */
  FAILED_ORDER = 'FAILED_ORDER',
  /** On hold order analytics */
  ON_HOLD_ORDER = 'ON_HOLD_ORDER',
  /** Backordered order analytics */
  BACKORDERED_ORDER = 'BACKORDERED_ORDER',
  /** Partially shipped order analytics */
  PARTIALLY_SHIPPED = 'PARTIALLY_SHIPPED',
  /** Awaiting payment order analytics */
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  /** Awaiting fulfillment order analytics */
  AWAITING_FULFILLMENT = 'AWAITING_FULFILLMENT',
  /** Awaiting shipment order analytics */
  AWAITING_SHIPMENT = 'AWAITING_SHIPMENT',
  /** Awaiting delivery order analytics */
  AWAITING_DELIVERY = 'AWAITING_DELIVERY',
  /** Awaiting review order analytics */
  AWAITING_REVIEW = 'AWAITING_REVIEW',
  /** Express order analytics */
  EXPRESS_ORDER = 'EXPRESS_ORDER',
  /** Bulk order analytics */
  BULK_ORDER = 'BULK_ORDER',
  /** Corporate order analytics */
  CORPORATE_ORDER = 'CORPORATE_ORDER',
  /** International order analytics */
  INTERNATIONAL_ORDER = 'INTERNATIONAL_ORDER',
  /** Domestic order analytics */
  DOMESTIC_ORDER = 'DOMESTIC_ORDER',
  /** Recurring order analytics */
  RECURRING_ORDER = 'RECURRING_ORDER',
  /** Subscription order analytics */
  SUBSCRIPTION_ORDER = 'SUBSCRIPTION_ORDER',
  /** Gift order analytics */
  GIFT_ORDER = 'GIFT_ORDER',
  /** Sample order analytics */
  SAMPLE_ORDER = 'SAMPLE_ORDER',
  /** Test order analytics */
  TEST_ORDER = 'TEST_ORDER',
}

/**
 * Order analytics category for grouping
 */
export enum OrderAnalyticsCategory {
  /** Status-based analytics */
  STATUS = 'STATUS',
  /** Processing stage analytics */
  PROCESSING = 'PROCESSING',
  /** Fulfillment analytics */
  FULFILLMENT = 'FULFILLMENT',
  /** Financial analytics */
  FINANCIAL = 'FINANCIAL',
  /** Customer type analytics */
  CUSTOMER = 'CUSTOMER',
  /** Order type analytics */
  ORDER_TYPE = 'ORDER_TYPE',
  /** Geographic analytics */
  GEOGRAPHIC = 'GEOGRAPHIC',
}

/**
 * Order analytics category mapping
 */
export const ORDER_ANALYTICS_TYPE_CATEGORY_MAP: Record<OrderAnalyticsType, OrderAnalyticsCategory> =
  {
    [OrderAnalyticsType.NEW_ORDER]: OrderAnalyticsCategory.STATUS,
    [OrderAnalyticsType.PENDING_ORDER]: OrderAnalyticsCategory.STATUS,
    [OrderAnalyticsType.PROCESSING_ORDER]: OrderAnalyticsCategory.PROCESSING,
    [OrderAnalyticsType.SHIPPED_ORDER]: OrderAnalyticsCategory.FULFILLMENT,
    [OrderAnalyticsType.DELIVERED_ORDER]: OrderAnalyticsCategory.FULFILLMENT,
    [OrderAnalyticsType.CANCELLED_ORDER]: OrderAnalyticsCategory.FINANCIAL,
    [OrderAnalyticsType.RETURNED_ORDER]: OrderAnalyticsCategory.FINANCIAL,
    [OrderAnalyticsType.REFUNDED_ORDER]: OrderAnalyticsCategory.FINANCIAL,
    [OrderAnalyticsType.COMPLETED_ORDER]: OrderAnalyticsCategory.STATUS,
    [OrderAnalyticsType.FAILED_ORDER]: OrderAnalyticsCategory.STATUS,
    [OrderAnalyticsType.ON_HOLD_ORDER]: OrderAnalyticsCategory.PROCESSING,
    [OrderAnalyticsType.BACKORDERED_ORDER]: OrderAnalyticsCategory.FULFILLMENT,
    [OrderAnalyticsType.PARTIALLY_SHIPPED]: OrderAnalyticsCategory.FULFILLMENT,
    [OrderAnalyticsType.AWAITING_PAYMENT]: OrderAnalyticsCategory.FINANCIAL,
    [OrderAnalyticsType.AWAITING_FULFILLMENT]: OrderAnalyticsCategory.FULFILLMENT,
    [OrderAnalyticsType.AWAITING_SHIPMENT]: OrderAnalyticsCategory.FULFILLMENT,
    [OrderAnalyticsType.AWAITING_DELIVERY]: OrderAnalyticsCategory.FULFILLMENT,
    [OrderAnalyticsType.AWAITING_REVIEW]: OrderAnalyticsCategory.PROCESSING,
    [OrderAnalyticsType.EXPRESS_ORDER]: OrderAnalyticsCategory.ORDER_TYPE,
    [OrderAnalyticsType.BULK_ORDER]: OrderAnalyticsCategory.ORDER_TYPE,
    [OrderAnalyticsType.CORPORATE_ORDER]: OrderAnalyticsCategory.CUSTOMER,
    [OrderAnalyticsType.INTERNATIONAL_ORDER]: OrderAnalyticsCategory.GEOGRAPHIC,
    [OrderAnalyticsType.DOMESTIC_ORDER]: OrderAnalyticsCategory.GEOGRAPHIC,
    [OrderAnalyticsType.RECURRING_ORDER]: OrderAnalyticsCategory.ORDER_TYPE,
    [OrderAnalyticsType.SUBSCRIPTION_ORDER]: OrderAnalyticsCategory.ORDER_TYPE,
    [OrderAnalyticsType.GIFT_ORDER]: OrderAnalyticsCategory.ORDER_TYPE,
    [OrderAnalyticsType.SAMPLE_ORDER]: OrderAnalyticsCategory.ORDER_TYPE,
    [OrderAnalyticsType.TEST_ORDER]: OrderAnalyticsCategory.ORDER_TYPE,
  };

/**
 * Order analytics type configuration
 */
export interface OrderAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresOrderId: boolean;
}

export const ORDER_ANALYTICS_TYPE_CONFIG: Record<OrderAnalyticsType, OrderAnalyticsTypeConfig> = {
  [OrderAnalyticsType.NEW_ORDER]: {
    label: 'New Order',
    description: 'Analytics for newly created orders',
    icon: 'FilePlus',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.PENDING_ORDER]: {
    label: 'Pending Order',
    description: 'Analytics for pending orders awaiting action',
    icon: 'Clock',
    color: '#F59E0B',
    priority: 1,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.PROCESSING_ORDER]: {
    label: 'Processing Order',
    description: 'Analytics for orders being processed',
    icon: 'Refresh',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.SHIPPED_ORDER]: {
    label: 'Shipped Order',
    description: 'Analytics for shipped orders',
    icon: 'Truck',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.DELIVERED_ORDER]: {
    label: 'Delivered Order',
    description: 'Analytics for delivered orders',
    icon: 'CheckCircle',
    color: '#22C55E',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.CANCELLED_ORDER]: {
    label: 'Cancelled Order',
    description: 'Analytics for cancelled orders',
    icon: 'XCircle',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.RETURNED_ORDER]: {
    label: 'Returned Order',
    description: 'Analytics for returned orders',
    icon: 'Undo',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.REFUNDED_ORDER]: {
    label: 'Refunded Order',
    description: 'Analytics for refunded orders',
    icon: 'DollarSign',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.COMPLETED_ORDER]: {
    label: 'Completed Order',
    description: 'Analytics for completed orders',
    icon: 'CheckCircle',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.FAILED_ORDER]: {
    label: 'Failed Order',
    description: 'Analytics for failed orders',
    icon: 'AlertCircle',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.ON_HOLD_ORDER]: {
    label: 'On Hold Order',
    description: 'Analytics for orders on hold',
    icon: 'Pause',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.BACKORDERED_ORDER]: {
    label: 'Backordered Order',
    description: 'Analytics for backordered items',
    icon: 'Package',
    color: '#F97316',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.PARTIALLY_SHIPPED]: {
    label: 'Partially Shipped',
    description: 'Analytics for partially shipped orders',
    icon: 'Truck',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.AWAITING_PAYMENT]: {
    label: 'Awaiting Payment',
    description: 'Analytics for orders awaiting payment',
    icon: 'CreditCard',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.AWAITING_FULFILLMENT]: {
    label: 'Awaiting Fulfillment',
    description: 'Analytics for orders awaiting fulfillment',
    icon: 'Package',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.AWAITING_SHIPMENT]: {
    label: 'Awaiting Shipment',
    description: 'Analytics for orders awaiting shipment',
    icon: 'Truck',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.AWAITING_DELIVERY]: {
    label: 'Awaiting Delivery',
    description: 'Analytics for orders awaiting delivery',
    icon: 'MapPin',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.AWAITING_REVIEW]: {
    label: 'Awaiting Review',
    description: 'Analytics for orders awaiting review',
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.EXPRESS_ORDER]: {
    label: 'Express Order',
    description: 'Analytics for express shipping orders',
    icon: 'Zap',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.BULK_ORDER]: {
    label: 'Bulk Order',
    description: 'Analytics for bulk quantity orders',
    icon: 'Package',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.CORPORATE_ORDER]: {
    label: 'Corporate Order',
    description: 'Analytics for corporate/business orders',
    icon: 'Building',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.INTERNATIONAL_ORDER]: {
    label: 'International Order',
    description: 'Analytics for international orders',
    icon: 'Globe',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.DOMESTIC_ORDER]: {
    label: 'Domestic Order',
    description: 'Analytics for domestic orders',
    icon: 'MapPin',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.RECURRING_ORDER]: {
    label: 'Recurring Order',
    description: 'Analytics for recurring/repeat orders',
    icon: 'Repeat',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.SUBSCRIPTION_ORDER]: {
    label: 'Subscription Order',
    description: 'Analytics for subscription-based orders',
    icon: 'Repeat',
    color: '#EC4899',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.GIFT_ORDER]: {
    label: 'Gift Order',
    description: 'Analytics for gift purchases',
    icon: 'Gift',
    color: '#F472B6',
    priority: 3,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.SAMPLE_ORDER]: {
    label: 'Sample Order',
    description: 'Analytics for sample/product test orders',
    icon: 'Package',
    color: '#F59E0B',
    priority: 3,
    isRealtime: false,
    requiresOrderId: true,
  },
  [OrderAnalyticsType.TEST_ORDER]: {
    label: 'Test Order',
    description: 'Analytics for test/validation orders',
    icon: 'Beaker',
    color: '#6B7280',
    priority: 3,
    isRealtime: false,
    requiresOrderId: true,
  },
};

/**
 * Get order analytics type label
 */
export function getOrderAnalyticsTypeLabel(type: OrderAnalyticsType): string {
  return ORDER_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get order analytics type description
 */
export function getOrderAnalyticsTypeDescription(type: OrderAnalyticsType): string {
  return ORDER_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get order analytics type category
 */
export function getOrderAnalyticsTypeCategory(type: OrderAnalyticsType): OrderAnalyticsCategory {
  return ORDER_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get order analytics types by category
 */
export function getOrderAnalyticsTypesByCategory(
  category: OrderAnalyticsCategory
): OrderAnalyticsType[] {
  return Object.entries(ORDER_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as OrderAnalyticsType);
}

/**
 * Check if order analytics type requires order ID
 */
export function orderAnalyticsTypeRequiresOrderId(type: OrderAnalyticsType): boolean {
  return ORDER_ANALYTICS_TYPE_CONFIG[type]?.requiresOrderId || false;
}

/**
 * Check if order analytics type is real-time
 */
export function isOrderAnalyticsTypeRealtime(type: OrderAnalyticsType): boolean {
  return ORDER_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get order analytics type priority
 */
export function getOrderAnalyticsTypePriority(type: OrderAnalyticsType): number {
  return ORDER_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Order analytics type status
 */
export enum OrderAnalyticsTypeStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Paused temporarily */
  PAUSED = 'PAUSED',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for order analytics types
 */
export const ORDER_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  OrderAnalyticsType,
  OrderAnalyticsTypeStatus
> = {
  [OrderAnalyticsType.NEW_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.PENDING_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.PROCESSING_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.SHIPPED_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.DELIVERED_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.CANCELLED_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.RETURNED_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.REFUNDED_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.COMPLETED_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.FAILED_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.ON_HOLD_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.BACKORDERED_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.PARTIALLY_SHIPPED]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.AWAITING_PAYMENT]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.AWAITING_FULFILLMENT]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.AWAITING_SHIPMENT]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.AWAITING_DELIVERY]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.AWAITING_REVIEW]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.EXPRESS_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.BULK_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.CORPORATE_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.INTERNATIONAL_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.DOMESTIC_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.RECURRING_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.SUBSCRIPTION_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.GIFT_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.SAMPLE_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
  [OrderAnalyticsType.TEST_ORDER]: OrderAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get order analytics type status
 */
export function getOrderAnalyticsTypeStatus(type: OrderAnalyticsType): OrderAnalyticsTypeStatus {
  return ORDER_ANALYTICS_TYPE_DEFAULT_STATUS[type] || OrderAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set order analytics type status
 */
export function setOrderAnalyticsTypeStatus(
  type: OrderAnalyticsType,
  status: OrderAnalyticsTypeStatus
): void {
  ORDER_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Order analytics priority levels
 */
export const ORDER_ANALYTICS_PRIORITY_LEVELS = {
  /** Critical priority - essential analytics */
  CRITICAL: 1,
  /** High priority - important analytics */
  HIGH: 2,
  /** Medium priority - useful analytics */
  MEDIUM: 3,
  /** Low priority - nice to have */
  LOW: 4,
} as const;

/**
 * Get order analytics types by priority
 */
export function getOrderAnalyticsTypesByPriority(priority: number): OrderAnalyticsType[] {
  return Object.entries(ORDER_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as OrderAnalyticsType);
}

/**
 * Get critical order analytics types
 */
export function getCriticalOrderAnalyticsTypes(): OrderAnalyticsType[] {
  return getOrderAnalyticsTypesByPriority(ORDER_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Order analytics sub-categories
 */
export enum OrderAnalyticsSubCategory {
  /** Order creation and status */
  STATUS = 'STATUS',
  /** Payment processing */
  PAYMENT = 'PAYMENT',
  /** Fulfillment and shipping */
  FULFILLMENT = 'FULFILLMENT',
  /** Delivery and receipt */
  DELIVERY = 'DELIVERY',
  /** Returns and refunds */
  RETURNS = 'RETURNS',
  /** Order completion */
  COMPLETION = 'COMPLETION',
  /** Special order types */
  SPECIAL = 'SPECIAL',
}

/**
 * Mapping of order analytics types to sub-categories
 */
export const ORDER_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  OrderAnalyticsType,
  OrderAnalyticsSubCategory
> = {
  [OrderAnalyticsType.NEW_ORDER]: OrderAnalyticsSubCategory.STATUS,
  [OrderAnalyticsType.PENDING_ORDER]: OrderAnalyticsSubCategory.STATUS,
  [OrderAnalyticsType.PROCESSING_ORDER]: OrderAnalyticsSubCategory.STATUS,
  [OrderAnalyticsType.COMPLETED_ORDER]: OrderAnalyticsSubCategory.COMPLETION,
  [OrderAnalyticsType.CANCELLED_ORDER]: OrderAnalyticsSubCategory.STATUS,
  [OrderAnalyticsType.FAILED_ORDER]: OrderAnalyticsSubCategory.STATUS,
  [OrderAnalyticsType.ON_HOLD_ORDER]: OrderAnalyticsSubCategory.STATUS,
  [OrderAnalyticsType.AWAITING_PAYMENT]: OrderAnalyticsSubCategory.PAYMENT,
  [OrderAnalyticsType.SHIPPED_ORDER]: OrderAnalyticsSubCategory.FULFILLMENT,
  [OrderAnalyticsType.AWAITING_FULFILLMENT]: OrderAnalyticsSubCategory.FULFILLMENT,
  [OrderAnalyticsType.AWAITING_SHIPMENT]: OrderAnalyticsSubCategory.FULFILLMENT,
  [OrderAnalyticsType.BACKORDERED_ORDER]: OrderAnalyticsSubCategory.FULFILLMENT,
  [OrderAnalyticsType.PARTIALLY_SHIPPED]: OrderAnalyticsSubCategory.FULFILLMENT,
  [OrderAnalyticsType.DELIVERED_ORDER]: OrderAnalyticsSubCategory.DELIVERY,
  [OrderAnalyticsType.AWAITING_DELIVERY]: OrderAnalyticsSubCategory.DELIVERY,
  [OrderAnalyticsType.RETURNED_ORDER]: OrderAnalyticsSubCategory.RETURNS,
  [OrderAnalyticsType.REFUNDED_ORDER]: OrderAnalyticsSubCategory.RETURNS,
  [OrderAnalyticsType.AWAITING_REVIEW]: OrderAnalyticsSubCategory.COMPLETION,
  [OrderAnalyticsType.EXPRESS_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
  [OrderAnalyticsType.BULK_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
  [OrderAnalyticsType.CORPORATE_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
  [OrderAnalyticsType.INTERNATIONAL_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
  [OrderAnalyticsType.DOMESTIC_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
  [OrderAnalyticsType.RECURRING_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
  [OrderAnalyticsType.SUBSCRIPTION_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
  [OrderAnalyticsType.GIFT_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
  [OrderAnalyticsType.SAMPLE_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
  [OrderAnalyticsType.TEST_ORDER]: OrderAnalyticsSubCategory.SPECIAL,
};

/**
 * Get order analytics type sub-category
 */
export function getOrderAnalyticsTypeSubCategory(
  type: OrderAnalyticsType
): OrderAnalyticsSubCategory {
  return ORDER_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get order analytics types by sub-category
 */
export function getOrderAnalyticsTypesBySubCategory(
  subCategory: OrderAnalyticsSubCategory
): OrderAnalyticsType[] {
  return Object.entries(ORDER_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as OrderAnalyticsType);
}
