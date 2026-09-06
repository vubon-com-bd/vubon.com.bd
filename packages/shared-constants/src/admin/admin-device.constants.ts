/**
 * Admin Device Constants (EXTENDS common/device)
 * @module shared-constants/admin/admin-device.constants
 */

import { DEVICE } from '../common/device.constants';

export const ADMIN_DEVICE = {
  // Base device from common
  ...DEVICE,

  // Device trust
  TRUST: {
    TRUSTED: 'trusted',
    UNTRUSTED: 'untrusted',
    PENDING: 'pending',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    COMPROMISED: 'compromised',
  } as const,

  // Device verification
  VERIFICATION: {
    REQUIRED: true,
    MAX_ATTEMPTS: 3,
    TIMEOUT_SECONDS: 300,
    TRUST_EXPIRY_DAYS: 30,
    VERIFY_NEW_DEVICES: true,
    VERIFY_UNKNOWN_DEVICES: true,
    VERIFY_COMPROMISED_DEVICES: true,
  },

  // Device limits
  LIMITS: {
    MAX_DEVICES_PER_ADMIN: 5,
    MAX_TRUSTED_DEVICES: 3,
    MAX_PENDING_DEVICES: 2,
    MAX_VERIFICATION_ATTEMPTS: 3,
    LOCKOUT_DURATION: 3600,
  },

  // Device fingerprint
  FINGERPRINT: {
    ENABLED: true,
    COMPONENTS: ['user_agent', 'screen', 'canvas', 'webgl', 'fonts', 'timezone', 'language'],
    SALT_ROUNDS: 12,
  },

  // Admin device types
  ADMIN_DEVICE_TYPE: {
    DESKTOP: 'desktop',
    LAPTOP: 'laptop',
    TABLET: 'tablet',
    MOBILE: 'mobile',
    SMART_TV: 'smart_tv',
    SMART_WATCH: 'smart_watch',
    GAMING_CONSOLE: 'gaming_console',
    SERVER: 'server',
    NETWORK: 'network',
    OTHER: 'other',
  } as const,

  // Admin device status
  ADMIN_DEVICE_STATUS: {
    REGISTERED: 'registered',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BLOCKED: 'blocked',
    REMOVED: 'removed',
    PENDING_VERIFICATION: 'pending_verification',
    TRUSTED: 'trusted',
    UNTRUSTED: 'untrusted',
    COMPROMISED: 'compromised',
    REVOKED: 'revoked',
    EXPIRED: 'expired',
  } as const,

  // Admin device security
  SECURITY: {
    ENCRYPTION_REQUIRED: true,
    VPN_REQUIRED: false,
    FIREWALL_REQUIRED: true,
    ANTIVIRUS_REQUIRED: true,
    OS_UPDATED_REQUIRED: true,
    PASSWORD_LOCK_REQUIRED: true,
    BIOMETRIC_ENABLED: false,
  },

  // Device monitoring
  MONITORING: {
    ENABLED: true,
    TRACK_ACTIVITY: true,
    TRACK_PERFORMANCE: true,
    TRACK_SECURITY: true,
    ALERT_ON_SUSPICIOUS: true,
    ALERT_ON_COMPROMISED: true,
    ALERT_ON_UNTRUSTED: true,
    RETENTION_DAYS: 90,
  },
} as const;

// Use unique type names
export type AdminDeviceTrust = (typeof ADMIN_DEVICE.TRUST)[keyof typeof ADMIN_DEVICE.TRUST];
export type AdminDeviceType =
  (typeof ADMIN_DEVICE.ADMIN_DEVICE_TYPE)[keyof typeof ADMIN_DEVICE.ADMIN_DEVICE_TYPE];
export type AdminDeviceStatus =
  (typeof ADMIN_DEVICE.ADMIN_DEVICE_STATUS)[keyof typeof ADMIN_DEVICE.ADMIN_DEVICE_STATUS];
export type AdminDeviceSecurity =
  (typeof ADMIN_DEVICE.SECURITY)[keyof typeof ADMIN_DEVICE.SECURITY];
