/**
 * Auth Device Constants (EXTENDS common/device)
 * @module shared-constants/auth/auth-device.constants
 */

import { DEVICE } from '../common/device.constants';

export const AUTH_DEVICE = {
  // Base device from common
  ...DEVICE,

  // Device trust
  TRUST: {
    TRUSTED: 'trusted',
    UNTRUSTED: 'untrusted',
    PENDING: 'pending',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
  } as const,

  // Device verification
  VERIFICATION: {
    REQUIRED: true,
    MAX_ATTEMPTS: 3,
    TIMEOUT_SECONDS: 300,
    TRUST_EXPIRY_DAYS: 90,
    VERIFY_NEW_DEVICES: true,
    VERIFY_UNKNOWN_DEVICES: true,
  },

  // Device limits
  LIMITS: {
    MAX_DEVICES_PER_USER: 10,
    MAX_TRUSTED_DEVICES: 5,
    MAX_PENDING_DEVICES: 3,
    MAX_VERIFICATION_ATTEMPTS: 3,
    LOCKOUT_DURATION: 3600,
  },

  // Device fingerprint
  FINGERPRINT: {
    ENABLED: true,
    COMPONENTS: ['user_agent', 'screen', 'canvas', 'webgl', 'fonts', 'timezone', 'language'],
    SALT_ROUNDS: 10,
  },

  // Device types
  AUTH_DEVICE_TYPE: {
    DESKTOP: 'desktop',
    LAPTOP: 'laptop',
    TABLET: 'tablet',
    MOBILE: 'mobile',
    SMART_TV: 'smart_tv',
    SMART_WATCH: 'smart_watch',
    GAMING_CONSOLE: 'gaming_console',
    OTHER: 'other',
  } as const,

  // Device status
  AUTH_DEVICE_STATUS: {
    REGISTERED: 'registered',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BLOCKED: 'blocked',
    REMOVED: 'removed',
    PENDING_VERIFICATION: 'pending_verification',
    TRUSTED: 'trusted',
    UNTRUSTED: 'untrusted',
  } as const,
} as const;

export type AuthDeviceTrust = (typeof AUTH_DEVICE.TRUST)[keyof typeof AUTH_DEVICE.TRUST];
export type AuthDeviceType =
  (typeof AUTH_DEVICE.AUTH_DEVICE_TYPE)[keyof typeof AUTH_DEVICE.AUTH_DEVICE_TYPE];
export type AuthDeviceStatus =
  (typeof AUTH_DEVICE.AUTH_DEVICE_STATUS)[keyof typeof AUTH_DEVICE.AUTH_DEVICE_STATUS];
