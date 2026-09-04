/**
 * Admin Device Constants
 * অ্যাডমিন ডিভাইস সম্পর্কিত কনস্ট্যান্টস
 */

import { DEVICE } from '../common';

export const ADMIN_DEVICE = {
  ...DEVICE,

  // Device types
  TYPES: {
    DESKTOP: 'desktop',
    LAPTOP: 'laptop',
    TABLET: 'tablet',
    MOBILE: 'mobile',
    SMART_TV: 'smart_tv',
    SMART_WATCH: 'smart_watch',
    IOT: 'iot',
    SERVER: 'server',
    API_CLIENT: 'api_client',
    OTHER: 'other',
  },

  // Device status
  STATUS: {
    TRUSTED: 'trusted',
    UNTRUSTED: 'untrusted',
    SUSPICIOUS: 'suspicious',
    BLOCKED: 'blocked',
    PENDING: 'pending',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
  },

  // Default values
  DEFAULTS: {
    MAX_DEVICES: 10,
    SESSION_TIMEOUT: 3600,
    TRUSTED_TOKEN_EXPIRY: 2592000,
  },
} as const;

export type AdminDeviceType = (typeof ADMIN_DEVICE.TYPES)[keyof typeof ADMIN_DEVICE.TYPES];
export type AdminDeviceStatus = (typeof ADMIN_DEVICE.STATUS)[keyof typeof ADMIN_DEVICE.STATUS];
