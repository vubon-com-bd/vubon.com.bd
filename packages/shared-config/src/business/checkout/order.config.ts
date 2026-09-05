/**
 * Order Config
 * অর্ডার কনফিগারেশন
 */

import { ORDER } from '@vubon/shared-constants';

export interface OrderConfig {
  enabled: boolean;
  prefix: string;
  status: Record<string, string>;
  types: Record<string, string>;
  sources: Record<string, string>;
  checkoutStatus: Record<string, string>;
  returnWindow: number;
  cancelWindow: number;
  processingTime: number;
  shippingTime: number;
  defaults: {
    minItems: number;
    maxItems: number;
    minOrderAmount: number;
    maxOrderAmount: number;
    processingTime: number;
    shippingTime: number;
    returnWindow: number;
    cancellationWindow: number;
  };
  validation: {
    requireStockCheck: boolean;
    requirePriceCheck: boolean;
    allowPartialShipment: boolean;
    allowBackOrder: boolean;
  };
  notifications: {
    orderConfirmation: boolean;
    orderProcessing: boolean;
    orderShipped: boolean;
    orderDelivered: boolean;
    orderCancelled: boolean;
    orderReturned: boolean;
  };
}

export const orderConfig: OrderConfig = {
  enabled: true,
  prefix: 'ORD',

  status: {
    pending: ORDER.STATUS.PENDING,
    confirmed: ORDER.STATUS.CONFIRMED,
    processing: ORDER.STATUS.PROCESSING,
    ready_to_ship: ORDER.STATUS.READY_TO_SHIP,
    shipped: ORDER.STATUS.SHIPPED,
    in_transit: ORDER.STATUS.IN_TRANSIT,
    out_for_delivery: ORDER.STATUS.OUT_FOR_DELIVERY,
    delivered: ORDER.STATUS.DELIVERED,
    completed: ORDER.STATUS.COMPLETED,
    cancelled: ORDER.STATUS.CANCELLED,
    returned: ORDER.STATUS.RETURNED,
    refunded: ORDER.STATUS.REFUNDED,
    partial_shipped: ORDER.STATUS.PARTIAL_SHIPPED,
    failed: ORDER.STATUS.FAILED,
    expired: ORDER.STATUS.EXPIRED,
  },

  types: {
    regular: ORDER.TYPES.REGULAR,
    express: ORDER.TYPES.EXPRESS,
    bulk: ORDER.TYPES.BULK,
    wholesale: ORDER.TYPES.WHOLESALE,
    rental: ORDER.TYPES.RENTAL,
    subscription: ORDER.TYPES.SUBSCRIPTION,
    gift: ORDER.TYPES.GIFT,
  },

  sources: {
    web: ORDER.SOURCES.WEB,
    mobile: ORDER.SOURCES.MOBILE,
    api: ORDER.SOURCES.API,
    pos: ORDER.SOURCES.POS,
    marketplace: ORDER.SOURCES.MARKETPLACE,
    social: ORDER.SOURCES.SOCIAL,
  },

  checkoutStatus: {
    initiated: ORDER.CHECKOUT_STATUS.INITIATED,
    in_progress: ORDER.CHECKOUT_STATUS.IN_PROGRESS,
    completed: ORDER.CHECKOUT_STATUS.COMPLETED,
    failed: ORDER.CHECKOUT_STATUS.FAILED,
    cancelled: ORDER.CHECKOUT_STATUS.CANCELLED,
  },

  returnWindow: 7,
  cancelWindow: 1,
  processingTime: 24,
  shippingTime: 72,

  defaults: {
    minItems: ORDER.DEFAULTS.MIN_ITEMS,
    maxItems: ORDER.DEFAULTS.MAX_ITEMS,
    minOrderAmount: ORDER.DEFAULTS.MIN_ORDER_AMOUNT,
    maxOrderAmount: ORDER.DEFAULTS.MAX_ORDER_AMOUNT,
    processingTime: ORDER.DEFAULTS.PROCESSING_TIME,
    shippingTime: ORDER.DEFAULTS.SHIPPING_TIME,
    returnWindow: ORDER.DEFAULTS.RETURN_WINDOW,
    cancellationWindow: ORDER.DEFAULTS.CANCELLATION_WINDOW,
  },

  validation: {
    requireStockCheck: true,
    requirePriceCheck: true,
    allowPartialShipment: true,
    allowBackOrder: false,
  },

  notifications: {
    orderConfirmation: true,
    orderProcessing: true,
    orderShipped: true,
    orderDelivered: true,
    orderCancelled: true,
    orderReturned: true,
  },
} as const;

export type OrderConfigType = typeof orderConfig;
