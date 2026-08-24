// Export all constants from admin-preferences.constants
export {
  ADMIN_PREFERENCES,
  ADMIN_PREFERENCES_CATEGORY_LABELS,
  ADMIN_PREFERENCES_CATEGORY_ICONS,
  ADMIN_PREFERENCES_TYPE_LABELS,
  ADMIN_PREFERENCES_STATUS_LABELS,
  ADMIN_PREFERENCES_STATUS_COLORS,
  ADMIN_PREFERENCES_SCOPE_LABELS,
  ADMIN_PREFERENCES_VISIBILITY_LABELS,
  ADMIN_PREFERENCES_SENSITIVITY_LABELS,
  ADMIN_PREFERENCES_SENSITIVITY_COLORS,
  ADMIN_PREFERENCES_GROUP_LABELS,
} from './admin-preferences.constants';

// Export all types from admin-preferences.constants
export type {
  AdminPreferenceCategory,
  AdminPreferenceType,
  AdminPreferenceStatus,
  AdminPreferenceScope,
  AdminPreferenceVisibility,
  AdminPreferenceSensitivity,
  AdminPreferenceSource,
  AdminPreferenceGroup,
} from './admin-preferences.constants';

// Export all functions from admin-preferences.constants
export {
  getAdminPreferenceCategoryLabel,
  getAdminPreferenceCategoryIcon,
  getAdminPreferenceTypeLabel,
  getAdminPreferenceStatusLabel,
  getAdminPreferenceStatusColor,
  getAdminPreferenceScopeLabel,
  getAdminPreferenceVisibilityLabel,
  getAdminPreferenceSensitivityLabel,
  getAdminPreferenceSensitivityColor,
  getAdminPreferenceGroupLabel,
  isAdminPreferenceActive,
  isAdminPreferenceInactive,
  isAdminPreferenceLocked,
  isAdminPreferenceDefault,
  isAdminPreferenceCustom,
  getAdminPreferenceSourceLabel,
} from './admin-preferences.constants';

// Export all constants from admin-preferences-type.constants
export {
  ADMIN_PREFERENCES_TYPE,
  ADMIN_PREFERENCES_TYPE_CATEGORIES,
  ADMIN_PREFERENCES_TYPE_LABELS_DETAIL,
} from './admin-preferences-type.constants';

// Export all types from admin-preferences-type.constants
export type { AdminPreferenceTypeDetail } from './admin-preferences-type.constants';

// Export all functions from admin-preferences-type.constants
export {
  getAdminPreferenceTypeCategory,
  getAdminPreferenceTypeLabel as getAdminPreferenceTypeLabelDetail,
  isAdminPreferenceDisplayType,
  isAdminPreferenceLanguageType,
  isAdminPreferenceNotificationType,
  isAdminPreferenceAccessibilityType,
  isAdminPreferenceDashboardType,
  isAdminPreferenceReportingType,
  isAdminPreferenceAnalyticsType,
  isAdminPreferenceWorkflowType,
  isAdminPreferenceTeamType,
  isAdminPreferenceSecurityType,
  isAdminPreferencePrivacyType,
  isAdminPreferencePerformanceType,
  isAdminPreferenceShortcutType,
  getAdminPreferenceTypeCategoryDuplicate,
} from './admin-preferences-type.constants';

// Export all constants from admin-preferences-status.constants
export {
  ADMIN_PREFERENCES_STATUS,
  ADMIN_PREFERENCES_STATUS_LABELS_DETAIL,
  ADMIN_PREFERENCES_STATUS_COLORS_DETAIL,
  ADMIN_PREFERENCES_STATUS_GROUPS,
} from './admin-preferences-status.constants';

// Export all types from admin-preferences-status.constants
export type { AdminPreferenceStatusDetail } from './admin-preferences-status.constants';

// Export all functions from admin-preferences-status.constants
export {
  getAdminPreferenceStatusLabel as getAdminPreferenceStatusLabelDetail,
  getAdminPreferenceStatusColor as getAdminPreferenceStatusColorDetail,
  isAdminPreferenceLifecycleStatus,
  isAdminPreferenceStateStatus,
  isAdminPreferenceConfigurationStatus,
  isAdminPreferenceSecurityStatus,
  isAdminPreferenceSyncStatus,
  isAdminPreferenceValidationStatus,
  isAdminPreferenceApplicationStatus,
  isAdminPreferenceVersionStatus,
  isAdminPreferenceActiveStatus,
  isAdminPreferenceInactiveStatus,
  isAdminPreferencePendingStatus,
  isAdminPreferenceTerminalStatus,
  isAdminPreferenceConfigurationStatusType,
  getAdminPreferenceStatusPriority,
  getAdminPreferenceStatuses,
  getAdminPreferenceLifecycleStatuses,
  getAdminPreferenceStateStatuses,
  getAdminPreferenceConfigurationStatuses,
  getAdminPreferenceSecurityStatuses,
  getAdminPreferenceSyncStatuses,
  getAdminPreferenceValidationStatuses,
  getAdminPreferenceApplicationStatuses,
  getAdminPreferenceVersionStatuses,
} from './admin-preferences-status.constants';
