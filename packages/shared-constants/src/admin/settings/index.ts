/**
 * Admin Settings Constants Index
 * Export all admin settings constants for easy importing
 */

// Admin Settings Core Constants
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
  isSettingsActive,
  isSettingsInactive,
  isSettingsLocked,
  isSettingsSynced,
  isHighSensitivity,
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

// Admin Settings Type Constants
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
  isSecurityType,
  isIntegrationType,
  isSystemType,
  isUIType,
  getSettingsTypeCategory,
} from './admin-settings-type.constants';

export type { AdminSettingsTypeDetail } from './admin-settings-type.constants';

// Admin Settings Status Constants
export {
  ADMIN_SETTINGS_STATUS,
  ADMIN_SETTINGS_STATUS_LABELS_DETAIL,
  ADMIN_SETTINGS_STATUS_COLORS_DETAIL,
  ADMIN_SETTINGS_STATUS_GROUPS,
  getAdminSettingsStatusLabel as getAdminSettingsStatusLabelDetail,
  getAdminSettingsStatusColor as getAdminSettingsStatusColorDetail,
  isLifecycleStatus,
  isValidationStatus,
  isSyncStatus,
  isStateStatus,
  isSecurityStatus,
  isApplicationStatus,
  isVersionStatus,
  isConflictStatus,
  isPriorityStatus,
  isModificationStatus,
  isActiveStatus,
  isInactiveStatus,
  isPendingStatus,
  isTerminalStatus,
  isConflictStatusType,
  getStatusPriority,
  getAdminSettingsStatuses,
  getLifecycleStatuses,
  getValidationStatuses,
  getSyncStatuses,
  getStateStatuses,
  getSecurityStatuses,
  getApplicationStatuses,
  getVersionStatuses,
  getConflictStatuses,
  getPriorityStatuses,
  getModificationStatuses,
} from './admin-settings-status.constants';

export type { AdminSettingsStatusDetail } from './admin-settings-status.constants';
