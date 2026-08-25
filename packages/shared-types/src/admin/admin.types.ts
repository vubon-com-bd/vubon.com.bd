/**
 * Admin Types
 * Type definitions for admin module based on shared-constants
 * @module AdminTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// 1. Admin Core (from admin.constants)
// ============================================================
import {
  ADMIN,
  ADMIN_CORE_STATUS_LABELS,
  ADMIN_CORE_LEVEL_NAMES,
  ADMIN_CORE_DEPARTMENT_LABELS,
  ADMIN_CORE_TEAM_LABELS,
  ADMIN_CORE_ROLE_LABELS,
  ADMIN_CORE_PERMISSION_LABELS,
  ADMIN_CORE_TYPE_LABELS,
  AdminStatus,
  AdminLevel,
  AdminDepartment,
  AdminTeam,
  AdminRole,
  AdminPermission,
  AdminType,
  isAdminActive,
  isAdminSuspended,
  isAdminBanned,
  hasAdminPermission,
  getAdminCoreRoleLabel,
  getAdminCoreLevelName,
  getAdminCoreDepartmentLabel,
  getAdminCoreTeamLabel,
  getAdminCorePermissionLabel,
  isAdminUser,
} from '@vubon/shared-constants';

// ============================================================
// 2. Admin Department (from admin-department.constants)
// ============================================================
import {
  ADMIN_DEPARTMENT,
  ADMIN_DEPARTMENT_LABELS,
  ADMIN_DEPARTMENT_DESCRIPTIONS,
  ADMIN_DEPARTMENT_HEAD_COUNT,
  ADMIN_DEPARTMENT_BUDGET,
  ADMIN_TECH_DEPARTMENTS,
  ADMIN_BUSINESS_DEPARTMENTS,
  ADMIN_SUPPORT_DEPARTMENTS,
  AdminDepartmentType,
  AdminDepartmentLabel,
  AdminDepartmentDescription,
  AdminDepartmentHeadCount,
  AdminDepartmentBudget,
  getAdminDepartmentLabel,
  getAdminDepartmentDescription,
  getAdminDepartmentHeadCount,
  getAdminDepartmentBudget,
  isAdminTechDepartment,
  isAdminBusinessDepartment,
  isAdminSupportDepartment,
  getAdminDepartments,
} from '@vubon/shared-constants';

// ============================================================
// 3. Admin Error (from admin-error.constants)
// ============================================================
import {
  ADMIN_ERROR,
  ADMIN_ERROR_CATEGORY_LABELS,
  ADMIN_ERROR_SEVERITY_LABELS,
  ADMIN_ERROR_SEVERITY_COLORS,
  ADMIN_ERROR_TYPE_LABELS,
  ADMIN_ERROR_SOURCE_LABELS,
  ADMIN_ERROR_ACTION_LABELS,
  AdminErrorCategory,
  AdminErrorSeverity,
  AdminErrorType,
  AdminErrorCode,
  AdminErrorSource,
  AdminErrorAction,
  getAdminErrorCategoryLabel,
  getAdminErrorSeverityLabel,
  getAdminErrorSeverityColor,
  getAdminErrorTypeLabel,
  getAdminErrorSourceLabel,
  getAdminErrorActionLabel,
  isAdminCriticalError,
  isAdminRecoverableError,
  shouldAdminRetryError,
  getAdminErrorCodeCategory,
  getAdminErrorTypeFromCode,
} from '@vubon/shared-constants';

// ============================================================
// 4. Admin Level (from admin-level.constants)
// ============================================================
import {
  ADMIN_LEVEL,
  ADMIN_LEVEL_NAMES,
  ADMIN_LEVEL_REQUIREMENTS,
  ADMIN_LEVEL_PERMISSIONS,
  AdminLevelType,
  AdminLevelName,
  AdminLevelRequirement,
  AdminLevelPermissions,
  getAdminLevelName,
  getAdminLevelRequirements,
  getAdminLevelPermissions,
  isAdminEntryLevel,
  isAdminMidLevel,
  isAdminSeniorLevel,
  isAdminExecutiveLevel,
  getAdminLevelByExperience,
  getAdminLevels,
} from '@vubon/shared-constants';

// ============================================================
// 5. Admin Permission (from admin-permission.constants)
// ============================================================
import {
  ADMIN_PERMISSION,
  ADMIN_PERMISSION_GROUPS,
  ADMIN_PERMISSION_LABELS,
  AdminPermissionType,
  AdminPermissionGroup,
  AdminPermissionLabel,
  getAdminPermissionLabel,
  getAdminPermissionsByGroup,
  getAllAdminPermissions,
  isAdminWildcardPermission,
  matchAdminPermission,
} from '@vubon/shared-constants';

// ============================================================
// 6. Admin Role (from admin-role.constants)
// ============================================================
import {
  ADMIN_ROLE,
  ADMIN_ROLE_PRIORITY,
  ADMIN_ROLE_LABELS,
  ADMIN_ROLE_DESCRIPTIONS,
  ADMIN_ROLE_PERMISSIONS,
  AdminRoleType,
  AdminRolePriority,
  AdminRoleLabel,
  AdminRoleDescription,
  getAdminRoleLabel,
  getAdminRoleDescription,
  getAdminRolePriority,
  hasAdminRolePermission,
  isAdminSuperAdmin,
  isAdminAdmin,
  isAdminManager,
  isAdminModerator,
  getAdminRoles,
  getAdminRoleByLabel,
} from '@vubon/shared-constants';

// ============================================================
// 7. Admin Status (from admin-status.constants)
// ============================================================
import {
  ADMIN_STATUS,
  ADMIN_STATUS_LABELS,
  ADMIN_STATUS_COLORS,
  ADMIN_STATUS_ICONS,
  ADMIN_STATUS_ORDER,
  ADMIN_ACTIVE_STATUSES,
  ADMIN_INACTIVE_STATUSES,
  ADMIN_ARCHIVED_STATUSES,
  AdminStatusType,
  AdminStatusLabel,
  AdminStatusColor,
  AdminStatusIcon,
  AdminStatusOrder,
  getAdminStatusLabel,
  getAdminStatusColor,
  getAdminStatusIcon,
  getAdminStatusOrder,
  isAdminActiveStatus,
  isAdminInactiveStatus,
  isAdminArchivedStatus,
  canAdminLogin,
  canAdminAccessDashboard,
  isAdminBannedOrSuspended,
  getAdminStatusByLabel,
  getAllAdminStatuses,
} from '@vubon/shared-constants';

// ============================================================
// 8. Admin Team (from admin-team.constants)
// ============================================================
import {
  ADMIN_TEAM,
  ADMIN_TEAM_LABELS,
  ADMIN_TEAM_DESCRIPTIONS,
  ADMIN_TEAM_MEMBERS,
  ADMIN_TEAM_SKILLS,
  ADMIN_ENGINEERING_TEAMS,
  ADMIN_DATA_TEAMS,
  ADMIN_INFRASTRUCTURE_TEAMS,
  AdminTeamType,
  AdminTeamLabel,
  AdminTeamDescription,
  AdminTeamMembers,
  AdminTeamSkills,
  getAdminTeamLabel,
  getAdminTeamDescription,
  getAdminTeamMembers,
  getAdminTeamSkills,
  isAdminEngineeringTeam,
  isAdminDataTeam,
  isAdminInfrastructureTeam,
  getAdminTeams,
  getAdminTeamSkillsList,
} from '@vubon/shared-constants';

// ============================================================
// 9. Admin Type (from admin-type.constants)
// ============================================================
import {
  ADMIN_TYPE,
  ADMIN_TYPE_LABELS,
  ADMIN_TYPE_DESCRIPTIONS,
  ADMIN_TYPE_REQUIREMENTS,
  ADMIN_INTERNAL_TYPES,
  ADMIN_EXTERNAL_TYPES,
  ADMIN_EMPLOYMENT_TYPES,
  ADMIN_MANAGEMENT_TYPES,
  AdminTypeType,
  AdminTypeLabel,
  AdminTypeDescription,
  AdminTypeRequirement,
  getAdminTypeLabel,
  getAdminTypeDescription,
  getAdminTypeRequirements,
  isAdminInternalType,
  isAdminExternalType,
  isAdminEmploymentType,
  isAdminManagementType,
  getAdminTypes,
} from '@vubon/shared-constants';

// ============================================================
// 10. Admin 2FA (from 2fa)
// ============================================================
import {
  ADMIN_2FA,
  ADMIN_2FA_METHOD_LABELS,
  ADMIN_2FA_METHOD_ICONS,
  ADMIN_2FA_STATUS_LABELS,
  ADMIN_2FA_STATUS_COLORS,
  ADMIN_2FA_SECURITY_LEVEL_LABELS,
  ADMIN_2FA_SECURITY_LEVEL_PRIORITY,
  ADMIN_2FA_VERIFICATION_TYPE_LABELS,
  ADMIN_2FA_CHANNEL_LABELS,
  Admin2FAMethod,
  Admin2FAStatus,
  Admin2FASecurityLevel,
  Admin2FAVerificationType,
  Admin2FATimeout,
  Admin2FARecovery,
  Admin2FAChannel,
  Admin2FAAlgorithm,
  Admin2FATokenFormat,
  get2faAdminMethodLabel,
  get2faAdminMethodIcon,
  get2faAdminStatusLabel,
  get2faAdminStatusColor,
  get2faAdminSecurityLevelLabel,
  get2faAdminSecurityLevelPriority,
  get2faAdminVerificationTypeLabel,
  get2faAdminChannelLabel,
  is2faAdminEnabled,
  is2faAdminDisabled,
  is2faAdminExpired,
  is2faAdminLocked,
  get2faAdminTimeout,
  get2faAdminSecurityLevel,
  get2faAdminChannels,
} from '@vubon/shared-constants';

// ============================================================
// 11. Admin Activity (from activity)
// ============================================================
import {
  ADMIN_ACTIVITY,
  ADMIN_ACTIVITY_TYPE_LABELS,
  ADMIN_ACTIVITY_STATUS_LABELS,
  ADMIN_ACTIVITY_SEVERITY_COLORS,
  AdminActivityType,
  AdminActivityStatus,
  AdminActivitySeverity,
  AdminActivityCategory,
  AdminActivitySource,
  AdminActivityAction,
  getActivityAdminTypeLabel,
  getActivityAdminStatusLabel,
  getActivityAdminSeverityColor,
  isActivityAdminSuccessful,
  isActivityAdminFailed,
  isActivityAdminPending,
  isActivityAdminTerminal,
} from '@vubon/shared-constants';

// ============================================================
// 12. Admin Audit (from audit)
// ============================================================
import {
  ADMIN_AUDIT,
  ADMIN_AUDIT_ACTION_LABELS,
  ADMIN_AUDIT_SEVERITY_LABELS,
  ADMIN_AUDIT_SEVERITY_COLORS,
  ADMIN_AUDIT_SEVERITY_PRIORITY,
  ADMIN_AUDIT_CATEGORY_LABELS,
  ADMIN_AUDIT_STATUS_LABELS,
  ADMIN_AUDIT_STATUS_COLORS,
  ADMIN_AUDIT_SOURCE_LABELS,
  AdminAuditAction,
  AdminAuditSeverity,
  AdminAuditCategory,
  AdminAuditStatus,
  AdminAuditSource,
  AdminAuditRetention,
  getAdminAuditActionLabel,
  getAdminAuditSeverityLabel,
  getAdminAuditSeverityColor,
  getAdminAuditSeverityPriority,
  getAdminAuditCategoryLabel,
  getAdminAuditStatusLabel,
  getAdminAuditStatusColor,
  getAdminAuditSourceLabel,
  isAdminAuditHighSeverity,
  isAdminAuditSuccessStatus,
  isAdminAuditFailureStatus,
  isAdminAuditPendingStatus,
  getAdminAuditRetentionDays,
} from '@vubon/shared-constants';

// ============================================================
// 13. Admin Biometric (from biometric)
// ============================================================
import {
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
  AdminBiometricType,
  AdminBiometricStatus,
  AdminBiometricSecurityLevel,
  AdminBiometricAccuracyLevel,
  AdminBiometricVerificationMethod,
  AdminBiometricConfidenceLevel,
  AdminBiometricSensor,
  AdminBiometricQualityLevel,
  AdminBiometricCaptureMethod,
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
} from '@vubon/shared-constants';

// ============================================================
// 14. Admin Device (from device)
// ============================================================
import {
  ADMIN_DEVICE,
  ADMIN_DEVICE_TYPE_LABELS,
  ADMIN_DEVICE_TYPE_ICONS,
  ADMIN_DEVICE_STATUS_LABELS,
  ADMIN_DEVICE_STATUS_COLORS,
  ADMIN_DEVICE_PLATFORM_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_PRIORITY,
  AdminDeviceType,
  AdminDeviceStatus,
  AdminDevicePlatform,
  AdminDeviceTrustLevel,
  AdminDeviceVerificationMethod,
  AdminDeviceFeature,
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
} from '@vubon/shared-constants';

// ============================================================
// 15. Admin Log (from log)
// ============================================================
import {
  ADMIN_LOG,
  ADMIN_LOG_LEVEL_LABELS,
  ADMIN_LOG_LEVEL_PRIORITY,
  ADMIN_LOG_LEVEL_COLORS,
  ADMIN_LOG_CATEGORY_LABELS,
  AdminLogLevel,
  AdminLogCategory,
  AdminLogFormat,
  AdminLogDestination,
  AdminLogRetention,
  AdminLogSizeLimit,
  AdminLogRotation,
  getAdminLogLevelLabel,
  getAdminLogLevelPriority,
  getAdminLogLevelColor,
  getAdminLogCategoryLabel,
  isAdminLogCriticalLevel,
  isAdminLogErrorLevel,
  isAdminLogWarningLevel,
  isAdminLogInfoLevel,
  isAdminLogDebugLevel,
  shouldAdminLogLevel,
  getAdminLogRetentionDays,
  getAdminLogSizeLimit,
  getAdminLogRotationLabel,
  isAdminAuditLog,
  isAdminPerformanceLog,
  isAdminSecurityLog,
  isAdminSystemLog,
} from '@vubon/shared-constants';

// ============================================================
// 16. Admin Notification (from notification)
// ============================================================
import {
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
  AdminNotificationChannel,
  AdminNotificationType,
  AdminNotificationStatus,
  AdminNotificationPriority,
  AdminNotificationCategory,
  AdminNotificationTemplate,
  AdminNotificationDelivery,
  AdminNotificationAction,
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
  isAdminNotificationDelivered,
  isAdminNotificationFailed,
  isAdminNotificationPending,
  isAdminNotificationRead,
  getAdminNotificationTimeout,
  getAdminNotificationTemplateLabel,
} from '@vubon/shared-constants';

// ============================================================
// 17. Admin Preferences (from preferences) - সঠিক নাম
// ============================================================
import {
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
  AdminPreferenceCategory,
  AdminPreferenceType,
  AdminPreferenceStatus,
  AdminPreferenceScope,
  AdminPreferenceVisibility,
  AdminPreferenceSensitivity,
  AdminPreferenceGroup,
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
} from '@vubon/shared-constants';

// ============================================================
// 18. Admin Session (from session)
// ============================================================
import {
  ADMIN_SESSION,
  ADMIN_SESSION_STATUS_LABELS,
  ADMIN_SESSION_STATUS_COLORS,
  ADMIN_SESSION_TYPE_LABELS,
  ADMIN_SESSION_TYPE_ICONS,
  ADMIN_SESSION_SECURITY_LABELS,
  ADMIN_SESSION_SECURITY_PRIORITY,
  AdminSessionStatus,
  AdminSessionType,
  AdminSessionSecurityLevel,
  AdminSessionTimeout,
  AdminSessionStorage,
  AdminSessionFlag,
  getAdminSessionStatusLabel,
  getAdminSessionStatusColor,
  getAdminSessionTypeLabel,
  getAdminSessionTypeIcon,
  getAdminSessionSecurityLabel,
  getAdminSessionSecurityPriority,
  getAdminSessionTimeout,
  isAdminSessionActive,
  isAdminSessionInactive,
  isAdminSessionTerminated,
  isAdminValidSessionType,
  isAdminHighSecurityLevel,
  shouldAdminValidateIP,
  getAdminSessionLifetime,
  getAdminSessionTimeoutSeconds,
} from '@vubon/shared-constants';

// ============================================================
// 19. Admin Settings (from settings)
// ============================================================
import {
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
  AdminSettingsCategory,
  AdminSettingsType,
  AdminSettingsStatus,
  AdminSettingsScope,
  AdminSettingsVisibility,
  AdminSettingsSensitivity,
  AdminSettingsPriority,
  AdminSettingsGroup,
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
  isAdminVisibleSettings,
  getAdminSettingsModification,
  getAdminSettingsSourceLabel,
} from '@vubon/shared-constants';

// ============================================================
// 20. Admin Verification (from verification) - ছোট হাতের v
// ============================================================
import {
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
  AdminverificationType,
  AdminverificationStatus,
  AdminverificationMethod,
  AdminverificationLevel,
  AdminverificationPurpose,
  AdminverificationChannel,
  getAdminverificationTypeLabel,
  getAdminverificationTypeIcon,
  getAdminverificationStatusLabel,
  getAdminverificationStatusColor,
  getAdminverificationMethodLabel,
  getAdminverificationLevelLabel,
  getAdminverificationLevelPriority,
  getAdminverificationPurposeLabel,
  getAdminverificationChannelLabel,
  isAdminverificationComplete,
  isAdminverificationFailed,
  isAdminverificationPending,
  isAdminverificationExpired,
  isAdminverificationTerminal,
  getAdminverificationLevelForType,
  getAdminverificationMethodsForType,
} from '@vubon/shared-constants';

// ============================================================
// Composite Admin Interfaces
// ============================================================

/**
 * Complete Admin user interface
 */
export interface AdminUser extends BaseEntity, Timestamp {
  id: ID;
  email: string;
  name: string;
  role: AdminRoleType;
  type: AdminTypeType;
  status: AdminStatusType;
  level: AdminLevelType;
  department: AdminDepartmentType;
  team: AdminTeamType;
  permissions: AdminPermissionType[];
  metadata?: Metadata;
  lastLoginAt?: Date;
  session?: AdminSession;
  settings?: AdminSettings;
  preferences?: AdminPreferences;
}

/**
 * Admin session interface
 */
export interface AdminSession extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  token: string;
  type: AdminSessionType;
  status: AdminSessionStatus;
  securityLevel: AdminSessionSecurityLevel;
  expiresAt: Date;
  lastActivityAt: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
}

/**
 * Admin settings interface
 */
export interface AdminSettings extends BaseEntity, Timestamp {
  adminId: ID;
  category: AdminSettingsCategory;
  type: AdminSettingsType;
  status: AdminSettingsStatus;
  scope: AdminSettingsScope;
  visibility: AdminSettingsVisibility;
  sensitivity: AdminSettingsSensitivity;
  priority: AdminSettingsPriority;
  group: AdminSettingsGroup;
  value: Record<string, unknown>;
  metadata?: Metadata;
}

/**
 * Admin preferences interface
 */
export interface AdminPreferences extends BaseEntity, Timestamp {
  adminId: ID;
  category: AdminPreferenceCategory;
  type: AdminPreferenceType;
  status: AdminPreferenceStatus;
  scope: AdminPreferenceScope;
  visibility: AdminPreferenceVisibility;
  sensitivity: AdminPreferenceSensitivity;
  group: AdminPreferenceGroup;
  value: Record<string, unknown>;
  metadata?: Metadata;
}

/**
 * Admin activity log entry
 */
export interface AdminActivityLog extends BaseEntity, Timestamp {
  adminId: ID;
  type: AdminActivityType;
  status: AdminActivityStatus;
  severity: AdminActivitySeverity;
  category: AdminActivityCategory;
  source: AdminActivitySource;
  action: AdminActivityAction;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

/**
 * Admin notification interface
 */
export interface AdminNotification extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  type: AdminNotificationType;
  status: AdminNotificationStatus;
  priority: AdminNotificationPriority;
  category: AdminNotificationCategory;
  channel: AdminNotificationChannel;
  title: string;
  body: string;
  isRead: boolean;
  readAt?: Date;
  deliveryStatus: string;
  actionUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core
  ADMIN,
  ADMIN_CORE_STATUS_LABELS,
  ADMIN_CORE_LEVEL_NAMES,
  ADMIN_CORE_DEPARTMENT_LABELS,
  ADMIN_CORE_TEAM_LABELS,
  ADMIN_CORE_ROLE_LABELS,
  ADMIN_CORE_PERMISSION_LABELS,
  ADMIN_CORE_TYPE_LABELS,
  AdminStatus,
  AdminLevel,
  AdminDepartment,
  AdminTeam,
  AdminRole,
  AdminPermission,
  AdminType,
  isAdminActive,
  isAdminSuspended,
  isAdminBanned,
  hasAdminPermission,
  getAdminCoreRoleLabel,
  getAdminCoreLevelName,
  getAdminCoreDepartmentLabel,
  getAdminCoreTeamLabel,
  getAdminCorePermissionLabel,
  isAdminUser,
  // Department
  ADMIN_DEPARTMENT,
  ADMIN_DEPARTMENT_LABELS,
  ADMIN_DEPARTMENT_DESCRIPTIONS,
  ADMIN_DEPARTMENT_HEAD_COUNT,
  ADMIN_DEPARTMENT_BUDGET,
  ADMIN_TECH_DEPARTMENTS,
  ADMIN_BUSINESS_DEPARTMENTS,
  ADMIN_SUPPORT_DEPARTMENTS,
  AdminDepartmentType,
  AdminDepartmentLabel,
  AdminDepartmentDescription,
  AdminDepartmentHeadCount,
  AdminDepartmentBudget,
  getAdminDepartmentLabel,
  getAdminDepartmentDescription,
  getAdminDepartmentHeadCount,
  getAdminDepartmentBudget,
  isAdminTechDepartment,
  isAdminBusinessDepartment,
  isAdminSupportDepartment,
  getAdminDepartments,
  // Error
  ADMIN_ERROR,
  ADMIN_ERROR_CATEGORY_LABELS,
  ADMIN_ERROR_SEVERITY_LABELS,
  ADMIN_ERROR_SEVERITY_COLORS,
  ADMIN_ERROR_TYPE_LABELS,
  ADMIN_ERROR_SOURCE_LABELS,
  ADMIN_ERROR_ACTION_LABELS,
  AdminErrorCategory,
  AdminErrorSeverity,
  AdminErrorType,
  AdminErrorCode,
  AdminErrorSource,
  AdminErrorAction,
  getAdminErrorCategoryLabel,
  getAdminErrorSeverityLabel,
  getAdminErrorSeverityColor,
  getAdminErrorTypeLabel,
  getAdminErrorSourceLabel,
  getAdminErrorActionLabel,
  isAdminCriticalError,
  isAdminRecoverableError,
  shouldAdminRetryError,
  getAdminErrorCodeCategory,
  getAdminErrorTypeFromCode,
  // Level
  ADMIN_LEVEL,
  ADMIN_LEVEL_NAMES,
  ADMIN_LEVEL_REQUIREMENTS,
  ADMIN_LEVEL_PERMISSIONS,
  AdminLevelType,
  AdminLevelName,
  AdminLevelRequirement,
  AdminLevelPermissions,
  getAdminLevelName,
  getAdminLevelRequirements,
  getAdminLevelPermissions,
  isAdminEntryLevel,
  isAdminMidLevel,
  isAdminSeniorLevel,
  isAdminExecutiveLevel,
  getAdminLevelByExperience,
  getAdminLevels,
  // Permission
  ADMIN_PERMISSION,
  ADMIN_PERMISSION_GROUPS,
  ADMIN_PERMISSION_LABELS,
  AdminPermissionType,
  AdminPermissionGroup,
  AdminPermissionLabel,
  getAdminPermissionLabel,
  getAdminPermissionsByGroup,
  getAllAdminPermissions,
  isAdminWildcardPermission,
  matchAdminPermission,
  // Role
  ADMIN_ROLE,
  ADMIN_ROLE_PRIORITY,
  ADMIN_ROLE_LABELS,
  ADMIN_ROLE_DESCRIPTIONS,
  ADMIN_ROLE_PERMISSIONS,
  AdminRoleType,
  AdminRolePriority,
  AdminRoleLabel,
  AdminRoleDescription,
  getAdminRoleLabel,
  getAdminRoleDescription,
  getAdminRolePriority,
  hasAdminRolePermission,
  isAdminSuperAdmin,
  isAdminAdmin,
  isAdminManager,
  isAdminModerator,
  getAdminRoles,
  getAdminRoleByLabel,
  // Status
  ADMIN_STATUS,
  ADMIN_STATUS_LABELS,
  ADMIN_STATUS_COLORS,
  ADMIN_STATUS_ICONS,
  ADMIN_STATUS_ORDER,
  ADMIN_ACTIVE_STATUSES,
  ADMIN_INACTIVE_STATUSES,
  ADMIN_ARCHIVED_STATUSES,
  AdminStatusType,
  AdminStatusLabel,
  AdminStatusColor,
  AdminStatusIcon,
  AdminStatusOrder,
  getAdminStatusLabel,
  getAdminStatusColor,
  getAdminStatusIcon,
  getAdminStatusOrder,
  isAdminActiveStatus,
  isAdminInactiveStatus,
  isAdminArchivedStatus,
  canAdminLogin,
  canAdminAccessDashboard,
  isAdminBannedOrSuspended,
  getAdminStatusByLabel,
  getAllAdminStatuses,
  // Team
  ADMIN_TEAM,
  ADMIN_TEAM_LABELS,
  ADMIN_TEAM_DESCRIPTIONS,
  ADMIN_TEAM_MEMBERS,
  ADMIN_TEAM_SKILLS,
  ADMIN_ENGINEERING_TEAMS,
  ADMIN_DATA_TEAMS,
  ADMIN_INFRASTRUCTURE_TEAMS,
  AdminTeamType,
  AdminTeamLabel,
  AdminTeamDescription,
  AdminTeamMembers,
  AdminTeamSkills,
  getAdminTeamLabel,
  getAdminTeamDescription,
  getAdminTeamMembers,
  getAdminTeamSkills,
  isAdminEngineeringTeam,
  isAdminDataTeam,
  isAdminInfrastructureTeam,
  getAdminTeams,
  getAdminTeamSkillsList,
  // Type
  ADMIN_TYPE,
  ADMIN_TYPE_LABELS,
  ADMIN_TYPE_DESCRIPTIONS,
  ADMIN_TYPE_REQUIREMENTS,
  ADMIN_INTERNAL_TYPES,
  ADMIN_EXTERNAL_TYPES,
  ADMIN_EMPLOYMENT_TYPES,
  ADMIN_MANAGEMENT_TYPES,
  AdminTypeType,
  AdminTypeLabel,
  AdminTypeDescription,
  AdminTypeRequirement,
  getAdminTypeLabel,
  getAdminTypeDescription,
  getAdminTypeRequirements,
  isAdminInternalType,
  isAdminExternalType,
  isAdminEmploymentType,
  isAdminManagementType,
  getAdminTypes,
  // 2FA
  ADMIN_2FA,
  ADMIN_2FA_METHOD_LABELS,
  ADMIN_2FA_METHOD_ICONS,
  ADMIN_2FA_STATUS_LABELS,
  ADMIN_2FA_STATUS_COLORS,
  ADMIN_2FA_SECURITY_LEVEL_LABELS,
  ADMIN_2FA_SECURITY_LEVEL_PRIORITY,
  ADMIN_2FA_VERIFICATION_TYPE_LABELS,
  ADMIN_2FA_CHANNEL_LABELS,
  Admin2FAMethod,
  Admin2FAStatus,
  Admin2FASecurityLevel,
  Admin2FAVerificationType,
  Admin2FATimeout,
  Admin2FARecovery,
  Admin2FAChannel,
  Admin2FAAlgorithm,
  Admin2FATokenFormat,
  get2faAdminMethodLabel,
  get2faAdminMethodIcon,
  get2faAdminStatusLabel,
  get2faAdminStatusColor,
  get2faAdminSecurityLevelLabel,
  get2faAdminSecurityLevelPriority,
  get2faAdminVerificationTypeLabel,
  get2faAdminChannelLabel,
  is2faAdminEnabled,
  is2faAdminDisabled,
  is2faAdminExpired,
  is2faAdminLocked,
  get2faAdminTimeout,
  get2faAdminSecurityLevel,
  get2faAdminChannels,
  // Activity
  ADMIN_ACTIVITY,
  ADMIN_ACTIVITY_TYPE_LABELS,
  ADMIN_ACTIVITY_STATUS_LABELS,
  ADMIN_ACTIVITY_SEVERITY_COLORS,
  AdminActivityType,
  AdminActivityStatus,
  AdminActivitySeverity,
  AdminActivityCategory,
  AdminActivitySource,
  AdminActivityAction,
  getActivityAdminTypeLabel,
  getActivityAdminStatusLabel,
  getActivityAdminSeverityColor,
  isActivityAdminSuccessful,
  isActivityAdminFailed,
  isActivityAdminPending,
  isActivityAdminTerminal,
  // Audit
  ADMIN_AUDIT,
  ADMIN_AUDIT_ACTION_LABELS,
  ADMIN_AUDIT_SEVERITY_LABELS,
  ADMIN_AUDIT_SEVERITY_COLORS,
  ADMIN_AUDIT_SEVERITY_PRIORITY,
  ADMIN_AUDIT_CATEGORY_LABELS,
  ADMIN_AUDIT_STATUS_LABELS,
  ADMIN_AUDIT_STATUS_COLORS,
  ADMIN_AUDIT_SOURCE_LABELS,
  AdminAuditAction,
  AdminAuditSeverity,
  AdminAuditCategory,
  AdminAuditStatus,
  AdminAuditSource,
  AdminAuditRetention,
  getAdminAuditActionLabel,
  getAdminAuditSeverityLabel,
  getAdminAuditSeverityColor,
  getAdminAuditSeverityPriority,
  getAdminAuditCategoryLabel,
  getAdminAuditStatusLabel,
  getAdminAuditStatusColor,
  getAdminAuditSourceLabel,
  isAdminAuditHighSeverity,
  isAdminAuditSuccessStatus,
  isAdminAuditFailureStatus,
  isAdminAuditPendingStatus,
  getAdminAuditRetentionDays,
  // Biometric
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
  AdminBiometricType,
  AdminBiometricStatus,
  AdminBiometricSecurityLevel,
  AdminBiometricAccuracyLevel,
  AdminBiometricVerificationMethod,
  AdminBiometricConfidenceLevel,
  AdminBiometricSensor,
  AdminBiometricQualityLevel,
  AdminBiometricCaptureMethod,
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
  // Device
  ADMIN_DEVICE,
  ADMIN_DEVICE_TYPE_LABELS,
  ADMIN_DEVICE_TYPE_ICONS,
  ADMIN_DEVICE_STATUS_LABELS,
  ADMIN_DEVICE_STATUS_COLORS,
  ADMIN_DEVICE_PLATFORM_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_LABELS,
  ADMIN_DEVICE_TRUST_LEVEL_PRIORITY,
  AdminDeviceType,
  AdminDeviceStatus,
  AdminDevicePlatform,
  AdminDeviceTrustLevel,
  AdminDeviceVerificationMethod,
  AdminDeviceFeature,
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
  // Log
  ADMIN_LOG,
  ADMIN_LOG_LEVEL_LABELS,
  ADMIN_LOG_LEVEL_PRIORITY,
  ADMIN_LOG_LEVEL_COLORS,
  ADMIN_LOG_CATEGORY_LABELS,
  AdminLogLevel,
  AdminLogCategory,
  AdminLogFormat,
  AdminLogDestination,
  AdminLogRetention,
  AdminLogSizeLimit,
  AdminLogRotation,
  getAdminLogLevelLabel,
  getAdminLogLevelPriority,
  getAdminLogLevelColor,
  getAdminLogCategoryLabel,
  isAdminLogCriticalLevel,
  isAdminLogErrorLevel,
  isAdminLogWarningLevel,
  isAdminLogInfoLevel,
  isAdminLogDebugLevel,
  shouldAdminLogLevel,
  getAdminLogRetentionDays,
  getAdminLogSizeLimit,
  getAdminLogRotationLabel,
  isAdminAuditLog,
  isAdminPerformanceLog,
  isAdminSecurityLog,
  isAdminSystemLog,
  // Notification
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
  AdminNotificationChannel,
  AdminNotificationType,
  AdminNotificationStatus,
  AdminNotificationPriority,
  AdminNotificationCategory,
  AdminNotificationTemplate,
  AdminNotificationDelivery,
  AdminNotificationAction,
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
  isAdminNotificationDelivered,
  isAdminNotificationFailed,
  isAdminNotificationPending,
  isAdminNotificationRead,
  getAdminNotificationTimeout,
  getAdminNotificationTemplateLabel,
  // Preferences
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
  AdminPreferenceCategory,
  AdminPreferenceType,
  AdminPreferenceStatus,
  AdminPreferenceScope,
  AdminPreferenceVisibility,
  AdminPreferenceSensitivity,
  AdminPreferenceGroup,
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
  // Session
  ADMIN_SESSION,
  ADMIN_SESSION_STATUS_LABELS,
  ADMIN_SESSION_STATUS_COLORS,
  ADMIN_SESSION_TYPE_LABELS,
  ADMIN_SESSION_TYPE_ICONS,
  ADMIN_SESSION_SECURITY_LABELS,
  ADMIN_SESSION_SECURITY_PRIORITY,
  AdminSessionStatus,
  AdminSessionType,
  AdminSessionSecurityLevel,
  AdminSessionTimeout,
  AdminSessionStorage,
  AdminSessionFlag,
  getAdminSessionStatusLabel,
  getAdminSessionStatusColor,
  getAdminSessionTypeLabel,
  getAdminSessionTypeIcon,
  getAdminSessionSecurityLabel,
  getAdminSessionSecurityPriority,
  getAdminSessionTimeout,
  isAdminSessionActive,
  isAdminSessionInactive,
  isAdminSessionTerminated,
  isAdminValidSessionType,
  isAdminHighSecurityLevel,
  shouldAdminValidateIP,
  getAdminSessionLifetime,
  getAdminSessionTimeoutSeconds,
  // Settings
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
  AdminSettingsCategory,
  AdminSettingsType,
  AdminSettingsStatus,
  AdminSettingsScope,
  AdminSettingsVisibility,
  AdminSettingsSensitivity,
  AdminSettingsPriority,
  AdminSettingsGroup,
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
  isAdminVisibleSettings,
  getAdminSettingsModification,
  getAdminSettingsSourceLabel,
  // Verification
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
  AdminverificationType,
  AdminverificationStatus,
  AdminverificationMethod,
  AdminverificationLevel,
  AdminverificationPurpose,
  AdminverificationChannel,
  getAdminverificationTypeLabel,
  getAdminverificationTypeIcon,
  getAdminverificationStatusLabel,
  getAdminverificationStatusColor,
  getAdminverificationMethodLabel,
  getAdminverificationLevelLabel,
  getAdminverificationLevelPriority,
  getAdminverificationPurposeLabel,
  getAdminverificationChannelLabel,
  isAdminverificationComplete,
  isAdminverificationFailed,
  isAdminverificationPending,
  isAdminverificationExpired,
  isAdminverificationTerminal,
  getAdminverificationLevelForType,
  getAdminverificationMethodsForType,
};
