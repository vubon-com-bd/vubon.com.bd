// Export all constants from admin-device.constants
export {
  ADMIN_DEVICE,
  ADMIN_DEVICE_TYPE_LABELS,
  ADMIN_DEVICE_TYPE_ICONS,
  ADMIN_DEVICE_STATUS_LABELS,
  ADMIN_DEVICE_STATUS_COLORS,
  ADMIN_DEVICE_PLATFORM_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_PRIORITY,
} from './admin-device.constants';

// Export all types from admin-device.constants
export type {
  AdminDeviceType,
  AdminDeviceStatus,
  AdminDevicePlatform,
  AdminDeviceTrustLevel,
  AdminDeviceVerificationMethod,
  AdminDeviceFeature,
} from './admin-device.constants';

// Export all functions from admin-device.constants
export {
  getAdminDeviceTypeLabel,
  getAdminDeviceTypeIcon,
  getAdminDeviceStatusLabel,
  getAdminDeviceStatusColor,
  getAdminDevicePlatformLabel,
  getAdminDeviceTrustLevelLabel,
  getAdminDeviceTrustLevelPriority,
  isAdminDeviceActive,
  isAdminDeviceInactive,
  isAdminDeviceBlocked,
  isAdminDeviceLostOrStolen,
  isAdminDeviceVerifiable,
  isAdminTrustedDevice,
  isAdminMobileDevice,
  isAdminDesktopDevice,
  getAdminDeviceTypeFromPlatform,
} from './admin-device.constants';

// Export all constants from admin-device-type.constants
export {
  ADMIN_DEVICE_TYPE,
  ADMIN_DEVICE_TYPE_CATEGORIES,
  ADMIN_DEVICE_TYPE_LABELS_DETAIL,
} from './admin-device-type.constants';

// Export all types from admin-device-type.constants
export type { AdminDeviceTypeDetail } from './admin-device-type.constants';

// Export all functions from admin-device-type.constants
export {
  getAdminDeviceTypeCategory,
  getAdminDeviceTypeLabel as getAdminDeviceTypeLabelDetail,
  isAdminMobileDeviceType,
  isAdminComputerType,
  isAdminWearableType,
  isAdminIoTType,
  isAdminVirtualType,
  isAdminNetworkType,
  isAdminGamingType,
  getAdminDeviceCategoryForType,
} from './admin-device-type.constants';

// Export all constants from admin-device-status.constants
export {
  ADMIN_DEVICE_STATUS,
  ADMIN_DEVICE_STATUS_LABELS_DETAIL,
  ADMIN_DEVICE_STATUS_COLORS_DETAIL,
  ADMIN_DEVICE_STATUS_GROUPS,
} from './admin-device-status.constants';

// Export all types from admin-device-status.constants
export type { AdminDeviceStatusDetail } from './admin-device-status.constants';

// Export all functions from admin-device-status.constants
export {
  getAdminDeviceStatusLabel as getAdminDeviceStatusLabelDetail,
  getAdminDeviceStatusColor as getAdminDeviceStatusColorDetail,
  isAdminDeviceActiveStatus,
  isAdminDeviceInactiveStatus,
  isAdminDeviceProblemStatus,
  isAdminDeviceSecurityStatus,
  isAdminDeviceAdministrativeStatus,
  isAdminDeviceEndOfLifeStatus,
  isAdminDevicePhysicalStatus,
  isAdminDeviceUsableStatus,
  isAdminDeviceAvailableStatus,
  isAdminDeviceUnavailableStatus,
  isAdminDeviceBlockedStatus,
  getAdminDeviceStatusPriority,
  getAdminDeviceStatuses,
  getAdminDeviceActiveStatuses,
  getAdminDeviceInactiveStatuses,
  getAdminDeviceProblemStatuses,
  getAdminDeviceSecurityStatuses,
  getAdminDeviceAdministrativeStatuses,
  getAdminDeviceEndOfLifeStatuses,
  getAdminDevicePhysicalStatuses,
} from './admin-device-status.constants';
