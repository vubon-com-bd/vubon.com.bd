/**
 * Order Tracking Constants (EXTENDS common/status + common/types)
 * @module shared-constants/business/checkout/order-tracking.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { SHIPPING_METHODS } from '../../common/shipping-methods.constants';

export const ORDER_TRACKING = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Verification from common
  VERIFICATION: VERIFICATION,

  // Shipping methods from common
  SHIPPING_METHODS: SHIPPING_METHODS,

  // Tracking specific
  MAX_TRACKING_ENTRIES: 50,
  TRACKING_CACHE_TTL: 3600,
  TRACKING_EXPIRY_DAYS: 30,

  // Tracking status
  ORDER_TRACKING_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
    DELAYED: 'delayed',
  } as const,

  // Tracking provider (Bangladesh)
  ORDER_TRACKING_PROVIDER: {
    SA_PARIBAHAN: 'sa_paribahan',
    SUNDARBAN: 'sundarban',
    E_COURIER: 'e_courier',
    REDX: 'redx',
    PATHWAY: 'pathway',
    PAPERFLY: 'paperfly',
    STEADFAST: 'steadfast',
    DHL: 'dhl',
    FEDEX: 'fedex',
    UPS: 'ups',
    ARAMEX: 'aramex',
  } as const,

  // Tracking event
  ORDER_TRACKING_EVENT: {
    ORDER_PLACED: 'order_placed',
    ORDER_CONFIRMED: 'order_confirmed',
    ORDER_PROCESSING: 'order_processing',
    ORDER_SHIPPED: 'order_shipped',
    ORDER_IN_TRANSIT: 'order_in_transit',
    ORDER_OUT_FOR_DELIVERY: 'order_out_for_delivery',
    ORDER_DELIVERED: 'order_delivered',
    ORDER_DELAYED: 'order_delayed',
    ORDER_RETURNED: 'order_returned',
    ORDER_CANCELLED: 'order_cancelled',
  } as const,

  // Tracking validation
  ORDER_TRACKING_VALIDATION: {
    REQUIRES_TRACKING_NUMBER: true,
    REQUIRES_PROVIDER: true,
    REQUIRES_STATUS: true,
    REQUIRES_UPDATES: true,
  } as const,
} as const;

export type OrderTrackingStatus =
  (typeof ORDER_TRACKING.ORDER_TRACKING_STATUS)[keyof typeof ORDER_TRACKING.ORDER_TRACKING_STATUS];
export type OrderTrackingProvider =
  (typeof ORDER_TRACKING.ORDER_TRACKING_PROVIDER)[keyof typeof ORDER_TRACKING.ORDER_TRACKING_PROVIDER];
export type OrderTrackingEvent =
  (typeof ORDER_TRACKING.ORDER_TRACKING_EVENT)[keyof typeof ORDER_TRACKING.ORDER_TRACKING_EVENT];
