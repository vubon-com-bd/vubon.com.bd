/**
 * Vendor Activity Constants
 * ভেন্ডর অ্যাক্টিভিটি সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const VENDOR_ACTIVITY = {
  // Activity types (TYPES ব্যবহার করে)
  TYPES: {
    LOGIN: TYPES.USER || 'login',
    LOGOUT: 'logout',
    PRODUCT_CREATE: 'product_create',
    PRODUCT_UPDATE: 'product_update',
    PRODUCT_DELETE: 'product_delete',
    ORDER_CREATE: 'order_create',
    ORDER_UPDATE: 'order_update',
    ORDER_CANCEL: 'order_cancel',
    PAYMENT_REQUEST: 'payment_request',
    PAYMENT_RECEIVE: 'payment_receive',
    SETTINGS_UPDATE: 'settings_update',
    PROFILE_UPDATE: 'profile_update',
    DOCUMENT_UPLOAD: 'document_upload',
    DOCUMENT_DELETE: 'document_delete',
    TEAM_ADD: 'team_add',
    TEAM_REMOVE: 'team_remove',
    TEAM_UPDATE: 'team_update',
  },

  // Activity status
  STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: TYPES.PENDING,
    PROCESSING: 'processing',
  },

  // Activity priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Default values
  DEFAULTS: {
    MAX_HISTORY: 1000,
    RETENTION_DAYS: 90,
  },
} as const;

export type VendorActivityType = (typeof VENDOR_ACTIVITY.TYPES)[keyof typeof VENDOR_ACTIVITY.TYPES];
export type VendorActivityStatus =
  (typeof VENDOR_ACTIVITY.STATUS)[keyof typeof VENDOR_ACTIVITY.STATUS];
export type VendorActivityPriority =
  (typeof VENDOR_ACTIVITY.PRIORITY)[keyof typeof VENDOR_ACTIVITY.PRIORITY];
