/**
 * Admin Device Constants Index
 * Export all admin device constants for easy importing
 */

// Admin Device Core Constants
export {
  ADMIN_DEVICE,
  ADMIN_DEVICE_TYPE_LABELS,
  ADMIN_DEVICE_TYPE_ICONS,
  ADMIN_DEVICE_STATUS_LABELS,
  ADMIN_DEVICE_STATUS_COLORS,
  ADMIN_DEVICE_PLATFORM_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_PRIORITY,
  getAdminDeviceTypeLabel,
  getAdminDeviceTypeIcon,
  getAdminDeviceStatusLabel,
  getAdminDeviceStatusColor,
  getAdminDevicePlatformLabel,
  getAdminDeviceTrustLevelLabel,
  getAdminDeviceTrustLevelPriority,
  isDeviceActive,
  isDeviceInactive,
  isDeviceBlocked,
  isDeviceLostOrStolen,
  isDeviceVerifiable,
  isTrustedDevice,
  isMobileDevice,
  isDesktopDevice,
  getDeviceTypeFromPlatform,
} from './admin-device.constants';

export type {
  AdminDeviceType,
  AdminDeviceStatus,
  AdminDevicePlatform,
  AdminDeviceTrustLevel,
  AdminDeviceVerificationMethod,
  AdminDeviceFeature,
} from './admin-device.constants';

// Admin Device Type Constants
export {
  ADMIN_DEVICE_TYPE,
  ADMIN_DEVICE_TYPE_CATEGORIES,
  ADMIN_DEVICE_TYPE_LABELS_DETAIL,
  getAdminDeviceTypeCategory,
  getAdminDeviceTypeLabel as getAdminDeviceTypeLabelDetail,
  isMobileDeviceType,
  isComputerType,
  isWearableType,
  isIoTType,
  isVirtualType,
  isNetworkType,
  isGamingType,
  getDeviceCategoryForType,
} from './admin-device-type.constants';

export type { AdminDeviceTypeDetail } from './admin-device-type.constants';

// Admin Device Status Constants
export {
  ADMIN_DEVICE_STATUS,
  ADMIN_DEVICE_STATUS_LABELS_DETAIL,
  ADMIN_DEVICE_STATUS_COLORS_DETAIL,
  ADMIN_DEVICE_STATUS_GROUPS,
  getAdminDeviceStatusLabel as getAdminDeviceStatusLabelDetail,
  getAdminDeviceStatusColor as getAdminDeviceStatusColorDetail,
  isActiveStatus,
  isInactiveStatus,
  isProblemStatus,
  isSecurityStatus,
  isAdministrativeStatus,
  isEndOfLifeStatus,
  isPhysicalStatus,
  isUsableStatus,
  isAvailableStatus,
  isUnavailableStatus,
  isBlockedStatus,
  getStatusPriority,
  getAdminDeviceStatuses,
  getActiveStatuses,
  getInactiveStatuses,
  getProblemStatuses,
  getSecurityStatuses,
  getAdministrativeStatuses,
  getEndOfLifeStatuses,
  getPhysicalStatuses,
} from './admin-device-status.constants';

export type { AdminDeviceStatusDetail } from './admin-device-status.constants';
