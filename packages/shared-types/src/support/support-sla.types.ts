/**
 * Support SLA Types
 * Type definitions for support SLAs based on shared-constants
 * @module SupportSLATypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-sla
// ============================================================
import {
  // Support SLA Core
  SUPPORT_SLA,
  SupportSLAType,
  SupportSLAPriority,
  SupportSLAStatus,
  SupportSLATimeUnit,
  SupportSLAEscalationLevel,
  SupportSLAPenalty,
  supportSLAGetTypeLabel,
  supportSLAGetPriorityLabel,
  supportSLAGetStatusLabel,
  supportSLAGetResponseTime,
  supportSLAGetResolutionTime,
  supportSLAGetFirstResponseTime,
  supportSLAIsActive,
  supportSLAIsViolated,
  supportSLAGetEscalationLevel,
  supportSLAIsWithinBusinessHours,
  // Support SLA Status
  SUPPORT_SLA_STATUS,
  SupportSLAStatusType,
  SupportSLAStatusCategory,
  SupportSLAStatusColor,
  SupportSLAStatusIcon,
  SupportSLAStatusTransition,
  supportSLAStatusGetLabel,
  supportSLAStatusIsActive,
  supportSLAStatusIsViolated,
  supportSLAStatusIsCompleted,
  supportSLAStatusGetCategory,
  supportSLAStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Support SLA Extended Types
// ============================================================

/**
 * Support SLA
 */
export interface SupportSLA extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: SupportSLAType;
  priority: SupportSLAPriority;
  status: SupportSLAStatus;
  timeUnit: SupportSLATimeUnit;
  escalationLevel: SupportSLAEscalationLevel;
  penalty: SupportSLAPenalty;
  name: string;
  description?: string;
  responseTime: number;
  resolutionTime: number;
  firstResponseTime: number;
  isActive: boolean;
  isViolated: boolean;
  isWithinBusinessHours: boolean;
  businessHoursStart: string;
  businessHoursEnd: string;
  businessHoursTimezone: string;
  metadata?: Metadata;
}

/**
 * Support SLA filter
 */
export interface SupportSLAFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: SupportSLAType[];
  priorities?: SupportSLAPriority[];
  statuses?: SupportSLAStatus[];
  timeUnits?: SupportSLATimeUnit[];
  escalationLevels?: SupportSLAEscalationLevel[];
  penalties?: SupportSLAPenalty[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isViolated?: boolean;
  isWithinBusinessHours?: boolean;
  minResponseTime?: number;
  maxResponseTime?: number;
  minResolutionTime?: number;
  maxResolutionTime?: number;
  minFirstResponseTime?: number;
  maxFirstResponseTime?: number;
  searchTerm?: string;
}

/**
 * Support SLA statistics
 */
export interface SupportSLAStatistics {
  userId: ID;
  totalSLAs: number;
  activeSLAs: number;
  violatedSLAs: number;
  completedSLAs: number;
  byType: Record<SupportSLAType, number>;
  byPriority: Record<SupportSLAPriority, number>;
  byStatus: Record<SupportSLAStatus, number>;
  byTimeUnit: Record<SupportSLATimeUnit, number>;
  byEscalationLevel: Record<SupportSLAEscalationLevel, number>;
  byPenalty: Record<SupportSLAPenalty, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageResponseTime: number;
  maxResponseTime: number;
  minResponseTime: number;
  averageResolutionTime: number;
  maxResolutionTime: number;
  minResolutionTime: number;
  averageFirstResponseTime: number;
  maxFirstResponseTime: number;
  minFirstResponseTime: number;
  violationRate: number;
  complianceRate: number;
  mostFrequentType: SupportSLAType;
  mostFrequentPriority: SupportSLAPriority;
  mostFrequentStatus: SupportSLAStatus;
  mostFrequentEscalationLevel: SupportSLAEscalationLevel;
}

/**
 * Support SLA summary
 */
export interface SupportSLASummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSLAs: number;
  active: number;
  violated: number;
  completed: number;
  byType: Record<SupportSLAType, number>;
  byPriority: Record<SupportSLAPriority, number>;
  byStatus: Record<SupportSLAStatus, number>;
  byTimeUnit: Record<SupportSLATimeUnit, number>;
  byEscalationLevel: Record<SupportSLAEscalationLevel, number>;
  byPenalty: Record<SupportSLAPenalty, number>;
  slaTrend: {
    date: Date;
    total: number;
    active: number;
    violated: number;
  }[];
  topTypes: {
    type: SupportSLAType;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SupportSLAPriority;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportSLAStatus;
    count: number;
    label: string;
  }[];
  topEscalationLevels: {
    level: SupportSLAEscalationLevel;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageResponseTime: number;
    averageResolutionTime: number;
    averageFirstResponseTime: number;
    violationRate: number;
    complianceRate: number;
  };
}

/**
 * Support SLA configuration
 */
export interface SupportSLAConfiguration {
  enabled: boolean;
  defaultType: SupportSLAType;
  defaultPriority: SupportSLAPriority;
  defaultStatus: SupportSLAStatus;
  defaultTimeUnit: SupportSLATimeUnit;
  defaultEscalationLevel: SupportSLAEscalationLevel;
  defaultPenalty: SupportSLAPenalty;
  defaultResponseTime: number;
  defaultResolutionTime: number;
  defaultFirstResponseTime: number;
  businessHoursStart: string;
  businessHoursEnd: string;
  businessHoursTimezone: string;
  enableEscalation: boolean;
  escalationAfterHours: number;
  enablePenalty: boolean;
  penaltyAmount: number;
  notificationOnViolation: boolean;
  notificationOnEscalation: boolean;
  notificationOnCompletion: boolean;
  alertConfig?: SupportSLAAlertConfig;
}

/**
 * Support SLA alert configuration
 */
export interface SupportSLAAlertConfig {
  enabled: boolean;
  violationAlert: boolean;
  escalationAlert: boolean;
  approachingDeadlineAlert: boolean;
  approachingDeadlineThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support SLA history
 */
export interface SupportSLAHistory extends BaseEntity, Timestamp {
  id: ID;
  slaId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'violate'
    | 'resolve'
    | 'escalate'
    | 'complete'
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
 * Support SLA validation
 */
export interface SupportSLAValidation {
  isValid: boolean;
  slaId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support SLA export
 */
export interface SupportSLAExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportSLAFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support SLA violation
 */
export interface SupportSLAViolation extends BaseEntity, Timestamp {
  id: ID;
  slaId: ID;
  userId: ID;
  ticketId: ID;
  violatedAt: Date;
  violationType: 'response' | 'resolution' | 'first_response';
  violationReason: string;
  escalationLevel: SupportSLAEscalationLevel;
  penalty: SupportSLAPenalty;
  resolvedAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support SLA Core
  SUPPORT_SLA,
  SupportSLAType,
  SupportSLAPriority,
  SupportSLAStatus,
  SupportSLATimeUnit,
  SupportSLAEscalationLevel,
  SupportSLAPenalty,
  supportSLAGetTypeLabel,
  supportSLAGetPriorityLabel,
  supportSLAGetStatusLabel,
  supportSLAGetResponseTime,
  supportSLAGetResolutionTime,
  supportSLAGetFirstResponseTime,
  supportSLAIsActive,
  supportSLAIsViolated,
  supportSLAGetEscalationLevel,
  supportSLAIsWithinBusinessHours,
  // Support SLA Status
  SUPPORT_SLA_STATUS,
  SupportSLAStatusType,
  SupportSLAStatusCategory,
  SupportSLAStatusColor,
  SupportSLAStatusIcon,
  SupportSLAStatusTransition,
  supportSLAStatusGetLabel,
  supportSLAStatusIsActive,
  supportSLAStatusIsViolated,
  supportSLAStatusIsCompleted,
  supportSLAStatusGetCategory,
  supportSLAStatusCanTransition,
};
