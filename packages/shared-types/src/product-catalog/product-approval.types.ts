/**
 * Product Approval Types
 * Type definitions for product approval based on shared-constants
 * @module ProductApprovalTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Approval
  PRODUCTAPPROVAL,
  ProductApprovalStatus,
  ProductApprovalType,
  ProductApprovalPriority,
  ProductApprovalAction,
  ProductApprovalDefault,
  ProductApprovalLimit,
  productapprovalGetStatusLabel,
  productapprovalGetTypeLabel,
  productapprovalGetPriorityLabel,
  productapprovalGetActionLabel,
  productapprovalIsPending,
  productapprovalIsApproved,
  productapprovalIsRejected,
  productapprovalGetDefaultTimeoutHours,
  productapprovalGetMaxApprovers,
} from '@vubon/shared-constants';

// ============================================================
// Product Approval Extended Types
// ============================================================

/**
 * Product approval filter
 */
export interface ProductApprovalFilter {
  ids?: ID[];
  productIds?: ID[];
  types?: ProductApprovalType[];
  statuses?: ProductApprovalStatus[];
  priorities?: ProductApprovalPriority[];
  actions?: ProductApprovalAction[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPending?: boolean;
  isApproved?: boolean;
  isRejected?: boolean;
  requestedBy?: ID;
  approvedBy?: ID;
  rejectedBy?: ID;
  searchTerm?: string;
}

/**
 * Product approval statistics
 */
export interface ProductApprovalStatistics {
  productId: ID;
  totalApprovals: number;
  pendingApprovals: number;
  approvedApprovals: number;
  rejectedApprovals: number;
  byType: Record<ProductApprovalType, number>;
  byStatus: Record<ProductApprovalStatus, number>;
  byPriority: Record<ProductApprovalPriority, number>;
  byAction: Record<ProductApprovalAction, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageApprovalTime: number;
  maxApprovalTime: number;
  minApprovalTime: number;
  approvalRate: number;
  rejectionRate: number;
  mostFrequentType: ProductApprovalType;
  mostFrequentStatus: ProductApprovalStatus;
  mostFrequentPriority: ProductApprovalPriority;
}

/**
 * Product approval summary
 */
export interface ProductApprovalSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalApprovals: number;
  pending: number;
  approved: number;
  rejected: number;
  byType: Record<ProductApprovalType, number>;
  byStatus: Record<ProductApprovalStatus, number>;
  byPriority: Record<ProductApprovalPriority, number>;
  byAction: Record<ProductApprovalAction, number>;
  approvalTrend: {
    date: Date;
    total: number;
    approved: number;
    rejected: number;
  }[];
  topTypes: {
    type: ProductApprovalType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ProductApprovalStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: ProductApprovalPriority;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    approvalRate: number;
    rejectionRate: number;
    averageApprovalTime: number;
  };
}

/**
 * Product approval configuration
 */
export interface ProductApprovalConfiguration {
  enabled: boolean;
  defaultType: ProductApprovalType;
  defaultPriority: ProductApprovalPriority;
  defaultAction: ProductApprovalAction;
  defaultTimeoutHours: number;
  maxApprovers: number;
  requireApproval: boolean;
  requireComments: boolean;
  autoApprove: boolean;
  autoReject: boolean;
  autoApproveThreshold: number;
  notificationOnRequest: boolean;
  notificationOnApproval: boolean;
  notificationOnRejection: boolean;
  notificationOnTimeout: boolean;
  alertConfig?: ProductApprovalAlertConfig;
}

/**
 * Product approval alert configuration
 */
export interface ProductApprovalAlertConfig {
  enabled: boolean;
  timeoutAlert: boolean;
  pendingAlert: boolean;
  rejectionAlert: boolean;
  highPriorityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  timeoutThreshold: number;
}

/**
 * Product approval history
 */
export interface ProductApprovalHistory extends BaseEntity, Timestamp {
  id: ID;
  approvalId: ID;
  productId: ID;
  action: 'request' | 'approve' | 'reject' | 'cancel' | 'timeout' | 'update' | 'review';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Product approval validation
 */
export interface ProductApprovalValidation {
  isValid: boolean;
  approvalId: ID;
  productId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Product approval comment
 */
export interface ProductApprovalComment extends BaseEntity, Timestamp {
  id: ID;
  approvalId: ID;
  productId: ID;
  userId: ID;
  comment: string;
  isInternal: boolean;
  metadata?: Metadata;
}

/**
 * Product approval export
 */
export interface ProductApprovalExport extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ProductApprovalFilter;
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
  // Approval
  PRODUCTAPPROVAL,
  ProductApprovalStatus,
  ProductApprovalType,
  ProductApprovalPriority,
  ProductApprovalAction,
  ProductApprovalDefault,
  ProductApprovalLimit,
  productapprovalGetStatusLabel,
  productapprovalGetTypeLabel,
  productapprovalGetPriorityLabel,
  productapprovalGetActionLabel,
  productapprovalIsPending,
  productapprovalIsApproved,
  productapprovalIsRejected,
  productapprovalGetDefaultTimeoutHours,
  productapprovalGetMaxApprovers,
};
