/**
 * Notification Device Constants Index
 * Export all notification device constants and types for easy importing
 */

// Notification Device Constants
export {
  NOTIFICATIONDEVICE,
  notificationdeviceGetTypeLabel,
  notificationdeviceGetPlatformLabel,
  notificationdeviceGetStatusLabel,
  notificationdeviceGetCapabilityLabel,
  notificationdeviceGetTrustLevelLabel,
  notificationdeviceGetErrorLabel,
  notificationdeviceGetDefaultMaxDevices,
  notificationdeviceIsMobile,
  notificationdeviceIsDesktop,
  notificationdeviceIsActive,
  notificationdeviceIsAndroid,
  notificationdeviceIsIOS,
  notificationdeviceIsWeb,
} from './notification-device.constants';

export type {
  NotificationDeviceType,
  NotificationDevicePlatform,
  NotificationDeviceStatus,
  NotificationDeviceCapability,
  NotificationDeviceTrustLevel,
  NotificationDeviceDefault,
  NotificationDeviceLimit,
  NotificationDeviceError,
} from './notification-device.constants';

// Notification Device Type Constants
export {
  NOTIFICATIONDEVICE_TYPE,
  notificationdeviceGetCategoryLabel,
  notificationdeviceGetSubTypeLabel,
  notificationdeviceGetFormFactorLabel,
  notificationdeviceGetOSTypeLabel,
  notificationdeviceGetConnectivityLabel,
  notificationdeviceIsMobileCategory,
  notificationdeviceIsDesktopCategory,
  notificationdeviceIsTVCategory,
  notificationdeviceIsConsoleCategory,
  notificationdeviceIsIoTCategory,
} from './notification-device-type.constants';

export type {
  NotificationDeviceCategoryType,
  NotificationDeviceSubType,
  NotificationDeviceFormFactor,
  NotificationDeviceOSType,
  NotificationDeviceConnectivity,
} from './notification-device-type.constants';

// Notification Device Status Constants
export {
  NOTIFICATIONDEVICE_STATUS,
  notificationdeviceGetStatusColor as notificationDeviceGetStatusColor,
  notificationdeviceGetStatusCategory as notificationDeviceGetStatusCategory,
  notificationdeviceIsActive as notificationDeviceIsActive,
  notificationdeviceIsRegistered,
  notificationdeviceIsBlocked,
  notificationdeviceIsPending as notificationDeviceIsPending,
  notificationdeviceCanTransition as notificationDeviceCanTransition,
} from './notification-device-status.constants';

export type {
  NotificationDeviceStatusType,
  NotificationDeviceStatusColor,
  NotificationDeviceStatusCategory,
  NotificationDeviceStatusOrder,
  NotificationDeviceStatusTransition,
} from './notification-device-status.constants';
