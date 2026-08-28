/**
 * Support Agent Types
 * Type definitions for support agents based on shared-constants
 * @module SupportAgentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-agent
// ============================================================
import {
  // Support Agent Core
  SUPPORT_AGENT,
  SupportAgentType,
  SupportAgentStatus,
  SupportAgentRole,
  SupportAgentSkill,
  SupportAgentLevel,
  SupportAgentShiftType,
  supportAgentGetTypeLabel,
  supportAgentGetStatusLabel,
  supportAgentGetRoleLabel,
  supportAgentGetLevelLabel,
  supportAgentIsAvailable,
  supportAgentIsOnline,
  supportAgentCanHandleWork,
  supportAgentGetSkillLabel,
  supportAgentGetShiftTypeLabel,
  // Support Agent Status
  SUPPORT_AGENT_STATUS,
  SupportAgentStatusType,
  SupportAgentStatusCategory,
  SupportAgentStatusColor,
  SupportAgentStatusIcon,
  SupportAgentStatusTransition,
  supportAgentStatusGetLabel,
  supportAgentStatusIsAvailable,
  supportAgentStatusIsOnline,
  supportAgentStatusCanHandleWork,
  supportAgentStatusGetCategory,
  supportAgentStatusCanTransition,
  // Support Agent Role
  SUPPORT_AGENT_ROLE,
  SupportAgentRoleType,
  SupportAgentRoleLevel,
  SupportAgentRolePermission,
  SupportAgentRoleColor,
  SupportAgentRoleIcon,
  supportAgentRoleGetLabel,
  supportAgentRoleGetLevel,
  supportAgentRoleGetColor,
  supportAgentRoleGetIcon,
  supportAgentRoleGetResponsibilities,
  supportAgentRoleGetPermissions,
  supportAgentRoleHasPermission,
} from '@vubon/shared-constants';

// ============================================================
// Support Agent Extended Types
// ============================================================

/**
 * Support agent
 */
export interface SupportAgent extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: SupportAgentType;
  status: SupportAgentStatus;
  role: SupportAgentRole;
  level: SupportAgentLevel;
  shiftType: SupportAgentShiftType;
  name: string;
  email: string;
  phone?: string;
  skills: SupportAgentSkill[];
  isAvailable: boolean;
  isOnline: boolean;
  canHandleWork: boolean;
  currentWorkload: number;
  maxWorkload: number;
  metadata?: Metadata;
}

/**
 * Support agent filter
 */
export interface SupportAgentFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: SupportAgentType[];
  statuses?: SupportAgentStatus[];
  roles?: SupportAgentRole[];
  levels?: SupportAgentLevel[];
  shiftTypes?: SupportAgentShiftType[];
  skills?: SupportAgentSkill[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isAvailable?: boolean;
  isOnline?: boolean;
  canHandleWork?: boolean;
  minWorkload?: number;
  maxWorkload?: number;
  searchTerm?: string;
}

/**
 * Support agent statistics
 */
export interface SupportAgentStatistics {
  userId: ID;
  totalAgents: number;
  availableAgents: number;
  onlineAgents: number;
  agentsCanHandleWork: number;
  byType: Record<SupportAgentType, number>;
  byStatus: Record<SupportAgentStatus, number>;
  byRole: Record<SupportAgentRole, number>;
  byLevel: Record<SupportAgentLevel, number>;
  byShiftType: Record<SupportAgentShiftType, number>;
  bySkill: Record<SupportAgentSkill, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageWorkload: number;
  maxWorkload: number;
  minWorkload: number;
  mostFrequentType: SupportAgentType;
  mostFrequentStatus: SupportAgentStatus;
  mostFrequentRole: SupportAgentRole;
  mostFrequentLevel: SupportAgentLevel;
  mostFrequentSkill: SupportAgentSkill;
}

/**
 * Support agent summary
 */
export interface SupportAgentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAgents: number;
  available: number;
  online: number;
  canHandleWork: number;
  byType: Record<SupportAgentType, number>;
  byStatus: Record<SupportAgentStatus, number>;
  byRole: Record<SupportAgentRole, number>;
  byLevel: Record<SupportAgentLevel, number>;
  byShiftType: Record<SupportAgentShiftType, number>;
  bySkill: Record<SupportAgentSkill, number>;
  agentTrend: {
    date: Date;
    total: number;
    available: number;
    online: number;
  }[];
  topTypes: {
    type: SupportAgentType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportAgentStatus;
    count: number;
    label: string;
  }[];
  topRoles: {
    role: SupportAgentRole;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: SupportAgentLevel;
    count: number;
    label: string;
  }[];
  topSkills: {
    skill: SupportAgentSkill;
    count: number;
    label: string;
  }[];
  workloadMetrics: {
    averageWorkload: number;
    maxWorkload: number;
    minWorkload: number;
  };
}

/**
 * Support agent configuration
 */
export interface SupportAgentConfiguration {
  enabled: boolean;
  defaultType: SupportAgentType;
  defaultStatus: SupportAgentStatus;
  defaultRole: SupportAgentRole;
  defaultLevel: SupportAgentLevel;
  defaultShiftType: SupportAgentShiftType;
  maxWorkload: number;
  requireName: boolean;
  requireEmail: boolean;
  allowMultipleRoles: boolean;
  allowMultipleShifts: boolean;
  autoAssignWork: boolean;
  autoAssignStrategy: 'round_robin' | 'least_busy' | 'skill_based' | 'priority_based';
  notificationOnStatusChange: boolean;
  notificationOnWorkloadChange: boolean;
  notificationOnShiftChange: boolean;
  alertConfig?: SupportAgentAlertConfig;
}

/**
 * Support agent alert configuration
 */
export interface SupportAgentAlertConfig {
  enabled: boolean;
  overloadedAgentAlert: boolean;
  overloadedThreshold: number;
  unavailableAgentAlert: boolean;
  unavailableThreshold: number;
  lowAvailabilityAlert: boolean;
  lowAvailabilityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support agent history
 */
export interface SupportAgentHistory extends BaseEntity, Timestamp {
  id: ID;
  agentId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'status_change'
    | 'role_change'
    | 'level_change'
    | 'shift_change'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support agent validation
 */
export interface SupportAgentValidation {
  isValid: boolean;
  agentId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support agent export
 */
export interface SupportAgentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportAgentFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support agent shift
 */
export interface SupportAgentShift extends BaseEntity, Timestamp {
  id: ID;
  agentId: ID;
  type: SupportAgentShiftType;
  startTime: string;
  endTime: string;
  timezone: string;
  days: number[];
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Support agent workload
 */
export interface SupportAgentWorkload extends BaseEntity, Timestamp {
  id: ID;
  agentId: ID;
  currentWorkload: number;
  maxWorkload: number;
  assignedTickets: number;
  completedTickets: number;
  pendingTickets: number;
  averageResponseTime: number;
  averageResolutionTime: number;
  updatedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Agent Core
  SUPPORT_AGENT,
  SupportAgentType,
  SupportAgentStatus,
  SupportAgentRole,
  SupportAgentSkill,
  SupportAgentLevel,
  SupportAgentShiftType,
  supportAgentGetTypeLabel,
  supportAgentGetStatusLabel,
  supportAgentGetRoleLabel,
  supportAgentGetLevelLabel,
  supportAgentIsAvailable,
  supportAgentIsOnline,
  supportAgentCanHandleWork,
  supportAgentGetSkillLabel,
  supportAgentGetShiftTypeLabel,
  // Support Agent Status
  SUPPORT_AGENT_STATUS,
  SupportAgentStatusType,
  SupportAgentStatusCategory,
  SupportAgentStatusColor,
  SupportAgentStatusIcon,
  SupportAgentStatusTransition,
  supportAgentStatusGetLabel,
  supportAgentStatusIsAvailable,
  supportAgentStatusIsOnline,
  supportAgentStatusCanHandleWork,
  supportAgentStatusGetCategory,
  supportAgentStatusCanTransition,
  // Support Agent Role
  SUPPORT_AGENT_ROLE,
  SupportAgentRoleType,
  SupportAgentRoleLevel,
  SupportAgentRolePermission,
  SupportAgentRoleColor,
  SupportAgentRoleIcon,
  supportAgentRoleGetLabel,
  supportAgentRoleGetLevel,
  supportAgentRoleGetColor,
  supportAgentRoleGetIcon,
  supportAgentRoleGetResponsibilities,
  supportAgentRoleGetPermissions,
  supportAgentRoleHasPermission,
};
