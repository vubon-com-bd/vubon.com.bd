/**
 * Vendor Ticket Types
 * Type definitions for vendor tickets based on shared-constants
 * @module VendorTicketTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor ticket
// ============================================================
import {
  // Vendor Ticket
  VENDOR_TICKET,
  VendorTicketType,
  VendorTicketStatus,
  VendorTicketPriority,
  VendorTicketCategory,
  VendorTicketChannel,
  vendorTicketGetTypeLabel,
  vendorTicketGetStatusLabel,
  vendorTicketGetPriorityLabel,
  vendorTicketGetCategoryLabel,
  vendorTicketGetChannelLabel,
  vendorTicketIsOpen,
  vendorTicketIsResolved,
  vendorTicketGetResponseTime,
  vendorTicketGetResolutionTime,
  // Vendor Ticket Priority
  VENDOR_TICKET_PRIORITY,
  VendorTicketPriorityType,
  VendorTicketPriorityLevel,
  VendorTicketPriorityColor,
  VendorTicketPriorityIcon,
  vendorTicketPriorityGetLabel,
  vendorTicketPriorityGetLevel,
  vendorTicketPriorityGetColor,
  vendorTicketPriorityGetResponseTime,
  vendorTicketPriorityGetResolutionTime,
  vendorTicketPriorityGetEscalationTime,
  // Vendor Ticket Status
  VENDOR_TICKET_STATUS,
  VendorTicketStatusType,
  VendorTicketStatusCategory,
  VendorTicketStatusColor,
  VendorTicketStatusIcon,
  VendorTicketStatusTransition,
  vendorTicketStatusGetLabel,
  vendorTicketStatusIsOpen,
  vendorTicketStatusIsResolved,
  vendorTicketStatusIsPending,
  vendorTicketStatusGetCategory,
  vendorTicketStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Ticket Extended Types
// ============================================================

/**
 * Vendor ticket
 */
export interface VendorTicket extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorTicketType;
  status: VendorTicketStatusType;
  priority: VendorTicketPriorityType;
  category: VendorTicketCategory;
  channel: VendorTicketChannel;
  subject: string;
  message: string;
  isOpen: boolean;
  isResolved: boolean;
  isPending: boolean;
  responseTime: number;
  resolutionTime: number;
  escalationTime: number;
  assignedTo?: ID;
  resolvedAt?: Date;
  closedAt?: Date;
  metadata?: Metadata;
}

/**
 * Vendor ticket filter
 */
export interface VendorTicketFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorTicketType[];
  statuses?: VendorTicketStatusType[];
  priorities?: VendorTicketPriorityType[];
  categories?: VendorTicketCategory[];
  channels?: VendorTicketChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isOpen?: boolean;
  isResolved?: boolean;
  isPending?: boolean;
  assignedTo?: ID;
  searchTerm?: string;
  subject?: string;
}

/**
 * Vendor ticket statistics
 */
export interface VendorTicketStatistics {
  vendorId: ID;
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  pendingTickets: number;
  byType: Record<VendorTicketType, number>;
  byStatus: Record<VendorTicketStatusType, number>;
  byPriority: Record<VendorTicketPriorityType, number>;
  byCategory: Record<VendorTicketCategory, number>;
  byChannel: Record<VendorTicketChannel, number>;
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
  averageEscalationTime: number;
  maxEscalationTime: number;
  minEscalationTime: number;
  resolutionRate: number;
  mostFrequentType: VendorTicketType;
  mostFrequentStatus: VendorTicketStatusType;
  mostFrequentPriority: VendorTicketPriorityType;
  mostFrequentCategory: VendorTicketCategory;
}

/**
 * Vendor ticket summary
 */
export interface VendorTicketSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTickets: number;
  open: number;
  resolved: number;
  pending: number;
  byType: Record<VendorTicketType, number>;
  byStatus: Record<VendorTicketStatusType, number>;
  byPriority: Record<VendorTicketPriorityType, number>;
  byCategory: Record<VendorTicketCategory, number>;
  byChannel: Record<VendorTicketChannel, number>;
  ticketTrend: {
    date: Date;
    total: number;
    resolved: number;
    open: number;
  }[];
  topTypes: {
    type: VendorTicketType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorTicketStatusType;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: VendorTicketPriorityType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorTicketCategory;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageResponseTime: number;
    averageResolutionTime: number;
    averageEscalationTime: number;
    resolutionRate: number;
  };
}

/**
 * Vendor ticket configuration
 */
export interface VendorTicketConfiguration {
  enabled: boolean;
  defaultType: VendorTicketType;
  defaultPriority: VendorTicketPriorityType;
  defaultChannel: VendorTicketChannel;
  defaultCategory: VendorTicketCategory;
  responseTime: Record<VendorTicketPriorityType, number>;
  resolutionTime: Record<VendorTicketPriorityType, number>;
  escalationTime: Record<VendorTicketPriorityType, number>;
  autoAssign: boolean;
  autoEscalate: boolean;
  escalationThresholdHours: number;
  requireSubject: boolean;
  requireMessage: boolean;
  allowAttachments: boolean;
  maxAttachments: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnResolve: boolean;
  notificationOnEscalate: boolean;
  alertConfig?: VendorTicketAlertConfig;
}

/**
 * Vendor ticket alert configuration
 */
export interface VendorTicketAlertConfig {
  enabled: boolean;
  responseTimeAlert: boolean;
  responseTimeThresholdHours: number;
  resolutionTimeAlert: boolean;
  resolutionTimeThresholdHours: number;
  escalationAlert: boolean;
  highVolumeAlert: boolean;
  highVolumeThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor ticket history
 */
export interface VendorTicketHistory extends BaseEntity, Timestamp {
  id: ID;
  ticketId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'assign'
    | 'escalate'
    | 'resolve'
    | 'close'
    | 'reopen'
    | 'priority_change'
    | 'status_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor ticket message
 */
export interface VendorTicketMessage extends BaseEntity, Timestamp {
  id: ID;
  ticketId: ID;
  vendorId: ID;
  userId: ID;
  message: string;
  isInternal: boolean;
  attachments: string[];
  metadata?: Metadata;
}

/**
 * Vendor ticket validation
 */
export interface VendorTicketValidation {
  isValid: boolean;
  ticketId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor ticket export
 */
export interface VendorTicketExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorTicketFilter;
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
  // Vendor Ticket
  VENDOR_TICKET,
  VendorTicketType,
  VendorTicketStatus,
  VendorTicketPriority,
  VendorTicketCategory,
  VendorTicketChannel,
  vendorTicketGetTypeLabel,
  vendorTicketGetStatusLabel,
  vendorTicketGetPriorityLabel,
  vendorTicketGetCategoryLabel,
  vendorTicketGetChannelLabel,
  vendorTicketIsOpen,
  vendorTicketIsResolved,
  vendorTicketGetResponseTime,
  vendorTicketGetResolutionTime,
  // Vendor Ticket Priority
  VENDOR_TICKET_PRIORITY,
  VendorTicketPriorityType,
  VendorTicketPriorityLevel,
  VendorTicketPriorityColor,
  VendorTicketPriorityIcon,
  vendorTicketPriorityGetLabel,
  vendorTicketPriorityGetLevel,
  vendorTicketPriorityGetColor,
  vendorTicketPriorityGetResponseTime,
  vendorTicketPriorityGetResolutionTime,
  vendorTicketPriorityGetEscalationTime,
  // Vendor Ticket Status
  VENDOR_TICKET_STATUS,
  VendorTicketStatusType,
  VendorTicketStatusCategory,
  VendorTicketStatusColor,
  VendorTicketStatusIcon,
  VendorTicketStatusTransition,
  vendorTicketStatusGetLabel,
  vendorTicketStatusIsOpen,
  vendorTicketStatusIsResolved,
  vendorTicketStatusIsPending,
  vendorTicketStatusGetCategory,
  vendorTicketStatusCanTransition,
};
