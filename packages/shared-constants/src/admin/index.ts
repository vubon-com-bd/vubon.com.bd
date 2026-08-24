// Export all constants from admin.constants
export {
  ADMIN,
  ADMIN_STATUS_LABELS as ADMIN_CORE_STATUS_LABELS,
  ADMIN_LEVEL_NAMES as ADMIN_CORE_LEVEL_NAMES,
  ADMIN_DEPARTMENT_LABELS as ADMIN_CORE_DEPARTMENT_LABELS,
  ADMIN_TEAM_LABELS as ADMIN_CORE_TEAM_LABELS,
  ADMIN_ROLE_LABELS as ADMIN_CORE_ROLE_LABELS,
  ADMIN_PERMISSION_LABELS as ADMIN_CORE_PERMISSION_LABELS,
  ADMIN_TYPE_LABELS as ADMIN_CORE_TYPE_LABELS,
} from './admin.constants';

// Export all types from admin.constants
export type {
  AdminStatus,
  AdminLevel,
  AdminDepartment,
  AdminTeam,
  AdminRole,
  AdminPermission,
  AdminType,
} from './admin.constants';

// Export all functions from admin.constants
export {
  isAdminActive,
  isAdminSuspended,
  isAdminBanned,
  hasAdminPermission,
  getAdminRoleLabel as getAdminCoreRoleLabel,
  getAdminLevelName as getAdminCoreLevelName,
  getAdminDepartmentLabel as getAdminCoreDepartmentLabel,
  getAdminTeamLabel as getAdminCoreTeamLabel,
  getAdminPermissionLabel as getAdminCorePermissionLabel,
  isAdminUser,
} from './admin.constants';

// Export all constants from admin-department.constants
export {
  ADMIN_DEPARTMENT,
  ADMIN_DEPARTMENT_LABELS,
  ADMIN_DEPARTMENT_DESCRIPTIONS,
  ADMIN_DEPARTMENT_HEAD_COUNT,
  ADMIN_DEPARTMENT_BUDGET,
  ADMIN_TECH_DEPARTMENTS,
  ADMIN_BUSINESS_DEPARTMENTS,
  ADMIN_SUPPORT_DEPARTMENTS,
} from './admin-department.constants';

// Export all types from admin-department.constants
export type {
  AdminDepartmentType,
  AdminDepartmentLabel,
  AdminDepartmentDescription,
  AdminDepartmentHeadCount,
  AdminDepartmentBudget,
} from './admin-department.constants';

// Export all functions from admin-department.constants
export {
  getAdminDepartmentLabel,
  getAdminDepartmentDescription,
  getAdminDepartmentHeadCount,
  getAdminDepartmentBudget,
  isAdminTechDepartment,
  isAdminBusinessDepartment,
  isAdminSupportDepartment,
  getAdminDepartments,
} from './admin-department.constants';

// Export all constants from admin-error.constants
export {
  ADMIN_ERROR,
  ADMIN_ERROR_CATEGORY_LABELS,
  ADMIN_ERROR_SEVERITY_LABELS,
  ADMIN_ERROR_SEVERITY_COLORS,
  ADMIN_ERROR_TYPE_LABELS,
  ADMIN_ERROR_SOURCE_LABELS,
  ADMIN_ERROR_ACTION_LABELS,
} from './admin-error.constants';

// Export all types from admin-error.constants
export type {
  AdminErrorCategory,
  AdminErrorSeverity,
  AdminErrorType,
  AdminErrorCode,
  AdminErrorSource,
  AdminErrorAction,
} from './admin-error.constants';

// Export all functions from admin-error.constants
export {
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
} from './admin-error.constants';

// Export all constants from admin-level.constants
export {
  ADMIN_LEVEL,
  ADMIN_LEVEL_NAMES,
  ADMIN_LEVEL_REQUIREMENTS,
  ADMIN_LEVEL_PERMISSIONS,
} from './admin-level.constants';

// Export all types from admin-level.constants
export type {
  AdminLevelType,
  AdminLevelName,
  AdminLevelRequirement,
  AdminLevelPermissions,
} from './admin-level.constants';

// Export all functions from admin-level.constants
export {
  getAdminLevelName,
  getAdminLevelRequirements,
  getAdminLevelPermissions,
  isAdminEntryLevel,
  isAdminMidLevel,
  isAdminSeniorLevel,
  isAdminExecutiveLevel,
  getAdminLevelByExperience,
  getAdminLevels,
} from './admin-level.constants';

// Export all constants from admin-permission.constants
export {
  ADMIN_PERMISSION,
  ADMIN_PERMISSION_GROUPS,
  ADMIN_PERMISSION_LABELS,
} from './admin-permission.constants';

// Export all types from admin-permission.constants
export type {
  AdminPermissionType,
  AdminPermissionGroup,
  AdminPermissionLabel,
} from './admin-permission.constants';

// Export all functions from admin-permission.constants
export {
  getAdminPermissionLabel,
  getAdminPermissionsByGroup,
  getAllAdminPermissions,
  isAdminWildcardPermission,
  matchAdminPermission,
} from './admin-permission.constants';

// Export all constants from admin-role.constants
export {
  ADMIN_ROLE,
  ADMIN_ROLE_PRIORITY,
  ADMIN_ROLE_LABELS,
  ADMIN_ROLE_DESCRIPTIONS,
  ADMIN_ROLE_PERMISSIONS,
} from './admin-role.constants';

// Export all types from admin-role.constants
export type {
  AdminRoleType,
  AdminRolePriority,
  AdminRoleLabel,
  AdminRoleDescription,
} from './admin-role.constants';

// Export all functions from admin-role.constants
export {
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
} from './admin-role.constants';

// Export all constants from admin-status.constants
export {
  ADMIN_STATUS,
  ADMIN_STATUS_LABELS,
  ADMIN_STATUS_COLORS,
  ADMIN_STATUS_ICONS,
  ADMIN_STATUS_ORDER,
  ADMIN_ACTIVE_STATUSES,
  ADMIN_INACTIVE_STATUSES,
  ADMIN_ARCHIVED_STATUSES,
} from './admin-status.constants';

// Export all types from admin-status.constants
export type {
  AdminStatusType,
  AdminStatusLabel,
  AdminStatusColor,
  AdminStatusIcon,
  AdminStatusOrder,
} from './admin-status.constants';

// Export all functions from admin-status.constants
export {
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
} from './admin-status.constants';

// Export all constants from admin-team.constants
export {
  ADMIN_TEAM,
  ADMIN_TEAM_LABELS,
  ADMIN_TEAM_DESCRIPTIONS,
  ADMIN_TEAM_MEMBERS,
  ADMIN_TEAM_SKILLS,
  ADMIN_ENGINEERING_TEAMS,
  ADMIN_DATA_TEAMS,
  ADMIN_INFRASTRUCTURE_TEAMS,
} from './admin-team.constants';

// Export all types from admin-team.constants
export type {
  AdminTeamType,
  AdminTeamLabel,
  AdminTeamDescription,
  AdminTeamMembers,
  AdminTeamSkills,
} from './admin-team.constants';

// Export all functions from admin-team.constants
export {
  getAdminTeamLabel,
  getAdminTeamDescription,
  getAdminTeamMembers,
  getAdminTeamSkills,
  isAdminEngineeringTeam,
  isAdminDataTeam,
  isAdminInfrastructureTeam,
  getAdminTeams,
  getAdminTeamSkillsList,
} from './admin-team.constants';

// Export all constants from admin-type.constants
export {
  ADMIN_TYPE,
  ADMIN_TYPE_LABELS,
  ADMIN_TYPE_DESCRIPTIONS,
  ADMIN_TYPE_REQUIREMENTS,
  ADMIN_INTERNAL_TYPES,
  ADMIN_EXTERNAL_TYPES,
  ADMIN_EMPLOYMENT_TYPES,
  ADMIN_MANAGEMENT_TYPES,
} from './admin-type.constants';

// Export all types from admin-type.constants
export type {
  AdminTypeType,
  AdminTypeLabel,
  AdminTypeDescription,
  AdminTypeRequirement,
} from './admin-type.constants';

// Export all functions from admin-type.constants
export {
  getAdminTypeLabel,
  getAdminTypeDescription,
  getAdminTypeRequirements,
  isAdminInternalType,
  isAdminExternalType,
  isAdminEmploymentType,
  isAdminManagementType,
  getAdminTypes,
} from './admin-type.constants';

// Export all 2FA constants
export * from './2fa';

// Export all activity constants
export * from './activity';

// Export all audit constants
export * from './audit';

// Export all biometric constants
export * from './biometric';

// Export all device constants
export * from './device';

// Export all log constants
export * from './log';

// Export all notification constants
export * from './notification';

// Export all preferences constants
export * from './preferences';

// Export all session constants
export * from './session';

// Export all settings constants
export * from './settings';

// Export all verification constants
export * from './verification';
