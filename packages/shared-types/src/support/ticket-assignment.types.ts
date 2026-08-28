/**
 * Ticket Assignment Types
 * Type definitions for ticket assignments based on shared-constants
 * @module TicketAssignmentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support ticket
// ============================================================
import {
  // Ticket Core
  TicketStatus,
  TicketPriority,
  TicketType,
  TicketChannel,
  TicketCategory,
  TicketTag,
} from '@vubon/shared-constants';

// ============================================================
// Ticket Assignment Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Ticket assignment filter
 */
export interface TicketAssignmentFilter {
  ids?: ID[];
  ticketIds?: ID[];
  assignedTo?: ID[];
  assignedBy?: ID[];
  statuses?: ('active' | 'reassigned' | 'completed' | 'cancelled')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isCancelled?: boolean;
  searchTerm?: string;
}

/**
 * Ticket assignment statistics
 */
export interface TicketAssignmentStatistics {
  userId: ID;
  totalAssignments: number;
  activeAssignments: number;
  completedAssignments: number;
  cancelledAssignments: number;
  reassignedAssignments: number;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageAssignmentDuration: number;
  maxAssignmentDuration: number;
  minAssignmentDuration: number;
  mostFrequentStatus: string;
  mostActiveAgent: ID;
  mostAssignedAgent: ID;
}

/**
 * Ticket assignment summary
 */
export interface TicketAssignmentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAssignments: number;
  active: number;
  completed: number;
  cancelled: number;
  reassigned: number;
  byStatus: Record<string, number>;
  assignmentTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
  }[];
  topAgents: {
    agentId: ID;
    count: number;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
}

/**
 * Ticket assignment configuration
 */
export interface TicketAssignmentConfiguration {
  enabled: boolean;
  autoAssign: boolean;
  autoAssignStrategy: 'round_robin' | 'least_busy' | 'skill_based' | 'priority_based' | 'random';
  maxAssignmentsPerAgent: number;
  allowReassignment: boolean;
  requireNote: boolean;
  notificationOnAssign: boolean;
  notificationOnReassign: boolean;
  notificationOnComplete: boolean;
  alertConfig?: TicketAssignmentAlertConfig;
}

/**
 * Ticket assignment alert configuration
 */
export interface TicketAssignmentAlertConfig {
  enabled: boolean;
  unassignedTicketAlert: boolean;
  unassignedTicketThreshold: number;
  overloadedAgentAlert: boolean;
  overloadedAgentThreshold: number;
  delayedAssignmentAlert: boolean;
  delayedAssignmentThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Ticket assignment history
 */
export interface TicketAssignmentHistory extends BaseEntity, Timestamp {
  id: ID;
  assignmentId: ID;
  ticketId: ID;
  userId: ID;
  action: 'assign' | 'reassign' | 'complete' | 'cancel';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Ticket assignment validation
 */
export interface TicketAssignmentValidation {
  isValid: boolean;
  assignmentId: ID;
  ticketId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Ticket assignment export
 */
export interface TicketAssignmentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: TicketAssignmentFilter;
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
  TicketType,
  TicketChannel,
  TicketCategory,
  TicketTag,
};
