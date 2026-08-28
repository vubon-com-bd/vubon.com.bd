/**
 * Vendor Team Types
 * Type definitions for vendor teams based on shared-constants
 * @module VendorTeamTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor team
// ============================================================
import {
  // Vendor Team
  VENDOR_TEAM,
  VendorTeamType,
  VendorTeamStatus,
  VendorTeamRole,
  VendorTeamPermission,
  vendorTeamGetTypeLabel,
  vendorTeamGetStatusLabel,
  vendorTeamGetRoleLabel,
  vendorTeamIsActive,
  vendorTeamGetPermissionLabel,
  vendorTeamGetOptimalSize,
  // Vendor Team Status
  VENDOR_TEAM_STATUS,
  VendorTeamStatusType,
  VendorTeamStatusCategory,
  VendorTeamStatusColor,
  VendorTeamStatusIcon,
  VendorTeamStatusTransition,
  vendorTeamStatusGetLabel,
  vendorTeamStatusIsActive,
  vendorTeamStatusIsInactive,
  vendorTeamStatusIsArchived,
  vendorTeamStatusGetCategory,
  vendorTeamStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Team Extended Types
// ============================================================

/**
 * Vendor team
 */
export interface VendorTeam extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorTeamType;
  status: VendorTeamStatusType;
  name: string;
  description?: string;
  roles: VendorTeamRole[];
  permissions: VendorTeamPermission[];
  isActive: boolean;
  isInactive: boolean;
  isArchived: boolean;
  memberCount: number;
  optimalSize: number;
  metadata?: Metadata;
}

/**
 * Vendor team filter
 */
export interface VendorTeamFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorTeamType[];
  statuses?: VendorTeamStatusType[];
  roles?: VendorTeamRole[];
  permissions?: VendorTeamPermission[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isInactive?: boolean;
  isArchived?: boolean;
  minMemberCount?: number;
  maxMemberCount?: number;
  searchTerm?: string;
  name?: string;
}

/**
 * Vendor team statistics
 */
export interface VendorTeamStatistics {
  vendorId: ID;
  totalTeams: number;
  activeTeams: number;
  inactiveTeams: number;
  archivedTeams: number;
  byType: Record<VendorTeamType, number>;
  byStatus: Record<VendorTeamStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageMemberCount: number;
  maxMemberCount: number;
  minMemberCount: number;
  mostFrequentType: VendorTeamType;
  mostFrequentStatus: VendorTeamStatusType;
  totalMembers: number;
  teamsAtOptimalSize: number;
}

/**
 * Vendor team summary
 */
export interface VendorTeamSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTeams: number;
  active: number;
  inactive: number;
  archived: number;
  byType: Record<VendorTeamType, number>;
  byStatus: Record<VendorTeamStatusType, number>;
  teamTrend: {
    date: Date;
    total: number;
    active: number;
    inactive: number;
  }[];
  topTypes: {
    type: VendorTeamType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorTeamStatusType;
    count: number;
    label: string;
  }[];
  sizeSummary: {
    averageMemberCount: number;
    maxMemberCount: number;
    minMemberCount: number;
    teamsAtOptimalSize: number;
  };
}

/**
 * Vendor team configuration
 */
export interface VendorTeamConfiguration {
  enabled: boolean;
  defaultType: VendorTeamType;
  defaultStatus: VendorTeamStatusType;
  requireName: boolean;
  requireDescription: boolean;
  maxTeamSize: number;
  minTeamSize: number;
  allowMultipleRoles: boolean;
  allowRoleChange: boolean;
  allowPermissionChange: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnMemberJoin: boolean;
  notificationOnMemberLeave: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: VendorTeamAlertConfig;
}

/**
 * Vendor team alert configuration
 */
export interface VendorTeamAlertConfig {
  enabled: boolean;
  sizeAlert: boolean;
  sizeThreshold: number;
  statusChangeAlert: boolean;
  permissionChangeAlert: boolean;
  roleChangeAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor team history
 */
export interface VendorTeamHistory extends BaseEntity, Timestamp {
  id: ID;
  teamId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'member_add'
    | 'member_remove'
    | 'role_change'
    | 'permission_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor team validation
 */
export interface VendorTeamValidation {
  isValid: boolean;
  teamId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor team export
 */
export interface VendorTeamExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorTeamFilter;
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
  // Vendor Team
  VENDOR_TEAM,
  VendorTeamType,
  VendorTeamStatus,
  VendorTeamRole,
  VendorTeamPermission,
  vendorTeamGetTypeLabel,
  vendorTeamGetStatusLabel,
  vendorTeamGetRoleLabel,
  vendorTeamIsActive,
  vendorTeamGetPermissionLabel,
  vendorTeamGetOptimalSize,
  // Vendor Team Status
  VENDOR_TEAM_STATUS,
  VendorTeamStatusType,
  VendorTeamStatusCategory,
  VendorTeamStatusColor,
  VendorTeamStatusIcon,
  VendorTeamStatusTransition,
  vendorTeamStatusGetLabel,
  vendorTeamStatusIsActive,
  vendorTeamStatusIsInactive,
  vendorTeamStatusIsArchived,
  vendorTeamStatusGetCategory,
  vendorTeamStatusCanTransition,
};
