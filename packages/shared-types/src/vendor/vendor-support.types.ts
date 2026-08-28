/**
 * Vendor Support Types
 * Type definitions for vendor support based on shared-constants
 * @module VendorSupportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor support
// ============================================================
import {
  // Vendor Support
  VENDOR_SUPPORT,
  VendorSupportType,
  VendorSupportStatus,
  VendorSupportPriority,
  VendorSupportChannel,
  VendorSupportCategory,
  vendorSupportGetTypeLabel,
  vendorSupportGetStatusLabel,
  vendorSupportGetPriorityLabel,
  vendorSupportGetChannelLabel,
  vendorSupportGetCategoryLabel,
  vendorSupportIsOpen,
  vendorSupportIsResolved,
  vendorSupportGetResponseTime,
  vendorSupportGetResolutionTime,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Support Extended Types
// ============================================================

/**
 * Vendor support ticket
 */
export interface VendorSupportTicket extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorSupportType;
  status: VendorSupportStatus;
  priority: VendorSupportPriority;
  channel: VendorSupportChannel;
  category: VendorSupportCategory;
  subject: string;
  message: string;
  isOpen: boolean;
  isResolved: boolean;
  responseTime: number;
  resolutionTime: number;
  assignedTo?: ID;
  resolvedAt?: Date;
  closedAt?: Date;
  metadata?: Metadata;
}

/**
 * Vendor support filter
 */
export interface VendorSupportFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorSupportType[];
  statuses?: VendorSupportStatus[];
  priorities?: VendorSupportPriority[];
  channels?: VendorSupportChannel[];
  categories?: VendorSupportCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isOpen?: boolean;
  isResolved?: boolean;
  assignedTo?: ID;
  searchTerm?: string;
  subject?: string;
}

/**
 * Vendor support statistics
 */
export interface VendorSupportStatistics {
  vendorId: ID;
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  closedTickets: number;
  escalatedTickets: number;
  pendingTickets: number;
  byType: Record<VendorSupportType, number>;
  byStatus: Record<VendorSupportStatus, number>;
  byPriority: Record<VendorSupportPriority, number>;
  byChannel: Record<VendorSupportChannel, number>;
  byCategory: Record<VendorSupportCategory, number>;
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
  resolutionRate: number;
  escalationRate: number;
  mostFrequentType: VendorSupportType;
  mostFrequentStatus: VendorSupportStatus;
  mostFrequentPriority: VendorSupportPriority;
  mostFrequentCategory: VendorSupportCategory;
}

/**
 * Vendor support summary
 */
export interface VendorSupportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTickets: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  escalated: number;
  pending: number;
  byType: Record<VendorSupportType, number>;
  byStatus: Record<VendorSupportStatus, number>;
  byPriority: Record<VendorSupportPriority, number>;
  byChannel: Record<VendorSupportChannel, number>;
  byCategory: Record<VendorSupportCategory, number>;
  supportTrend: {
    date: Date;
    total: number;
    resolved: number;
    open: number;
  }[];
  topTypes: {
    type: VendorSupportType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorSupportStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: VendorSupportPriority;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorSupportCategory;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageResponseTime: number;
    averageResolutionTime: number;
    resolutionRate: number;
    escalationRate: number;
  };
}

/**
 * Vendor support configuration
 */
export interface VendorSupportConfiguration {
  enabled: boolean;
  defaultType: VendorSupportType;
  defaultPriority: VendorSupportPriority;
  defaultChannel: VendorSupportChannel;
  defaultCategory: VendorSupportCategory;
  responseTime: Record<VendorSupportPriority, number>;
  resolutionTime: Record<VendorSupportPriority, number>;
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
  alertConfig?: VendorSupportAlertConfig;
}

/**
 * Vendor support alert configuration
 */
export interface VendorSupportAlertConfig {
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
 * Vendor support history
 */
export interface VendorSupportHistory extends BaseEntity, Timestamp {
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
 * Vendor support message
 */
export interface VendorSupportMessage extends BaseEntity, Timestamp {
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
 * Vendor support validation
 */
export interface VendorSupportValidation {
  isValid: boolean;
  ticketId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor support export
 */
export interface VendorSupportExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorSupportFilter;
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
  // Vendor Support
  VENDOR_SUPPORT,
  VendorSupportType,
  VendorSupportStatus,
  VendorSupportPriority,
  VendorSupportChannel,
  VendorSupportCategory,
  vendorSupportGetTypeLabel,
  vendorSupportGetStatusLabel,
  vendorSupportGetPriorityLabel,
  vendorSupportGetChannelLabel,
  vendorSupportGetCategoryLabel,
  vendorSupportIsOpen,
  vendorSupportIsResolved,
  vendorSupportGetResponseTime,
  vendorSupportGetResolutionTime,
};
