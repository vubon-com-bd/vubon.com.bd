/**
 * Admin Settings Constants Index
 * Export all admin settings constants for easy importing
 */

// Core Settings Constants
export {
  ADMIN_SETTINGS,
  ADMIN_SETTINGS_CATEGORY_LABELS,
  ADMIN_SETTINGS_CATEGORY_ICONS,
  ADMIN_SETTINGS_TYPE_LABELS,
  ADMIN_SETTINGS_STATUS_LABELS,
  ADMIN_SETTINGS_STATUS_COLORS,
  ADMIN_SETTINGS_SCOPE_LABELS,
  ADMIN_SETTINGS_VISIBILITY_LABELS,
  ADMIN_SETTINGS_SENSITIVITY_LABELS,
  ADMIN_SETTINGS_SENSITIVITY_COLORS,
  ADMIN_SETTINGS_PRIORITY_LABELS,
  ADMIN_SETTINGS_GROUP_LABELS,
  getAdminSettingsCategoryLabel,
  getAdminSettingsCategoryIcon,
  getAdminSettingsTypeLabel,
  getAdminSettingsStatusLabel,
  getAdminSettingsStatusColor,
  getAdminSettingsScopeLabel,
  getAdminSettingsVisibilityLabel,
  getAdminSettingsSensitivityLabel,
  getAdminSettingsSensitivityColor,
  getAdminSettingsPriorityLabel,
  getAdminSettingsGroupLabel,
  // রিনেম করা ফাংশন
  isAdminSettingsActive,
  isAdminSettingsInactive,
  isAdminSettingsLocked,
  isAdminSettingsSynced,
  isHighSensitivity as isSettingsHighSensitivity,
  isVisibleSettings,
  getSettingsModification,
  getSettingsSourceLabel,
} from './admin-settings.constants';

export type {
  AdminSettingsCategory,
  AdminSettingsType,
  AdminSettingsStatus,
  AdminSettingsScope,
  AdminSettingsVisibility,
  AdminSettingsSensitivity,
  AdminSettingsValidation,
  AdminSettingsModification,
  AdminSettingsSource,
  AdminSettingsPriority,
  AdminSettingsGroup,
} from './admin-settings.constants';

// Settings Type Constants
export {
  ADMIN_SETTINGS_TYPE,
  ADMIN_SETTINGS_TYPE_CATEGORIES,
  ADMIN_SETTINGS_TYPE_LABELS_DETAIL,
  getAdminSettingsTypeCategory,
  getAdminSettingsTypeLabel as getAdminSettingsTypeLabelDetail,
  isBasicType,
  isComplexType,
  isTextType,
  isNumericType,
  isDateTimeType,
  isContactType,
  isSelectionType,
  isRangeType,
  isFileType,
  isSecurityType as isSettingsSecurityType,
  isIntegrationType,
  isSystemType as isSettingsSystemType,
  isUIType,
  getSettingsTypeCategory,
} from './admin-settings-type.constants';

export type { AdminSettingsTypeDetail } from './admin-settings-type.constants';

// Settings Status Constants
export {
  ADMIN_SETTINGS_STATUS,
  ADMIN_SETTINGS_STATUS_LABELS_DETAIL,
  ADMIN_SETTINGS_STATUS_COLORS_DETAIL,
  ADMIN_SETTINGS_STATUS_GROUPS,
  getAdminSettingsStatusLabel as getAdminSettingsStatusLabelDetail,
  getAdminSettingsStatusColor as getAdminSettingsStatusColorDetail,
  isLifecycleStatus as isSettingsLifecycleStatus,
  isValidationStatus as isSettingsValidationStatus,
  isSyncStatus as isSettingsSyncStatus,
  isStateStatus as isSettingsStateStatus,
  isSecurityStatus as isSettingsSecurityStatus,
  isApplicationStatus,
  isVersionStatus as isSettingsVersionStatus,
  isConflictStatus as isSettingsConflictStatus,
  isPriorityStatus as isSettingsPriorityStatus,
  isModificationStatus,
  isActiveStatus as isSettingsActiveStatus,
  isInactiveStatus as isSettingsInactiveStatus,
  isPendingStatus as isSettingsPendingStatus,
  isTerminalStatus as isSettingsTerminalStatus,
  isConflictStatusType,
  getStatusPriority as getSettingsStatusPriority,
  getAdminSettingsStatuses,
  getLifecycleStatuses as getSettingsLifecycleStatuses,
  getValidationStatuses as getSettingsValidationStatuses,
  getSyncStatuses as getSettingsSyncStatuses,
  getStateStatuses as getSettingsStateStatuses,
  getSecurityStatuses as getSettingsSecurityStatuses,
  getApplicationStatuses,
  getVersionStatuses as getSettingsVersionStatuses,
  getConflictStatuses as getSettingsConflictStatuses,
  getPriorityStatuses as getSettingsPriorityStatuses,
  getModificationStatuses,
} from './admin-settings-status.constants';

export type { AdminSettingsStatusDetail } from './admin-settings-status.constants';
