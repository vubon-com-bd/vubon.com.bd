/**
 * Ticket Escalation Types
 * Type definitions for ticket escalations based on shared-constants
 * @module TicketEscalationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support ticket
// ============================================================
import {
  // Ticket Core
  TicketStatus,
  TicketPriority,
  // Ticket Escalation
  TICKET_ESCALATION,
  TicketEscalationType,
  TicketEscalationLevel,
  TicketEscalationAction,
  TicketEscalationTrigger,
  ticketEscalationGetLabel,
  ticketEscalationGetLevel,
  ticketEscalationGetThreshold,
  ticketEscalationGetAction,
  ticketEscalationGetNotification,
} from '@vubon/shared-constants';

// ============================================================
// Ticket Escalation Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Ticket escalation filter
 */
export interface TicketEscalationFilter {
  ids?: ID[];
  ticketIds?: ID[];
  escalatedBy?: ID[];
  escalatedTo?: ID[];
  levels?: TicketEscalationLevel[];
  types?: TicketEscalationType[];
  triggers?: TicketEscalationTrigger[];
  actions?: TicketEscalationAction[];
  statuses?: ('pending' | 'approved' | 'rejected' | 'completed' | 'cancelled')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPending?: boolean;
  isApproved?: boolean;
  isCompleted?: boolean;
  isCancelled?: boolean;
  searchTerm?: string;
}

/**
 * Ticket escalation statistics
 */
export interface TicketEscalationStatistics {
  ticketId: ID;
  totalEscalations: number;
  pendingEscalations: number;
  approvedEscalations: number;
  completedEscalations: number;
  cancelledEscalations: number;
  byLevel: Record<TicketEscalationLevel, number>;
  byType: Record<TicketEscalationType, number>;
  byTrigger: Record<TicketEscalationTrigger, number>;
  byAction: Record<TicketEscalationAction, number>;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageEscalationTime: number;
  maxEscalationTime: number;
  minEscalationTime: number;
  escalationRate: number;
  mostFrequentLevel: TicketEscalationLevel;
  mostFrequentType: TicketEscalationType;
  mostFrequentTrigger: TicketEscalationTrigger;
}

/**
 * Ticket escalation summary
 */
export interface TicketEscalationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEscalations: number;
  pending: number;
  approved: number;
  completed: number;
  cancelled: number;
  byLevel: Record<TicketEscalationLevel, number>;
  byType: Record<TicketEscalationType, number>;
  byTrigger: Record<TicketEscalationTrigger, number>;
  byAction: Record<TicketEscalationAction, number>;
  byStatus: Record<string, number>;
  escalationTrend: {
    date: Date;
    total: number;
    completed: number;
    cancelled: number;
  }[];
  topLevels: {
    level: TicketEscalationLevel;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: TicketEscalationType;
    count: number;
    label: string;
  }[];
  topTriggers: {
    trigger: TicketEscalationTrigger;
    count: number;
    label: string;
  }[];
}

/**
 * Ticket escalation configuration
 */
export interface TicketEscalationConfiguration {
  enabled: boolean;
  autoEscalate: boolean;
  autoEscalateThreshold: number;
  maxEscalationLevel: TicketEscalationLevel;
  requireReason: boolean;
  requireApproval: boolean;
  approvalRequiredFor: TicketEscalationLevel[];
  notificationOnCreate: boolean;
  notificationOnApproval: boolean;
  notificationOnRejection: boolean;
  notificationOnCompletion: boolean;
  alertConfig?: TicketEscalationAlertConfig;
}

/**
 * Ticket escalation alert configuration
 */
export interface TicketEscalationAlertConfig {
  enabled: boolean;
  pendingEscalationAlert: boolean;
  pendingEscalationThreshold: number;
  highLevelEscalationAlert: boolean;
  escalatedTicketAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Ticket escalation history
 */
export interface TicketEscalationHistory extends BaseEntity, Timestamp {
  id: ID;
  escalationId: ID;
  ticketId: ID;
  userId: ID;
  action: 'create' | 'approve' | 'reject' | 'complete' | 'cancel' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Ticket escalation validation
 */
export interface TicketEscalationValidation {
  isValid: boolean;
  escalationId: ID;
  ticketId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Ticket escalation export
 */
export interface TicketEscalationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: TicketEscalationFilter;
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
  // Ticket Core
  TicketStatus,
  TicketPriority,
  // Ticket Escalation
  TICKET_ESCALATION,
  TicketEscalationType,
  TicketEscalationLevel,
  TicketEscalationAction,
  TicketEscalationTrigger,
  ticketEscalationGetLabel,
  ticketEscalationGetLevel,
  ticketEscalationGetThreshold,
  ticketEscalationGetAction,
  ticketEscalationGetNotification,
};
