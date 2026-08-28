/**
 * Ticket History Types
 * Type definitions for ticket history based on shared-constants
 * @module TicketHistoryTypes
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
// Ticket History Extended Types
// ============================================================

/**
 * Ticket history entry
 */
export interface TicketHistoryEntry extends BaseEntity, Timestamp {
  id: ID;
  ticketId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'status_change'
    | 'priority_change'
    | 'assign'
    | 'reassign'
    | 'escalate'
    | 'resolve'
    | 'close'
    | 'reopen'
    | 'comment'
    | 'tag_add'
    | 'tag_remove';
  description: string;
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Ticket history filter
 */
export interface TicketHistoryFilter {
  ids?: ID[];
  ticketIds?: ID[];
  userIds?: ID[];
  actions?: (
    | 'create'
    | 'update'
    | 'status_change'
    | 'priority_change'
    | 'assign'
    | 'reassign'
    | 'escalate'
    | 'resolve'
    | 'close'
    | 'reopen'
    | 'comment'
    | 'tag_add'
    | 'tag_remove'
  )[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Ticket history statistics
 */
export interface TicketHistoryStatistics {
  ticketId: ID;
  totalEvents: number;
  uniqueUsers: number;
  byAction: Record<string, number>;
  byUser: Record<ID, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageEventsPerTicket: number;
  maxEventsPerTicket: number;
  minEventsPerTicket: number;
  mostFrequentAction: string;
  mostActiveUser: ID;
}

/**
 * Ticket history summary
 */
export interface TicketHistorySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEvents: number;
  totalTickets: number;
  uniqueUsers: number;
  byAction: Record<string, number>;
  byUser: Record<ID, number>;
  eventTrend: {
    date: Date;
    total: number;
    create: number;
    resolve: number;
  }[];
  topActions: {
    action: string;
    count: number;
    label: string;
  }[];
  topUsers: {
    userId: ID;
    count: number;
  }[];
}

/**
 * Ticket history configuration
 */
export interface TicketHistoryConfiguration {
  enabled: boolean;
  trackAllActions: boolean;
  trackStatusChanges: boolean;
  trackPriorityChanges: boolean;
  trackAssignments: boolean;
  trackEscalations: boolean;
  trackComments: boolean;
  trackTags: boolean;
  retentionDays: number;
  autoArchive: boolean;
  archiveAfterDays: number;
  notificationOnComment: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: TicketHistoryAlertConfig;
}

/**
 * Ticket history alert configuration
 */
export interface TicketHistoryAlertConfig {
  enabled: boolean;
  staleTicketAlert: boolean;
  staleTicketThreshold: number;
  highActivityAlert: boolean;
  highActivityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Ticket history validation
 */
export interface TicketHistoryValidation {
  isValid: boolean;
  entryId: ID;
  ticketId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Ticket history export
 */
export interface TicketHistoryExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: TicketHistoryFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Ticket history timeline
 */
export interface TicketHistoryTimeline {
  ticketId: ID;
  events: TicketHistoryEntry[];
  duration: {
    created: Date;
    resolved?: Date;
    closed?: Date;
  };
  statusTransitions: {
    from: TicketStatus;
    to: TicketStatus;
    at: Date;
  }[];
  priorityChanges: {
    from: TicketPriority;
    to: TicketPriority;
    at: Date;
  }[];
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
