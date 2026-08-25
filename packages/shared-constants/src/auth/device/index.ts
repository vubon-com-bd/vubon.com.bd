// Export all constants from auth-device.constants
export {
  AUTH_DEVICE,
  DEVICE_PLATFORMS,
  DEVICE_TRUST_LEVELS,
  DEVICE_EVENTS,
  DEVICE_CONFIG,
  DEVICE_DEFAULTS,
  AUTHDEVICE_PLATFORMS_LIST,
  AUTHDEVICE_MOBILE_PLATFORMS,
  AUTHDEVICE_DESKTOP_PLATFORMS,
  AUTHDEVICE_EMBEDDED_PLATFORMS,
} from './auth-device.constants';

// Export all types from auth-device.constants
export type {
  AuthDeviceConfig,
  AuthDevicePlatform,
  AuthDeviceTrustLevel,
  AuthDeviceEvent,
  AuthDeviceDefaults,
} from './auth-device.constants';

// Export all functions from auth-device.constants
export {
  isAuthdevicePlatform,
  isAuthdeviceMobilePlatform,
  isAuthdeviceDesktopPlatform,
  isAuthdeviceEmbeddedPlatform,
  getAuthdevicePlatformLabel,
  getAuthdevicePlatformIcon,
  getAuthdeviceTrustLevel,
  getAuthdeviceTrustLevelLabel,
  getAuthdeviceTrustLevelColor,
  getAuthdeviceMaxDevicesPerUser,
  getAuthdeviceMaxActiveSessions,
  getAuthdeviceSessionTimeoutMinutes,
  getAuthdeviceRememberMeDays,
  isAuthdeviceTrusted,
  isAuthdeviceUntrusted,
  getAuthdeviceTrustLevelFromHistory,
} from './auth-device.constants';

// Export all constants from auth-device-type.constants
export {
  AUTH_DEVICE_TYPE,
  AUTHDEVICE_PRIMARY_TYPES,
  AUTHDEVICE_BROWSER_TYPES,
  AUTHDEVICE_MOBILE_OS_TYPES,
  AUTHDEVICE_DESKTOP_OS_TYPES,
  AUTHDEVICE_BROWSER_ENGINE_TYPES,
  AUTHDEVICE_CAPABILITIES,
  AUTHDEVICE_MOBILE_TYPES,
  AUTHDEVICE_DESKTOP_TYPES,
  AUTHDEVICE_TOUCH_TYPES,
} from './auth-device-type.constants';

// Export all types from auth-device-type.constants
export type { AuthDeviceType } from './auth-device-type.constants';

// Export all functions from auth-device-type.constants
export {
  isAuthdevicePrimaryType,
  isAuthdeviceBrowserType,
  isAuthdeviceMobileOSType,
  isAuthdeviceDesktopOSType,
  isAuthdeviceBrowserEngineType,
  isAuthdeviceCapability,
  getAuthdeviceTypeLabel,
  getAuthdeviceTypeIcon,
  getAuthdeviceTypeCategory,
  isAuthdeviceMobile,
  isAuthdeviceDesktop,
  isAuthdeviceTouch,
} from './auth-device-type.constants';

// Export all constants from auth-device-status.constants
export {
  AUTH_DEVICE_STATUS,
  AUTHDEVICE_ACTIVE_STATUSES,
  AUTHDEVICE_INACTIVE_STATUSES,
  AUTHDEVICE_PENDING_STATUSES,
  AUTHDEVICE_BLOCKED_STATUSES,
  AUTHDEVICE_SECURITY_STATUSES,
  AUTHDEVICE_TRUSTED_STATUSES,
  AUTHDEVICE_UNTRUSTED_STATUSES,
} from './auth-device-status.constants';

// Export all types from auth-device-status.constants
export type { AuthDeviceStatus } from './auth-device-status.constants';

// Export all functions from auth-device-status.constants
export {
  isAuthdeviceActive,
  isAuthdeviceInactive,
  isAuthdevicePending,
  isAuthdeviceBlocked,
  isAuthdeviceSecurityIssue,
  isAuthdeviceTrusted as isAuthdeviceStatusTrusted,
  isAuthdeviceUntrusted as isAuthdeviceStatusUntrusted,
  getAuthdeviceStatusLabel,
  getAuthdeviceStatusColor,
  getAuthdeviceStatusPriority,
  getAuthdeviceStatusBadgeType,
} from './auth-device-status.constants';
