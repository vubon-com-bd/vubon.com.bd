/**
 * Admin Constants Index
 * Export all admin module constants for easy importing
 */

// Admin Core
export {
  ADMIN,
  isAdminActive,
  isAdminSuspended,
  isAdminBanned,
  hasAdminPermission,
  getAdminRoleLabel as getAdminRoleLabelCore,
  getAdminLevelName as getAdminLevelNameCore,
  getAdminDepartmentLabel as getAdminDepartmentLabelCore,
  getAdminTeamLabel as getAdminTeamLabelCore,
  getAdminPermissionLabel as getAdminPermissionLabelCore,
  isAdminUser,
} from './admin.constants';

export type {
  AdminRole,
  AdminType,
  AdminStatus,
  AdminLevel,
  AdminDepartment,
  AdminTeam,
  AdminPermission,
} from './admin.constants';

// Admin Role
export {
  ADMIN_ROLE,
  ADMIN_ROLE_PRIORITY,
  ADMIN_ROLE_LABELS,
  ADMIN_ROLE_DESCRIPTIONS,
  ADMIN_ROLE_PERMISSIONS,
  getAdminRoleLabel,
  getAdminRoleDescription,
  getAdminRolePriority,
  hasAdminRolePermission,
  isSuperAdmin,
  isAdmin,
  isManager,
  isModerator,
  getAdminRoles,
  getAdminRoleByLabel,
} from './admin-role.constants';

export type {
  AdminRoleType,
  AdminRolePriority,
  AdminRoleLabel,
  AdminRoleDescription,
} from './admin-role.constants';

// Admin Permission
export {
  ADMIN_PERMISSION,
  ADMIN_PERMISSION_GROUPS,
  ADMIN_PERMISSION_LABELS,
  getAdminPermissionLabel,
  getAdminPermissionsByGroup,
  getAllAdminPermissions,
  isWildcardPermission,
  matchPermission,
} from './admin-permission.constants';

export type {
  AdminPermissionType,
  AdminPermissionGroup,
  AdminPermissionLabel,
} from './admin-permission.constants';

// Admin Status
export {
  ADMIN_STATUS,
  ADMIN_STATUS_LABELS,
  ADMIN_STATUS_COLORS,
  ADMIN_STATUS_ICONS,
  ADMIN_STATUS_ORDER,
  ACTIVE_ADMIN_STATUSES,
  INACTIVE_ADMIN_STATUSES,
  ARCHIVED_ADMIN_STATUSES,
  getAdminStatusLabel,
  getAdminStatusColor,
  getAdminStatusIcon,
  getAdminStatusOrder,
  isActiveAdminStatus,
  isInactiveAdminStatus,
  isArchivedAdminStatus,
  canAdminLogin,
  canAdminAccessDashboard,
  isAdminBannedOrSuspended,
  getAdminStatusByLabel,
  getAllAdminStatuses,
} from './admin-status.constants';

export type {
  AdminStatusType,
  AdminStatusLabel,
  AdminStatusColor,
  AdminStatusIcon,
  AdminStatusOrder,
} from './admin-status.constants';

// Admin Type
export {
  ADMIN_TYPE,
  ADMIN_TYPE_LABELS,
  ADMIN_TYPE_DESCRIPTIONS,
  ADMIN_TYPE_REQUIREMENTS,
  INTERNAL_ADMIN_TYPES,
  EXTERNAL_ADMIN_TYPES,
  EMPLOYMENT_ADMIN_TYPES,
  MANAGEMENT_ADMIN_TYPES,
  getAdminTypeLabel,
  getAdminTypeDescription,
  getAdminTypeRequirements,
  isInternalAdminType,
  isExternalAdminType,
  isEmploymentAdminType,
  isManagementAdminType,
  getAdminTypes,
} from './admin-type.constants';

export type {
  AdminTypeType,
  AdminTypeLabel,
  AdminTypeDescription,
  AdminTypeRequirement,
} from './admin-type.constants';

// Admin Level
export {
  ADMIN_LEVEL,
  ADMIN_LEVEL_NAMES,
  ADMIN_LEVEL_REQUIREMENTS,
  ADMIN_LEVEL_PERMISSIONS,
  getAdminLevelName,
  getAdminLevelRequirements,
  getAdminLevelPermissions,
  isEntryLevel,
  isMidLevel,
  isSeniorLevel,
  isExecutiveLevel,
  getAdminLevelByExperience,
  getAdminLevels,
} from './admin-level.constants';

export type {
  AdminLevelType,
  AdminLevelName,
  AdminLevelRequirement,
  AdminLevelPermissions,
} from './admin-level.constants';

// Admin Department
export {
  ADMIN_DEPARTMENT,
  ADMIN_DEPARTMENT_LABELS,
  ADMIN_DEPARTMENT_DESCRIPTIONS,
  ADMIN_DEPARTMENT_HEAD_COUNT,
  ADMIN_DEPARTMENT_BUDGET,
  TECH_DEPARTMENTS,
  BUSINESS_DEPARTMENTS,
  SUPPORT_DEPARTMENTS,
  getAdminDepartmentLabel,
  getAdminDepartmentDescription,
  getAdminDepartmentHeadCount,
  getAdminDepartmentBudget,
  isTechDepartment,
  isBusinessDepartment,
  isSupportDepartment,
  getAdminDepartments,
} from './admin-department.constants';

export type {
  AdminDepartmentType,
  AdminDepartmentLabel,
  AdminDepartmentDescription,
  AdminDepartmentHeadCount,
  AdminDepartmentBudget,
} from './admin-department.constants';

// Admin Team
export {
  ADMIN_TEAM,
  ADMIN_TEAM_LABELS,
  ADMIN_TEAM_DESCRIPTIONS,
  ADMIN_TEAM_MEMBERS,
  ADMIN_TEAM_SKILLS,
  ENGINEERING_TEAMS,
  DATA_TEAMS,
  INFRASTRUCTURE_TEAMS,
  getAdminTeamLabel,
  getAdminTeamDescription,
  getAdminTeamMembers,
  getAdminTeamSkills,
  isEngineeringTeam,
  isDataTeam,
  isInfrastructureTeam,
  getAdminTeams,
  getTeamSkillsList,
} from './admin-team.constants';

export type {
  AdminTeamType,
  AdminTeamLabel,
  AdminTeamDescription,
  AdminTeamMembers,
  AdminTeamSkills,
} from './admin-team.constants';

// Admin Activity
export {
  ADMIN_ACTIVITY,
  ADMIN_ACTIVITY_TYPE_LABELS,
  ADMIN_ACTIVITY_STATUS_LABELS,
  ADMIN_ACTIVITY_SEVERITY_COLORS,
  getAdminActivityTypeLabel,
  getAdminActivityStatusLabel,
  getAdminActivitySeverityColor,
  isSuccessfulActivity,
  isFailedActivity,
  isPendingActivity,
  isTerminalActivity,
} from './activity/admin-activity.constants';

export type {
  AdminActivityType,
  AdminActivityStatus,
  AdminActivitySeverity,
  AdminActivityCategory,
  AdminActivitySource,
  AdminActivityAction,
} from './activity/admin-activity.constants';

// Admin Log - শুধু অ্যাডমিন স্পেসিফিক ফাংশন
export {
  ADMIN_LOG,
  ADMIN_LOG_LEVEL_LABELS,
  ADMIN_LOG_LEVEL_PRIORITY,
  ADMIN_LOG_LEVEL_COLORS,
  ADMIN_LOG_CATEGORY_LABELS,
  getAdminLogLevelLabel,
  getAdminLogLevelPriority,
  getAdminLogLevelColor,
  getAdminLogCategoryLabel,
  isCriticalLevel,
  isErrorLevel,
  isWarningLevel,
  isInfoLevel,
  isDebugLevel,
  shouldLogLevel,
  getLogRetentionDays,
  getLogSizeLimit,
  getLogRotationLabel,
  isAdminAuditLog,
  isAdminPerformanceLog,
  isAdminSecurityLog,
  isAdminSystemLog,
} from './log/admin-log.constants';

export type {
  AdminLogLevel,
  AdminLogCategory,
  AdminLogFormat,
  AdminLogDestination,
  AdminLogRetention,
  AdminLogSizeLimit,
  AdminLogRotation,
} from './log/admin-log.constants';

// Admin Log Type
export {
  ADMIN_LOG_TYPE,
  ADMIN_LOG_TYPE_CATEGORIES,
  ADMIN_LOG_TYPE_LABELS_DETAIL,
  getAdminLogTypeCategory,
  getAdminLogTypeLabel,
  isSecurityLog,
  isSystemLog,
  isAuditLog,
  isPerformanceLog,
  isAccessLog,
} from './log/admin-log-type.constants';

export type { AdminLogTypeDetail } from './log/admin-log-type.constants';

// Admin Log Status
export {
  ADMIN_LOG_STATUS,
  ADMIN_LOG_STATUS_LABELS_DETAIL,
  ADMIN_LOG_STATUS_COLORS_DETAIL,
  ADMIN_LOG_STATUS_GROUPS,
  getAdminLogStatusLabel,
  getAdminLogStatusColor,
  isSuccessStatus as isLogSuccessStatus,
  isFailureStatus as isLogFailureStatus,
  isPendingStatus as isLogPendingStatus,
  isIntermediateStatus as isLogIntermediateStatus,
  isTerminalStatus as isLogTerminalStatus,
  isActiveStatus as isLogActiveStatus,
  getStatusPriority as getLogStatusPriority,
  getAdminLogStatuses,
  getSuccessStatuses as getLogSuccessStatuses,
  getFailureStatuses as getLogFailureStatuses,
  getPendingStatuses as getLogPendingStatuses,
  getIntermediateStatuses as getLogIntermediateStatuses,
} from './log/admin-log-status.constants';

export type { AdminLogStatusDetail } from './log/admin-log-status.constants';

// Admin Audit
export {
  ADMIN_AUDIT,
  ADMIN_AUDIT_ACTION_LABELS,
  ADMIN_AUDIT_SEVERITY_LABELS,
  ADMIN_AUDIT_SEVERITY_COLORS,
  ADMIN_AUDIT_SEVERITY_PRIORITY,
  ADMIN_AUDIT_CATEGORY_LABELS,
  ADMIN_AUDIT_STATUS_LABELS,
  ADMIN_AUDIT_STATUS_COLORS,
  ADMIN_AUDIT_SOURCE_LABELS,
  getAdminAuditActionLabel,
  getAdminAuditSeverityLabel,
  getAdminAuditSeverityColor,
  getAdminAuditSeverityPriority,
  getAdminAuditCategoryLabel,
  getAdminAuditStatusLabel,
  getAdminAuditStatusColor,
  getAdminAuditSourceLabel,
  isHighSeverity,
  isSuccessStatus as isAuditSuccessStatus,
  isFailureStatus as isAuditFailureStatus,
  isPendingStatus as isAuditPendingStatus,
  getAuditRetentionDays,
} from './audit/admin-audit.constants';

export type {
  AdminAuditAction,
  AdminAuditSeverity,
  AdminAuditCategory,
  AdminAuditStatus,
  AdminAuditSource,
  AdminAuditRetention,
} from './audit/admin-audit.constants';

// Admin Session
export {
  ADMIN_SESSION,
  ADMIN_SESSION_STATUS_LABELS,
  ADMIN_SESSION_STATUS_COLORS,
  ADMIN_SESSION_TYPE_LABELS,
  ADMIN_SESSION_TYPE_ICONS,
  ADMIN_SESSION_SECURITY_LABELS,
  ADMIN_SESSION_SECURITY_PRIORITY,
  getAdminSessionStatusLabel,
  getAdminSessionStatusColor,
  getAdminSessionTypeLabel,
  getAdminSessionTypeIcon,
  getAdminSessionSecurityLabel,
  getAdminSessionSecurityPriority,
  getAdminSessionTimeout,
  isActiveSession,
  isInactiveSession,
  isTerminatedSession,
  isValidSessionType,
  isHighSecurityLevel as isSessionHighSecurityLevel,
  shouldValidateIP,
  getSessionLifetime,
  getSessionTimeoutSeconds,
} from './session/admin-session.constants';

export type {
  AdminSessionStatus,
  AdminSessionType,
  AdminSessionSecurityLevel,
  AdminSessionTimeout,
  AdminSessionStorage,
  AdminSessionFlag,
} from './session/admin-session.constants';

// Admin Device - রিনেম করা ফাংশন
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
  isAdminDeviceActive,
  isAdminDeviceInactive,
  isAdminDeviceBlocked,
  isAdminDeviceLostOrStolen,
  isAdminDeviceVerifiable,
  isAdminTrustedDevice,
  isAdminMobileDevice,
  isAdminDesktopDevice,
  getAdminDeviceTypeFromPlatform,
} from './device';

export type {
  AdminDeviceType,
  AdminDeviceStatus,
  AdminDevicePlatform,
  AdminDeviceTrustLevel,
  AdminDeviceVerificationMethod,
  AdminDeviceFeature,
} from './device';

// Admin Verification - রিনেম করা ফাংশন
export {
  ADMIN_VERIFICATION,
  ADMIN_VERIFICATION_TYPE_LABELS,
  ADMIN_VERIFICATION_TYPE_ICONS,
  ADMIN_VERIFICATION_STATUS_LABELS,
  ADMIN_VERIFICATION_STATUS_COLORS,
  ADMIN_VERIFICATION_METHOD_LABELS,
  ADMIN_VERIFICATION_LEVEL_LABELS,
  ADMIN_VERIFICATION_LEVEL_PRIORITY,
  ADMIN_VERIFICATION_PURPOSE_LABELS,
  ADMIN_VERIFICATION_CHANNEL_LABELS,
  getAdminVerificationTypeLabel,
  getAdminVerificationTypeIcon,
  getAdminVerificationStatusLabel,
  getAdminVerificationStatusColor,
  getAdminVerificationMethodLabel,
  getAdminVerificationLevelLabel,
  getAdminVerificationLevelPriority,
  getAdminVerificationPurposeLabel,
  getAdminVerificationChannelLabel,
  isAdminVerificationComplete,
  isAdminVerificationFailed,
  isAdminVerificationPending,
  isAdminVerificationExpired,
  isAdminVerificationTerminal,
  getAdminVerificationLevelForType,
  getAdminVerificationMethodsForType,
} from './verification';

export type {
  AdminVerificationType,
  AdminVerificationStatus,
  AdminVerificationMethod,
  AdminVerificationLevel,
  AdminVerificationPurpose,
  AdminVerificationChannel,
} from './verification';

// Admin 2FA
export {
  ADMIN_2FA,
  ADMIN_2FA_METHOD_LABELS,
  ADMIN_2FA_METHOD_ICONS,
  ADMIN_2FA_STATUS_LABELS,
  ADMIN_2FA_STATUS_COLORS,
  ADMIN_2FA_SECURITY_LEVEL_LABELS,
  ADMIN_2FA_SECURITY_LEVEL_PRIORITY,
  ADMIN_2FA_VERIFICATION_TYPE_LABELS,
  ADMIN_2FA_CHANNEL_LABELS,
  getAdmin2FAMethodLabel,
  getAdmin2FAMethodIcon,
  getAdmin2FAStatusLabel,
  getAdmin2FAStatusColor,
  getAdmin2FASecurityLevelLabel,
  getAdmin2FASecurityLevelPriority,
  getAdmin2FAVerificationTypeLabel,
  getAdmin2FAChannelLabel,
  is2FAEnabled,
  is2FADisabled,
  is2FAExpired,
  is2FALocked,
  get2FATimeout,
  get2FASecurityLevel,
  get2FAChannels,
} from './2fa/admin-2fa.constants';

export type {
  Admin2FAMethod,
  Admin2FAStatus,
  Admin2FASecurityLevel,
  Admin2FAVerificationType,
  Admin2FATimeout,
  Admin2FARecovery,
  Admin2FAChannel,
  Admin2FAAlgorithm,
  Admin2FATokenFormat,
} from './2fa/admin-2fa.constants';

// Admin Biometric - রিনেম করা ফাংশন
export {
  ADMIN_BIOMETRIC,
  ADMIN_BIOMETRIC_TYPE_LABELS,
  ADMIN_BIOMETRIC_TYPE_ICONS,
  ADMIN_BIOMETRIC_STATUS_LABELS,
  ADMIN_BIOMETRIC_STATUS_COLORS,
  ADMIN_BIOMETRIC_SECURITY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_SECURITY_LEVEL_PRIORITY,
  ADMIN_BIOMETRIC_ACCURACY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_VERIFICATION_METHOD_LABELS,
  ADMIN_BIOMETRIC_CONFIDENCE_LEVEL_LABELS,
  ADMIN_BIOMETRIC_SENSOR_LABELS,
  ADMIN_BIOMETRIC_QUALITY_LEVEL_LABELS,
  ADMIN_BIOMETRIC_CAPTURE_METHOD_LABELS,
  getAdminBiometricTypeLabel,
  getAdminBiometricTypeIcon,
  getAdminBiometricStatusLabel,
  getAdminBiometricStatusColor,
  getAdminBiometricSecurityLevelLabel,
  getAdminBiometricSecurityLevelPriority,
  getAdminBiometricAccuracyLevelLabel,
  getAdminBiometricVerificationMethodLabel,
  getAdminBiometricConfidenceLevelLabel,
  getAdminBiometricSensorLabel,
  getAdminBiometricQualityLevelLabel,
  getAdminBiometricCaptureMethodLabel,
  isAdminBiometricActive,
  isAdminBiometricInactive,
  isAdminBiometricLocked,
  isAdminBiometricFailed,
  getAdminBiometricTimeout,
  getAdminBiometricSecurityLevel,
  getAdminBiometricAccuracyLevel,
} from './biometric';

export type {
  AdminBiometricType,
  AdminBiometricStatus,
  AdminBiometricSecurityLevel,
  AdminBiometricAccuracyLevel,
  AdminBiometricVerificationMethod,
  AdminBiometricConfidenceLevel,
  AdminBiometricSensor,
  AdminBiometricQualityLevel,
  AdminBiometricCaptureMethod,
} from './biometric';

// Admin Settings - শুধু ম্যান্ডেটরি এক্সপোর্ট
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
  isAdminSettingsActive,
  isAdminSettingsInactive,
  isAdminSettingsLocked,
  isAdminSettingsSynced,
  isVisibleSettings,
  getSettingsModification,
  getSettingsSourceLabel,
} from './settings';

export type {
  AdminSettingsCategory,
  AdminSettingsType,
  AdminSettingsStatus,
  AdminSettingsScope,
  AdminSettingsVisibility,
  AdminSettingsSensitivity,
  AdminSettingsPriority,
  AdminSettingsGroup,
} from './settings';

// Admin Notification
export {
  ADMIN_NOTIFICATION,
  ADMIN_NOTIFICATION_CHANNEL_LABELS,
  ADMIN_NOTIFICATION_CHANNEL_ICONS,
  ADMIN_NOTIFICATION_TYPE_LABELS,
  ADMIN_NOTIFICATION_TYPE_COLORS,
  ADMIN_NOTIFICATION_STATUS_LABELS,
  ADMIN_NOTIFICATION_STATUS_COLORS,
  ADMIN_NOTIFICATION_PRIORITY_LABELS,
  ADMIN_NOTIFICATION_PRIORITY_LEVELS,
  ADMIN_NOTIFICATION_CATEGORY_LABELS,
  ADMIN_NOTIFICATION_DELIVERY_LABELS,
  ADMIN_NOTIFICATION_ACTION_LABELS,
  getAdminNotificationChannelLabel,
  getAdminNotificationChannelIcon,
  getAdminNotificationTypeLabel,
  getAdminNotificationTypeColor,
  getAdminNotificationStatusLabel,
  getAdminNotificationStatusColor,
  getAdminNotificationPriorityLabel,
  getAdminNotificationPriorityLevel,
  getAdminNotificationCategoryLabel,
  getAdminNotificationDeliveryLabel,
  getAdminNotificationActionLabel,
  isNotificationDelivered,
  isNotificationFailed,
  isNotificationPending,
  isNotificationRead,
  getNotificationTimeout,
  getNotificationTemplateLabel,
} from './notification/admin-notification.constants';

export type {
  AdminNotificationChannel,
  AdminNotificationType,
  AdminNotificationStatus,
  AdminNotificationPriority,
  AdminNotificationCategory,
  AdminNotificationTemplate,
  AdminNotificationDelivery,
  AdminNotificationAction,
} from './notification/admin-notification.constants';

// Admin Error
export {
  ADMIN_ERROR,
  ADMIN_ERROR_CATEGORY_LABELS,
  ADMIN_ERROR_SEVERITY_LABELS,
  ADMIN_ERROR_SEVERITY_COLORS,
  ADMIN_ERROR_TYPE_LABELS,
  ADMIN_ERROR_SOURCE_LABELS,
  ADMIN_ERROR_ACTION_LABELS,
  getAdminErrorCategoryLabel,
  getAdminErrorSeverityLabel,
  getAdminErrorSeverityColor,
  getAdminErrorTypeLabel,
  getAdminErrorSourceLabel,
  getAdminErrorActionLabel,
  isCriticalError,
  isRecoverableError,
  shouldRetryError,
  getErrorCodeCategory,
  getErrorTypeFromCode,
} from './admin-error.constants';

export type {
  AdminErrorCategory,
  AdminErrorSeverity,
  AdminErrorType,
  AdminErrorCode,
  AdminErrorSource,
  AdminErrorAction,
} from './admin-error.constants';
