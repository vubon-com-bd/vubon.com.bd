/**
 * Vendor Permission Constants
 * ভেন্ডর পারমিশন সম্পর্কিত কনস্ট্যান্টস
 */

import { PERMISSIONS } from '../../common';

export const VENDOR_PERMISSIONS = {
  // Common permissions
  ...PERMISSIONS,

  // Vendor specific permissions
  VENDOR_VIEW: 'vendor_view',
  VENDOR_CREATE: 'vendor_create',
  VENDOR_UPDATE: 'vendor_update',
  VENDOR_DELETE: 'vendor_delete',
  VENDOR_APPROVE: 'vendor_approve',
  VENDOR_SUSPEND: 'vendor_suspend',
  VENDOR_VERIFY: 'vendor_verify',

  VENDOR_PRODUCT_VIEW: 'vendor_product_view',
  VENDOR_PRODUCT_CREATE: 'vendor_product_create',
  VENDOR_PRODUCT_UPDATE: 'vendor_product_update',
  VENDOR_PRODUCT_DELETE: 'vendor_product_delete',

  VENDOR_ORDER_VIEW: 'vendor_order_view',
  VENDOR_ORDER_UPDATE: 'vendor_order_update',
  VENDOR_ORDER_CANCEL: 'vendor_order_cancel',

  VENDOR_PAYMENT_VIEW: 'vendor_payment_view',
  VENDOR_PAYMENT_REQUEST: 'vendor_payment_request',
  VENDOR_PAYMENT_APPROVE: 'vendor_payment_approve',

  VENDOR_SETTINGS_VIEW: 'vendor_settings_view',
  VENDOR_SETTINGS_UPDATE: 'vendor_settings_update',

  VENDOR_REPORT_VIEW: 'vendor_report_view',
  VENDOR_REPORT_GENERATE: 'vendor_report_generate',

  VENDOR_ANALYTICS_VIEW: 'vendor_analytics_view',
} as const;

export type VendorPermissionValue = keyof typeof VENDOR_PERMISSIONS;
