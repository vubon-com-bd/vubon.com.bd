/**
 * Complaint Types
 * Type definitions for support complaints based on shared-constants
 * @module ComplaintTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support complaint
// ============================================================
import {
  // Complaint Core
  COMPLAINT,
  ComplaintType,
  ComplaintStatus,
  ComplaintSeverity,
  ComplaintChannel,
  complaintGetTypeLabel,
  complaintGetStatusLabel,
  complaintGetSeverityLabel,
  complaintGetResolutionTime,
  complaintIsResolved,
  complaintIsPending,
  complaintCanEscalate,
  complaintGetChannelLabel,
  // Complaint Status
  COMPLAINT_STATUS,
  ComplaintStatusType,
  ComplaintStatusCategory,
  ComplaintStatusColor,
  ComplaintStatusIcon,
  ComplaintStatusTransition,
  complaintStatusGetLabel,
  complaintStatusIsResolved,
  complaintStatusIsPending,
  complaintStatusIsActive,
  complaintStatusGetCategory,
  complaintStatusCanTransition,
  // Complaint Severity
  COMPLAINT_SEVERITY,
  ComplaintSeverityType,
  ComplaintSeverityLevel,
  ComplaintSeverityColor,
  ComplaintSeverityIcon,
  complaintSeverityGetLabel,
  complaintSeverityGetLevel,
  complaintSeverityGetColor,
  complaintSeverityGetIcon,
  complaintSeverityGetEscalationLevel,
  complaintSeverityGetResponseTime,
  complaintSeverityIsUrgent,
} from '@vubon/shared-constants';

// ============================================================
// Complaint Extended Types
// ============================================================

/**
 * Complaint
 */
export interface Complaint extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: ComplaintType;
  status: ComplaintStatus;
  severity: ComplaintSeverity;
  channel: ComplaintChannel;
  subject: string;
  description: string;
  isResolved: boolean;
  isPending: boolean;
  isActive: boolean;
  canEscalate: boolean;
  isUrgent: boolean;
  resolutionTime?: number;
  metadata?: Metadata;
}

/**
 * Complaint filter
 */
export interface ComplaintFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ComplaintType[];
  statuses?: ComplaintStatus[];
  severities?: ComplaintSeverity[];
  channels?: ComplaintChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isResolved?: boolean;
  isPending?: boolean;
  isActive?: boolean;
  canEscalate?: boolean;
  isUrgent?: boolean;
  searchTerm?: string;
}

/**
 * Complaint statistics
 */
export interface ComplaintStatistics {
  userId: ID;
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  activeComplaints: number;
  escalatedComplaints: number;
  urgentComplaints: number;
  byType: Record<ComplaintType, number>;
  byStatus: Record<ComplaintStatus, number>;
  bySeverity: Record<ComplaintSeverity, number>;
  byChannel: Record<ComplaintChannel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageResolutionTime: number;
  maxResolutionTime: number;
  minResolutionTime: number;
  resolutionRate: number;
  escalationRate: number;
  mostFrequentType: ComplaintType;
  mostFrequentStatus: ComplaintStatus;
  mostFrequentSeverity: ComplaintSeverity;
  mostFrequentChannel: ComplaintChannel;
}

/**
 * Complaint summary
 */
export interface ComplaintSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalComplaints: number;
  resolved: number;
  pending: number;
  active: number;
  escalated: number;
  urgent: number;
  byType: Record<ComplaintType, number>;
  byStatus: Record<ComplaintStatus, number>;
  bySeverity: Record<ComplaintSeverity, number>;
  byChannel: Record<ComplaintChannel, number>;
  complaintTrend: {
    date: Date;
    total: number;
    resolved: number;
    pending: number;
  }[];
  topTypes: {
    type: ComplaintType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ComplaintStatus;
    count: number;
    label: string;
  }[];
  topSeverities: {
    severity: ComplaintSeverity;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: ComplaintChannel;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    resolutionRate: number;
    escalationRate: number;
    averageResolutionTime: number;
  };
}

/**
 * Complaint configuration
 */
export interface ComplaintConfiguration {
  enabled: boolean;
  defaultType: ComplaintType;
  defaultStatus: ComplaintStatus;
  defaultSeverity: ComplaintSeverity;
  defaultChannel: ComplaintChannel;
  requireSubject: boolean;
  requireDescription: boolean;
  allowAnonymous: boolean;
  autoResolve: boolean;
  resolveAfterDays: number;
  escalationEnabled: boolean;
  escalationAfterHours: number;
  notificationOnCreate: boolean;
  notificationOnResolve: boolean;
  notificationOnEscalate: boolean;
  alertConfig?: ComplaintAlertConfig;
}

/**
 * Complaint alert configuration
 */
export interface ComplaintAlertConfig {
  enabled: boolean;
  urgentComplaintAlert: boolean;
  highSeverityAlert: boolean;
  pendingComplaintAlert: boolean;
  pendingThreshold: number;
  escalationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Complaint history
 */
export interface ComplaintHistory extends BaseEntity, Timestamp {
  id: ID;
  complaintId: ID;
  userId: ID;
  action: 'create' | 'update' | 'resolve' | 'unresolve' | 'escalate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Complaint validation
 */
export interface ComplaintValidation {
  isValid: boolean;
  complaintId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Complaint export
 */
export interface ComplaintExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ComplaintFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Complaint escalation
 */
export interface ComplaintEscalation extends BaseEntity, Timestamp {
  id: ID;
  complaintId: ID;
  escalatedBy: ID;
  escalatedTo: ID;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  escalatedAt: Date;
  resolvedAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Complaint Core
  COMPLAINT,
  ComplaintType,
  ComplaintStatus,
  ComplaintSeverity,
  ComplaintChannel,
  complaintGetTypeLabel,
  complaintGetStatusLabel,
  complaintGetSeverityLabel,
  complaintGetResolutionTime,
  complaintIsResolved,
  complaintIsPending,
  complaintCanEscalate,
  complaintGetChannelLabel,
  // Complaint Status
  COMPLAINT_STATUS,
  ComplaintStatusType,
  ComplaintStatusCategory,
  ComplaintStatusColor,
  ComplaintStatusIcon,
  ComplaintStatusTransition,
  complaintStatusGetLabel,
  complaintStatusIsResolved,
  complaintStatusIsPending,
  complaintStatusIsActive,
  complaintStatusGetCategory,
  complaintStatusCanTransition,
  // Complaint Severity
  COMPLAINT_SEVERITY,
  ComplaintSeverityType,
  ComplaintSeverityLevel,
  ComplaintSeverityColor,
  ComplaintSeverityIcon,
  complaintSeverityGetLabel,
  complaintSeverityGetLevel,
  complaintSeverityGetColor,
  complaintSeverityGetIcon,
  complaintSeverityGetEscalationLevel,
  complaintSeverityGetResponseTime,
  complaintSeverityIsUrgent,
};
