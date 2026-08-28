/**
 * Vendor Team Member Types
 * Type definitions for vendor team members based on shared-constants
 * @module VendorTeamMemberTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor team
// ============================================================
import {
  // Vendor Team Role
  VENDOR_TEAM_ROLE_TYPES,
  VENDOR_TEAM_ROLE_LEVELS,
  VENDOR_TEAM_ROLE_PERMISSIONS,
  VENDOR_TEAM_ROLE_RESPONSIBILITIES,
  VENDOR_TEAM_ROLE_COLORS,
  VENDOR_TEAM_ROLE_ICONS,
  VendorTeamRoleType,
  VendorTeamRoleLevel,
  VendorTeamRolePermission,
  VendorTeamRoleColor,
  VendorTeamRoleIcon,
  vendorTeamRoleGetLabel,
  vendorTeamRoleGetLevel,
  vendorTeamRoleGetColor,
  vendorTeamRoleGetIcon,
  vendorTeamRoleGetPermissions,
  vendorTeamRoleGetResponsibilities,
  vendorTeamRoleHasPermission,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Team Member Extended Types
// ============================================================

/**
 * Vendor team member
 */
export interface VendorTeamMember extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  teamId: ID;
  userId: ID;
  role: VendorTeamRoleType;
  level: VendorTeamRoleLevel;
  permissions: VendorTeamRolePermission[];
  responsibilities: string[];
  isActive: boolean;
  joinedAt: Date;
  leftAt?: Date;
  metadata?: Metadata;
}

/**
 * Vendor team member filter
 */
export interface VendorTeamMemberFilter {
  ids?: ID[];
  vendorIds?: ID[];
  teamIds?: ID[];
  userIds?: ID[];
  roles?: VendorTeamRoleType[];
  levels?: VendorTeamRoleLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * Vendor team member statistics
 */
export interface VendorTeamMemberStatistics {
  vendorId: ID;
  teamId: ID;
  totalMembers: number;
  activeMembers: number;
  byRole: Record<VendorTeamRoleType, number>;
  byLevel: Record<VendorTeamRoleLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePermissions: number;
  maxPermissions: number;
  minPermissions: number;
  mostFrequentRole: VendorTeamRoleType;
  mostFrequentLevel: VendorTeamRoleLevel;
  memberTurnoverRate: number;
}

/**
 * Vendor team member summary
 */
export interface VendorTeamMemberSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalMembers: number;
  active: number;
  byRole: Record<VendorTeamRoleType, number>;
  byLevel: Record<VendorTeamRoleLevel, number>;
  memberTrend: {
    date: Date;
    total: number;
    active: number;
    joined: number;
    left: number;
  }[];
  topRoles: {
    role: VendorTeamRoleType;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: VendorTeamRoleLevel;
    count: number;
    label: string;
  }[];
  turnoverMetrics: {
    joinRate: number;
    leaveRate: number;
    turnoverRate: number;
  };
}

/**
 * Vendor team member configuration
 */
export interface VendorTeamMemberConfiguration {
  enabled: boolean;
  defaultRole: VendorTeamRoleType;
  defaultLevel: VendorTeamRoleLevel;
  requireEmail: boolean;
  requirePhone: boolean;
  maxMembersPerTeam: number;
  allowMultipleRoles: boolean;
  allowRoleChange: boolean;
  allowPermissionChange: boolean;
  requireInvitation: boolean;
  notificationOnJoin: boolean;
  notificationOnLeave: boolean;
  notificationOnRoleChange: boolean;
  notificationOnLevelChange: boolean;
  alertConfig?: VendorTeamMemberAlertConfig;
}

/**
 * Vendor team member alert configuration
 */
export interface VendorTeamMemberAlertConfig {
  enabled: boolean;
  roleChangeAlert: boolean;
  levelChangeAlert: boolean;
  permissionChangeAlert: boolean;
  highTurnoverAlert: boolean;
  highTurnoverThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor team member history
 */
export interface VendorTeamMemberHistory extends BaseEntity, Timestamp {
  id: ID;
  memberId: ID;
  vendorId: ID;
  teamId: ID;
  userId: ID;
  action:
    | 'join'
    | 'leave'
    | 'role_change'
    | 'level_change'
    | 'permission_change'
    | 'activate'
    | 'deactivate';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor team member validation
 */
export interface VendorTeamMemberValidation {
  isValid: boolean;
  memberId: ID;
  vendorId: ID;
  teamId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor team member export
 */
export interface VendorTeamMemberExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  teamId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorTeamMemberFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Vendor Team Role
  VENDOR_TEAM_ROLE_TYPES,
  VENDOR_TEAM_ROLE_LEVELS,
  VENDOR_TEAM_ROLE_PERMISSIONS,
  VENDOR_TEAM_ROLE_RESPONSIBILITIES,
  VENDOR_TEAM_ROLE_COLORS,
  VENDOR_TEAM_ROLE_ICONS,
  VendorTeamRoleType,
  VendorTeamRoleLevel,
  VendorTeamRolePermission,
  VendorTeamRoleColor,
  VendorTeamRoleIcon,
  vendorTeamRoleGetLabel,
  vendorTeamRoleGetLevel,
  vendorTeamRoleGetColor,
  vendorTeamRoleGetIcon,
  vendorTeamRoleGetPermissions,
  vendorTeamRoleGetResponsibilities,
  vendorTeamRoleHasPermission,
};
