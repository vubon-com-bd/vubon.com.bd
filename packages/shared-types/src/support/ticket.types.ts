/**
 * Ticket Types
 * Type definitions for support tickets based on shared-constants
 * @module TicketTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support ticket
// ============================================================
import {
  // Ticket Core
  TICKET,
  TicketStatus,
  TicketPriority,
  TicketType,
  TicketChannel,
  TicketCategory,
  TicketTag,
  TicketEscalationLevelType,
  TicketSatisfactionLevelType,
  ticketGetStatusLabel,
  ticketGetPriorityLabel,
  ticketGetTypeLabel,
  ticketGetChannelLabel,
  ticketGetCategoryLabel,
  ticketGetEscalationLevel,
  ticketGetSatisfactionLabel,
  ticketIsResolved,
  ticketIsOpen,
  ticketIsClosed,
  ticketIsEscalated,
  ticketGetPriorityWeight,
  // Ticket Status
  TICKET_STATUS,
  TicketStatusType,
  TicketStatusCategory,
  TicketStatusColor,
  TicketStatusTransition as TicketStatusTransitionType,
  ticketStatusGetLabel,
  ticketStatusIsResolved,
  ticketStatusIsOpen,
  ticketStatusIsClosed,
  ticketStatusIsPending,
  ticketStatusGetCategory,
  ticketStatusIsActive,
  // Ticket Priority
  TICKET_PRIORITY,
  TicketPriorityType,
  TicketPriorityLevel,
  TicketPriorityColor,
  ticketPriorityGetLabel,
  ticketPriorityGetWeight,
  ticketPriorityGetSLA,
  ticketPriorityIsUrgent,
  ticketPriorityGetColor,
  ticketPriorityGetLevel,
  // Ticket Type
  TICKET_TYPE,
  TicketTypeType,
  TicketTypeCategory,
  ticketTypeGetLabel,
  ticketTypeGetCategory,
  ticketTypeGetDefaultPriority,
  ticketTypeIsTechnical,
  ticketTypeIsBilling,
  // Ticket Channel
  TICKET_CHANNEL,
  TicketChannelType,
  TicketChannelCategory,
  TicketChannelIcon,
  ticketChannelGetLabel,
  ticketChannelGetIcon,
  ticketChannelIsSync,
  ticketChannelIsAsync,
  ticketChannelGetResponseTime,
  // Ticket Category
  TICKET_CATEGORY,
  TicketCategoryType,
  TicketCategoryDepartment,
  ticketCategoryGetLabel,
  ticketCategoryGetDefaultPriority,
  ticketCategoryGetDepartment,
  ticketCategoryIsTechnical,
  ticketCategoryIsBilling,
  // Ticket Tag
  TICKET_TAG,
  TicketTagType,
  TicketTagCategory,
  TicketTagColor,
  ticketTagGetLabel,
  ticketTagGetColor,
  ticketTagGetCategory,
  ticketTagGetPriority,
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
  // Ticket Satisfaction
  TICKET_SATISFACTION,
  TicketSatisfactionLevel,
  TicketSatisfactionScore,
  TicketSatisfactionEmoji,
  TicketSatisfactionCategory,
  ticketSatisfactionGetLabel,
  ticketSatisfactionGetScore,
  ticketSatisfactionIsPositive,
  ticketSatisfactionIsNegative,
  ticketSatisfactionGetEmoji,
  ticketSatisfactionGetCategory,
} from '@vubon/shared-constants';

// ============================================================
// Ticket Extended Types
// ============================================================

/**
 * Ticket
 */
export interface Ticket extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  assignedTo?: ID;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  category: TicketCategory;
  tags: TicketTag[];
  subject: string;
  description: string;
  escalation: TicketEscalationLevel;
  satisfaction: TicketSatisfactionLevel;
  isOpen: boolean;
  isClosed: boolean;
  isResolved: boolean;
  isEscalated: boolean;
  isAssigned: boolean;
  metadata?: Metadata;
}

/**
 * Ticket filter
 */
export interface TicketFilter {
  ids?: ID[];
  userIds?: ID[];
  assignedTo?: ID[];
  types?: TicketType[];
  statuses?: TicketStatus[];
  priorities?: TicketPriority[];
  channels?: TicketChannel[];
  categories?: TicketCategory[];
  tags?: TicketTag[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isOpen?: boolean;
  isClosed?: boolean;
  isResolved?: boolean;
  isEscalated?: boolean;
  isAssigned?: boolean;
  searchTerm?: string;
}

/**
 * Ticket statistics
 */
export interface TicketStatistics {
  userId: ID;
  totalTickets: number;
  openTickets: number;
  closedTickets: number;
  resolvedTickets: number;
  escalatedTickets: number;
  assignedTickets: number;
  byType: Record<TicketType, number>;
  byStatus: Record<TicketStatus, number>;
  byPriority: Record<TicketPriority, number>;
  byChannel: Record<TicketChannel, number>;
  byCategory: Record<TicketCategory, number>;
  byTag: Record<TicketTag, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageResolutionTime: number;
  maxResolutionTime: number;
  minResolutionTime: number;
  firstResponseTime: number;
  satisfactionScore: number;
  escalationRate: number;
  mostFrequentType: TicketType;
  mostFrequentStatus: TicketStatus;
  mostFrequentPriority: TicketPriority;
  mostFrequentCategory: TicketCategory;
}

/**
 * Ticket summary
 */
export interface TicketSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTickets: number;
  open: number;
  closed: number;
  resolved: number;
  escalated: number;
  assigned: number;
  byType: Record<TicketType, number>;
  byStatus: Record<TicketStatus, number>;
  byPriority: Record<TicketPriority, number>;
  byChannel: Record<TicketChannel, number>;
  byCategory: Record<TicketCategory, number>;
  byTag: Record<TicketTag, number>;
  ticketTrend: {
    date: Date;
    total: number;
    open: number;
    resolved: number;
  }[];
  topTypes: {
    type: TicketType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: TicketStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: TicketPriority;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: TicketCategory;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageResolutionTime: number;
    firstResponseTime: number;
    satisfactionScore: number;
    escalationRate: number;
  };
}

/**
 * Ticket assignment
 */
export interface TicketAssignment extends BaseEntity, Timestamp {
  id: ID;
  ticketId: ID;
  assignedTo: ID;
  assignedBy: ID;
  assignedAt: Date;
  reassignedAt?: Date;
  status: 'active' | 'reassigned' | 'completed' | 'cancelled';
  metadata?: Metadata;
}

/**
 * Ticket escalation
 */
export interface TicketEscalation extends BaseEntity, Timestamp {
  id: ID;
  ticketId: ID;
  escalatedBy: ID;
  escalatedTo: ID;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  escalatedAt: Date;
  resolvedAt?: Date;
  metadata?: Metadata;
}

/**
 * Ticket status transition (local type)
 */
export interface TicketStatusTransitionLocal {
  from: TicketStatus;
  to: TicketStatus;
  isValid: boolean;
  canTransition: boolean;
  requiredActions: string[];
  metadata?: Metadata;
}

/**
 * Ticket validation
 */
export interface TicketValidation {
  isValid: boolean;
  ticketId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Ticket export
 */
export interface TicketExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: TicketFilter;
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
  TICKET,
  TicketStatus,
  TicketPriority,
  TicketType,
  TicketChannel,
  TicketCategory,
  TicketTag,
  TicketEscalationLevelType,
  TicketSatisfactionLevelType,
  ticketGetStatusLabel,
  ticketGetPriorityLabel,
  ticketGetTypeLabel,
  ticketGetChannelLabel,
  ticketGetCategoryLabel,
  ticketGetEscalationLevel,
  ticketGetSatisfactionLabel,
  ticketIsResolved,
  ticketIsOpen,
  ticketIsClosed,
  ticketIsEscalated,
  ticketGetPriorityWeight,
  // Ticket Status
  TICKET_STATUS,
  TicketStatusType,
  TicketStatusCategory,
  TicketStatusColor,
  TicketStatusTransitionType,
  ticketStatusGetLabel,
  ticketStatusIsResolved,
  ticketStatusIsOpen,
  ticketStatusIsClosed,
  ticketStatusIsPending,
  ticketStatusGetCategory,
  ticketStatusIsActive,
  // Ticket Priority
  TICKET_PRIORITY,
  TicketPriorityType,
  TicketPriorityLevel,
  TicketPriorityColor,
  ticketPriorityGetLabel,
  ticketPriorityGetWeight,
  ticketPriorityGetSLA,
  ticketPriorityIsUrgent,
  ticketPriorityGetColor,
  ticketPriorityGetLevel,
  // Ticket Type
  TICKET_TYPE,
  TicketTypeType,
  TicketTypeCategory,
  ticketTypeGetLabel,
  ticketTypeGetCategory,
  ticketTypeGetDefaultPriority,
  ticketTypeIsTechnical,
  ticketTypeIsBilling,
  // Ticket Channel
  TICKET_CHANNEL,
  TicketChannelType,
  TicketChannelCategory,
  TicketChannelIcon,
  ticketChannelGetLabel,
  ticketChannelGetIcon,
  ticketChannelIsSync,
  ticketChannelIsAsync,
  ticketChannelGetResponseTime,
  // Ticket Category
  TICKET_CATEGORY,
  TicketCategoryType,
  TicketCategoryDepartment,
  ticketCategoryGetLabel,
  ticketCategoryGetDefaultPriority,
  ticketCategoryGetDepartment,
  ticketCategoryIsTechnical,
  ticketCategoryIsBilling,
  // Ticket Tag
  TICKET_TAG,
  TicketTagType,
  TicketTagCategory,
  TicketTagColor,
  ticketTagGetLabel,
  ticketTagGetColor,
  ticketTagGetCategory,
  ticketTagGetPriority,
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
  // Ticket Satisfaction
  TICKET_SATISFACTION,
  TicketSatisfactionLevel,
  TicketSatisfactionScore,
  TicketSatisfactionEmoji,
  TicketSatisfactionCategory,
  ticketSatisfactionGetLabel,
  ticketSatisfactionGetScore,
  ticketSatisfactionIsPositive,
  ticketSatisfactionIsNegative,
  ticketSatisfactionGetEmoji,
  ticketSatisfactionGetCategory,
};
