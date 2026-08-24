/**
 * Support Team Constants Index
 * Export all support team constants and types for easy importing
 */

// Support Team Constants
export {
  SUPPORT_TEAM,
  supportTeamGetTypeLabel,
  supportTeamGetStatusLabel,
  supportTeamGetShiftLabel,
  supportTeamIsActive,
  supportTeamGetMetricLabel,
  supportTeamGetOptimalSize,
} from './support-team.constants';

export type {
  SupportTeamType,
  SupportTeamStatus,
  SupportTeamSize,
  SupportTeamShift,
  SupportTeamMetric,
} from './support-team.constants';

// Support Team Role Constants
export {
  SUPPORT_TEAM_ROLE_TYPES,
  SUPPORT_TEAM_ROLE_LEVELS,
  SUPPORT_TEAM_ROLE_PERMISSIONS,
  SUPPORT_TEAM_ROLE_RESPONSIBILITIES,
  SUPPORT_TEAM_ROLE_QUALIFICATIONS,
  SUPPORT_TEAM_ROLE_COLORS,
  SUPPORT_TEAM_ROLE_ICONS,
  supportTeamRoleGetLabel,
  supportTeamRoleGetLevel,
  supportTeamRoleGetColor,
  supportTeamRoleGetIcon,
  supportTeamRoleGetResponsibilities,
  supportTeamRoleGetPermissions,
  supportTeamRoleHasPermission,
} from './support-team-role.constants';

export type {
  SupportTeamRoleType,
  SupportTeamRoleLevel,
  SupportTeamRolePermission,
  SupportTeamRoleColor,
  SupportTeamRoleIcon,
} from './support-team-role.constants';
