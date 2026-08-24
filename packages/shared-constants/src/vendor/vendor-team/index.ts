/**
 * Vendor Team Constants Index
 * Export all vendor team constants and types for easy importing
 */

// Vendor Team Constants
export {
  VENDOR_TEAM,
  vendorTeamGetTypeLabel,
  vendorTeamGetStatusLabel,
  vendorTeamGetRoleLabel,
  vendorTeamIsActive,
  vendorTeamGetPermissionLabel,
  vendorTeamGetOptimalSize,
} from './vendor-team.constants';

export type {
  VendorTeamType,
  VendorTeamStatus,
  VendorTeamRole,
  VendorTeamPermission,
} from './vendor-team.constants';

// Vendor Team Role Constants
export {
  VENDOR_TEAM_ROLE_TYPES,
  VENDOR_TEAM_ROLE_LEVELS,
  VENDOR_TEAM_ROLE_PERMISSIONS,
  VENDOR_TEAM_ROLE_RESPONSIBILITIES,
  VENDOR_TEAM_ROLE_COLORS,
  VENDOR_TEAM_ROLE_ICONS,
  vendorTeamRoleGetLabel,
  vendorTeamRoleGetLevel,
  vendorTeamRoleGetColor,
  vendorTeamRoleGetIcon,
  vendorTeamRoleGetPermissions,
  vendorTeamRoleGetResponsibilities,
  vendorTeamRoleHasPermission,
} from './vendor-team-role.constants';

export type {
  VendorTeamRoleType,
  VendorTeamRoleLevel,
  VendorTeamRolePermission,
  VendorTeamRoleColor,
  VendorTeamRoleIcon,
} from './vendor-team-role.constants';

// Vendor Team Status Constants
export {
  VENDOR_TEAM_STATUS,
  vendorTeamStatusGetLabel,
  vendorTeamStatusIsActive,
  vendorTeamStatusIsInactive,
  vendorTeamStatusIsArchived,
  vendorTeamStatusGetCategory,
  vendorTeamStatusCanTransition,
} from './vendor-team-status.constants';

export type {
  VendorTeamStatusType,
  VendorTeamStatusCategory,
  VendorTeamStatusColor,
  VendorTeamStatusIcon,
  VendorTeamStatusTransition,
} from './vendor-team-status.constants';
