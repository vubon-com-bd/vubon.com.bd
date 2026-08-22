/**
 * Admin Preferences Constants Index
 * Export all admin preferences constants for easy importing
 */

// Admin Preferences Core Constants
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
  isPreferenceActive,
  isPreferenceInactive,
  isPreferenceLocked,
  isPreferenceDefault,
  isPreferenceCustom,
  getPreferenceSourceLabel,
} from './admin-preferences.constants';

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

// Admin Preferences Type Constants
export {
  ADMIN_PREFERENCES_TYPE,
  ADMIN_PREFERENCES_TYPE_CATEGORIES,
  ADMIN_PREFERENCES_TYPE_LABELS_DETAIL,
  getAdminPreferenceTypeCategory,
  getAdminPreferenceTypeLabel as getAdminPreferenceTypeLabelDetail,
  isDisplayPreference,
  isLanguagePreference,
  isNotificationPreference,
  isAccessibilityPreference,
  isDashboardPreference,
  isReportingPreference,
  isAnalyticsPreference,
  isWorkflowPreference,
  isTeamPreference,
  isSecurityPreference,
  isPrivacyPreference,
  isPerformancePreference,
  isShortcutPreference,
  getPreferenceTypeCategory,
} from './admin-preferences-type.constants';

export type { AdminPreferenceTypeDetail } from './admin-preferences-type.constants';

// Admin Preferences Status Constants
export {
  ADMIN_PREFERENCES_STATUS,
  ADMIN_PREFERENCES_STATUS_LABELS_DETAIL,
  ADMIN_PREFERENCES_STATUS_COLORS_DETAIL,
  ADMIN_PREFERENCES_STATUS_GROUPS,
  getAdminPreferenceStatusLabel as getAdminPreferenceStatusLabelDetail,
  getAdminPreferenceStatusColor as getAdminPreferenceStatusColorDetail,
  isLifecycleStatus,
  isStateStatus,
  isConfigurationStatus,
  isSecurityStatus,
  isSyncStatus,
  isValidationStatus,
  isApplicationStatus,
  isVersionStatus,
  isActiveStatus,
  isInactiveStatus,
  isPendingStatus,
  isTerminalStatus,
  isConfigurationStatusType,
  getStatusPriority,
  getAdminPreferenceStatuses,
  getLifecycleStatuses,
  getStateStatuses,
  getConfigurationStatuses,
  getSecurityStatuses,
  getSyncStatuses,
  getValidationStatuses,
  getApplicationStatuses,
  getVersionStatuses,
} from './admin-preferences-status.constants';

export type { AdminPreferenceStatusDetail } from './admin-preferences-status.constants';
