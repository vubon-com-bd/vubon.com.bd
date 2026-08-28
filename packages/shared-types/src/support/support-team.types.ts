/**
 * Support Team Types
 * Type definitions for support teams based on shared-constants
 * @module SupportTeamTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-team
// ============================================================
import {
  // Support Team Core
  SUPPORT_TEAM,
  SupportTeamType,
  SupportTeamStatus,
  SupportTeamSize,
  SupportTeamShift,
  SupportTeamMetric,
  supportTeamGetTypeLabel,
  supportTeamGetStatusLabel,
  supportTeamGetShiftLabel,
  supportTeamIsActive,
  supportTeamGetMetricLabel,
  supportTeamGetOptimalSize,
  // Support Team Role
  SUPPORT_TEAM_ROLE_TYPES,
  SUPPORT_TEAM_ROLE_LEVELS,
  SUPPORT_TEAM_ROLE_PERMISSIONS,
  SUPPORT_TEAM_ROLE_RESPONSIBILITIES,
  SUPPORT_TEAM_ROLE_QUALIFICATIONS,
  SUPPORT_TEAM_ROLE_COLORS,
  SUPPORT_TEAM_ROLE_ICONS,
  SupportTeamRoleType,
  SupportTeamRoleLevel,
  SupportTeamRolePermission,
  SupportTeamRoleColor,
  SupportTeamRoleIcon,
  supportTeamRoleGetLabel,
  supportTeamRoleGetLevel,
  supportTeamRoleGetColor,
  supportTeamRoleGetIcon,
  supportTeamRoleGetResponsibilities,
  supportTeamRoleGetPermissions,
  supportTeamRoleHasPermission,
} from '@vubon/shared-constants';

// ============================================================
// Support Team Extended Types
// ============================================================

/**
 * Support team
 */
export interface SupportTeam extends BaseEntity, Timestamp {
  id: ID;
  type: SupportTeamType;
  status: SupportTeamStatus;
  shift: SupportTeamShift;
  size: SupportTeamSize;
  name: string;
  description?: string;
  isActive: boolean;
  leaderId: ID;
  memberIds: ID[];
  metrics: SupportTeamMetric[];
  metadata?: Metadata;
}

/**
 * Support team filter
 */
export interface SupportTeamFilter {
  ids?: ID[];
  types?: SupportTeamType[];
  statuses?: SupportTeamStatus[];
  shifts?: SupportTeamShift[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minSize?: number;
  maxSize?: number;
  searchTerm?: string;
}

/**
 * Support team statistics
 */
export interface SupportTeamStatistics {
  totalTeams: number;
  activeTeams: number;
  byType: Record<SupportTeamType, number>;
  byStatus: Record<SupportTeamStatus, number>;
  byShift: Record<SupportTeamShift, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSize: number;
  maxSize: number;
  minSize: number;
  optimalSize: number;
  totalMembers: number;
  mostFrequentType: SupportTeamType;
  mostFrequentStatus: SupportTeamStatus;
  mostFrequentShift: SupportTeamShift;
  averageMetricCount: number;
}

/**
 * Support team summary
 */
export interface SupportTeamSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTeams: number;
  active: number;
  byType: Record<SupportTeamType, number>;
  byStatus: Record<SupportTeamStatus, number>;
  byShift: Record<SupportTeamShift, number>;
  teamTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: SupportTeamType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportTeamStatus;
    count: number;
    label: string;
  }[];
  topShifts: {
    shift: SupportTeamShift;
    count: number;
    label: string;
  }[];
  teamMetrics: {
    averageSize: number;
    optimalSize: number;
    totalMembers: number;
    averageMetricCount: number;
  };
}

/**
 * Support team configuration
 */
export interface SupportTeamConfiguration {
  enabled: boolean;
  defaultType: SupportTeamType;
  defaultStatus: SupportTeamStatus;
  defaultShift: SupportTeamShift;
  defaultSize: SupportTeamSize;
  requireName: boolean;
  requireDescription: boolean;
  requireLeader: boolean;
  allowMultipleShifts: boolean;
  allowMixedTypes: boolean;
  autoAssignMembers: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: SupportTeamAlertConfig;
}

/**
 * Support team alert configuration
 */
export interface SupportTeamAlertConfig {
  enabled: boolean;
  understaffedAlert: boolean;
  understaffedThreshold: number;
  overstaffedAlert: boolean;
  overstaffedThreshold: number;
  inactiveTeamAlert: boolean;
  inactiveThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support team history
 */
export interface SupportTeamHistory extends BaseEntity, Timestamp {
  id: ID;
  teamId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'add_member'
    | 'remove_member'
    | 'change_leader';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support team validation
 */
export interface SupportTeamValidation {
  isValid: boolean;
  teamId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support team export
 */
export interface SupportTeamExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportTeamFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support team member
 */
export interface SupportTeamMember extends BaseEntity, Timestamp {
  id: ID;
  teamId: ID;
  userId: ID;
  role: SupportTeamRoleType;
  joinedAt: Date;
  leftAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Support team role
 */
export interface SupportTeamRole extends BaseEntity, Timestamp {
  id: ID;
  type: SupportTeamRoleType;
  level: SupportTeamRoleLevel;
  color: SupportTeamRoleColor;
  icon: SupportTeamRoleIcon;
  name: string;
  description?: string;
  permissions: SupportTeamRolePermission[];
  responsibilities: string[];
  qualifications: string[];
  isActive: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Team Core
  SUPPORT_TEAM,
  SupportTeamType,
  SupportTeamStatus,
  SupportTeamSize,
  SupportTeamShift,
  SupportTeamMetric,
  supportTeamGetTypeLabel,
  supportTeamGetStatusLabel,
  supportTeamGetShiftLabel,
  supportTeamIsActive,
  supportTeamGetMetricLabel,
  supportTeamGetOptimalSize,
  // Support Team Role
  SUPPORT_TEAM_ROLE_TYPES,
  SUPPORT_TEAM_ROLE_LEVELS,
  SUPPORT_TEAM_ROLE_PERMISSIONS,
  SUPPORT_TEAM_ROLE_RESPONSIBILITIES,
  SUPPORT_TEAM_ROLE_QUALIFICATIONS,
  SUPPORT_TEAM_ROLE_COLORS,
  SUPPORT_TEAM_ROLE_ICONS,
  SupportTeamRoleType,
  SupportTeamRoleLevel,
  SupportTeamRolePermission,
  SupportTeamRoleColor,
  SupportTeamRoleIcon,
  supportTeamRoleGetLabel,
  supportTeamRoleGetLevel,
  supportTeamRoleGetColor,
  supportTeamRoleGetIcon,
  supportTeamRoleGetResponsibilities,
  supportTeamRoleGetPermissions,
  supportTeamRoleHasPermission,
};
