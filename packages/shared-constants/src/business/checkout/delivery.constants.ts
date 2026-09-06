/**
 * Delivery Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/delivery.constants
 */

import { STATUS } from '../../common/status.constants';

export const DELIVERY = {
  // Base status from common
  STATUS: STATUS,

  // Delivery specific
  MAX_DELIVERY_ATTEMPTS: 3,
  DELIVERY_CACHE_TTL: 3600,
  DELIVERY_TIMEOUT_MINUTES: 30,

  // Delivery status
  DELIVERY_STATUS: {
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
    SCHEDULED: 'scheduled',
  } as const,

  // Delivery type
  DELIVERY_TYPE: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    NEXT_DAY: 'next_day',
    SAME_DAY: 'same_day',
    OVERNIGHT: 'overnight',
    PICKUP: 'pickup',
    FREIGHT: 'freight',
    BULK: 'bulk',
    FREE: 'free',
  } as const,

  // Delivery confirmation
  DELIVERY_CONFIRMATION: {
    OTP: 'otp',
    SIGNATURE: 'signature',
    PHOTO: 'photo',
    PIN: 'pin',
    SMS: 'sms',
    EMAIL: 'email',
  } as const,

  // Delivery attempt
  DELIVERY_ATTEMPT: {
    FIRST: 'first',
    SECOND: 'second',
    THIRD: 'third',
    FINAL: 'final',
  } as const,

  // Bangladesh delivery
  BD_DELIVERY: {
    AVAILABLE_CITIES: [
      'Dhaka',
      'Chittagong',
      'Rajshahi',
      'Khulna',
      'Sylhet',
      'Barishal',
      'Rangpur',
      'Mymensingh',
    ],
    SAME_DAY_AVAILABLE_CITIES: ['Dhaka', 'Chittagong'],
    EXPRESS_AVAILABLE_CITIES: ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna'],
    STANDARD_DELIVERY_DAYS: [3, 5],
    EXPRESS_DELIVERY_DAYS: [1, 2],
    SAME_DAY_DELIVERY_HOURS: [9, 18],
  } as const,
} as const;

export type DeliveryStatus =
  (typeof DELIVERY.DELIVERY_STATUS)[keyof typeof DELIVERY.DELIVERY_STATUS];
export type DeliveryType = (typeof DELIVERY.DELIVERY_TYPE)[keyof typeof DELIVERY.DELIVERY_TYPE];
export type DeliveryConfirmation =
  (typeof DELIVERY.DELIVERY_CONFIRMATION)[keyof typeof DELIVERY.DELIVERY_CONFIRMATION];
export type DeliveryAttempt =
  (typeof DELIVERY.DELIVERY_ATTEMPT)[keyof typeof DELIVERY.DELIVERY_ATTEMPT];

export const DELIVERY_STATUS_LABELS: Record<DeliveryStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  failed: 'Failed',
  returned: 'Returned',
  cancelled: 'Cancelled',
  on_hold: 'On Hold',
  delayed: 'Delayed',
  scheduled: 'Scheduled',
};

export const DELIVERY_STATUS_COLORS: Record<DeliveryStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  in_transit: '#3b82f6',
  out_for_delivery: '#8b5cf6',
  delivered: '#22c55e',
  failed: '#ef4444',
  returned: '#f59e0b',
  cancelled: '#dc2626',
  on_hold: '#f59e0b',
  delayed: '#ef4444',
  scheduled: '#60a5fa',
};
