// 1. বাহ্যিক লাইব্রেরি
// (কোনটি প্রয়োজন নেই)

// 2. শেয়ার্ড প্যাকেজ
// (কোনটি প্রয়োজন নেই)

// 3. প্রকল্পের অন্য ফাইল
// core-primitives.types থেকে সব টাইপ export
export {
  AdminId,
  AdminEmail,
  AdminPhone,
  AdminName,
  AdminPassword,
  AdminTimestamp,
  AdminStatus,
  AdminType,
  AdminLevel,
} from './core-primitives.types';

// admin.types থেকে সব টাইপ export
export { Admin } from './admin.types';

// admin-role.types থেকে সব টাইপ export
export {
  RoleId,
  RoleName,
  RoleStatus,
  RoleLevel,
  AdminRole,
  CreateRoleDto,
  UpdateRoleDto,
} from './admin-role.types';

// admin-permission.types থেকে সব টাইপ export
export {
  PermissionId,
  PermissionAction,
  PermissionGroup,
  PermissionLevel,
  AdminPermission,
} from './admin-permission.types';

// admin-profile.types থেকে সব টাইপ export
export { AdminProfile } from './admin-profile.types';

// admin-settings.types থেকে সব টাইপ export
export {
  SettingsCategory,
  SettingValue,
  AdminSetting,
  AdminSettings,
} from './admin-settings.types';

// admin-preferences.types থেকে সব টাইপ export
export { PreferenceCategory, AdminPreference, AdminPreferences } from './admin-preferences.types';

// admin-activity.types থেকে সব টাইপ export
export {
  ActivityType,
  ActivityStatus,
  AdminActivity,
  ActivityFilter,
} from './admin-activity.types';

// admin-log.types থেকে সব টাইপ export
export { LogType, LogStatus, LogLevel, AdminLog, LogFilter } from './admin-log.types';

// admin-audit.types থেকে সব টাইপ export
export { AuditType, AuditStatus, ChangeValue, AdminAudit, AuditFilter } from './admin-audit.types';

// admin-session.types থেকে সব টাইপ export
export { SessionStatus, AdminSession, SessionFilter } from './admin-session.types';

// admin-device.types থেকে সব টাইপ export
export { DeviceType, DeviceStatus, AdminDevice } from './admin-device.types';

// admin-verification.types থেকে সব টাইপ export
export {
  VerificationType,
  VerificationStatus,
  AdminVerification,
} from './admin-verification.types';

// admin-2fa.types থেকে সব টাইপ export
export { TwoFAType, TwoFAStatus, Admin2FA } from './admin-2fa.types';

// admin-biometric.types থেকে সব টাইপ export
export { BiometricType, BiometricStatus, AdminBiometric } from './admin-biometric.types';

// admin-notification.types থেকে সব টাইপ export
export {
  NotificationType,
  NotificationStatus,
  AdminNotification,
} from './admin-notification.types';

// admin-report.types থেকে সব টাইপ export
export { ReportType, ReportStatus, ReportFormat, AdminReport } from './admin-report.types';

// admin-team.types থেকে সব টাইপ export
export { TeamType, TeamStatus, AdminTeam } from './admin-team.types';

// admin-department.types থেকে সব টাইপ export
export { DepartmentId, DepartmentStatus, AdminDepartment } from './admin-department.types';

// admin-analytics.types থেকে সব টাইপ export
export {
  LoginStats,
  SessionStats,
  ActivityTimelineItem,
  AdminAnalytics,
  AnalyticsFilter,
} from './admin-analytics.types';
