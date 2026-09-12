/**
 * Settings API endpoint paths.
 * @module shared-api/endpoints/settings
 */

export const SETTINGS_ENDPOINTS = {
  GET: '/settings',
  UPDATE: '/settings',
  RESET: '/settings/reset',
  SYSTEM: '/settings/system',
  SECURITY: '/settings/security',
  NOTIFICATION: '/settings/notification',
  PAYMENT: '/settings/payment',
  SHIPPING: '/settings/shipping',
  TAX: '/settings/tax',
} as const;
