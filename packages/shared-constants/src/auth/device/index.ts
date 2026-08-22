/**
 * Device Constants Index
 * Export all device constants and types for easy importing
 */

// Device
export {
  AUTH_DEVICE,
  DEVICE_PLATFORMS,
  DEVICE_TRUST_LEVELS,
  DEVICE_EVENTS,
  DEVICE_CONFIG,
  DEVICE_DEFAULTS,
  DEVICE_PLATFORMS_LIST,
  MOBILE_PLATFORMS,
  DESKTOP_PLATFORMS,
  EMBEDDED_PLATFORMS,
  isDevicePlatform,
  isMobilePlatform,
  isDesktopPlatform,
  isEmbeddedPlatform,
  getDevicePlatformLabel,
  getDevicePlatformIcon,
  getDeviceTrustLevel,
  getDeviceTrustLevelLabel,
  getDeviceTrustLevelColor,
  getMaxDevicesPerUser,
  getMaxActiveSessions,
  getSessionTimeoutMinutes,
  getRememberMeDays,
  isDeviceTrusted as isDeviceTrustedLevel,
  isDeviceUntrusted as isDeviceUntrustedLevel,
  getDeviceTrustLevelFromHistory,
} from './auth-device.constants';

export type {
  AuthDeviceConfig,
  AuthDevicePlatform,
  AuthDeviceTrustLevel,
  AuthDeviceEvent,
  AuthDeviceDefaults,
} from './auth-device.constants';

// Device Types
export {
  AUTH_DEVICE_TYPE,
  PRIMARY_DEVICE_TYPES,
  BROWSER_TYPES,
  MOBILE_OS_TYPES,
  DESKTOP_OS_TYPES,
  BROWSER_ENGINE_TYPES,
  DEVICE_CAPABILITIES,
  MOBILE_DEVICE_TYPES,
  DESKTOP_DEVICE_TYPES,
  TOUCH_DEVICE_TYPES,
  isPrimaryDeviceType,
  isBrowserType,
  isMobileOSType,
  isDesktopOSType,
  isBrowserEngineType,
  isDeviceCapability,
  getDeviceTypeLabel,
  getDeviceTypeIcon,
  getDeviceTypeCategory,
  isMobileDevice,
  isDesktopDevice,
  isTouchDevice,
} from './auth-device-type.constants';

export type { AuthDeviceType } from './auth-device-type.constants';

// Device Status
export {
  AUTH_DEVICE_STATUS,
  ACTIVE_DEVICE_STATUSES,
  INACTIVE_DEVICE_STATUSES,
  PENDING_DEVICE_STATUSES,
  BLOCKED_DEVICE_STATUSES,
  SECURITY_DEVICE_STATUSES,
  TRUSTED_DEVICE_STATUSES,
  UNTRUSTED_DEVICE_STATUSES,
  isDeviceActive,
  isDeviceInactive,
  isDevicePending,
  isDeviceBlocked,
  isDeviceSecurityIssue,
  isDeviceTrusted as isDeviceTrustedStatus,
  isDeviceUntrusted as isDeviceUntrustedStatus,
  getDeviceStatusLabel,
  getDeviceStatusColor,
  getDeviceStatusPriority,
  getDeviceStatusBadgeType,
} from './auth-device-status.constants';

export type { AuthDeviceStatus } from './auth-device-status.constants';
