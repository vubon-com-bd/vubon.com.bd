/**
 * Vendor Approval Types
 * Type definitions for vendor approval based on shared-constants
 * @module VendorApprovalTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Vendor Approval
  VENDOR_APPROVAL,
  VendorApprovalType,
  VendorApprovalCategory,
  VendorApprovalColor,
  VendorApprovalIcon,
  VendorApprovalReason,
  VendorApprovalAction,
  vendorApprovalGetLabel,
  vendorApprovalIsApproved,
  vendorApprovalIsPending,
  vendorApprovalIsRejected,
  vendorApprovalGetCategory,
  vendorApprovalGetReasonLabel,
  vendorApprovalGetActionLabel,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Approval Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor approval filter
 */
export interface VendorApprovalFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorApprovalType[];
  categories?: VendorApprovalCategory[];
  statuses?: ('pending' | 'approved' | 'rejected' | 'cancelled' | 'expired' | 'review')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isApproved?: boolean;
  isPending?: boolean;
  isRejected?: boolean;
  searchTerm?: string;
  approvedBy?: ID;
  rejectedBy?: ID;
}

/**
 * Vendor approval statistics
 */
export interface VendorApprovalStatistics {
  vendorId: ID;
  totalApprovals: number;
  pendingApprovals: number;
  approvedApprovals: number;
  rejectedApprovals: number;
  cancelledApprovals: number;
  expiredApprovals: number;
  reviewApprovals: number;
  byType: Record<VendorApprovalType, number>;
  byCategory: Record<VendorApprovalCategory, number>;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageApprovalTime: number;
  maxApprovalTime: number;
  minApprovalTime: number;
  approvalRate: number;
  rejectionRate: number;
  mostFrequentType: VendorApprovalType;
  mostFrequentCategory: VendorApprovalCategory;
  mostFrequentStatus: string;
  mostFrequentReason: VendorApprovalReason;
}

/**
 * Vendor approval summary
 */
export interface VendorApprovalSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalApprovals: number;
  pending: number;
  approved: number;
  rejected: number;
  cancelled: number;
  expired: number;
  review: number;
  byType: Record<VendorApprovalType, number>;
  byCategory: Record<VendorApprovalCategory, number>;
  byStatus: Record<string, number>;
  approvalTrend: {
    date: Date;
    total: number;
    approved: number;
    rejected: number;
  }[];
  topTypes: {
    type: VendorApprovalType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorApprovalCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  topReasons: {
    reason: VendorApprovalReason;
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
 * Vendor approval configuration
 */
export interface VendorApprovalConfiguration {
  enabled: boolean;
  requireApproval: boolean;
  approvalTypes: VendorApprovalType[];
  autoApprove: boolean;
  autoApproveThreshold: number;
  requireComments: boolean;
  requireReason: boolean;
  maxApprovers: number;
  approvalTimeoutDays: number;
  allowResubmit: boolean;
  resubmitCooldownDays: number;
  notificationOnRequest: boolean;
  notificationOnApproval: boolean;
  notificationOnRejection: boolean;
  notificationOnReview: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: VendorApprovalAlertConfig;
}

/**
 * Vendor approval alert configuration
 */
export interface VendorApprovalAlertConfig {
  enabled: boolean;
  pendingAlert: boolean;
  pendingThresholdDays: number;
  rejectionAlert: boolean;
  expiryAlert: boolean;
  expiryThresholdDays: number;
  timeoutAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor approval history
 */
export interface VendorApprovalHistory extends BaseEntity, Timestamp {
  id: ID;
  approvalId: ID;
  vendorId: ID;
  userId: ID;
  action: 'request' | 'review' | 'approve' | 'reject' | 'cancel' | 'expire' | 'resubmit' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor approval validation
 */
export interface VendorApprovalValidation {
  isValid: boolean;
  approvalId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor approval export
 */
export interface VendorApprovalExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorApprovalFilter;
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
  // Vendor Approval
  VENDOR_APPROVAL,
  VendorApprovalType,
  VendorApprovalCategory,
  VendorApprovalColor,
  VendorApprovalIcon,
  VendorApprovalReason,
  VendorApprovalAction,
  vendorApprovalGetLabel,
  vendorApprovalIsApproved,
  vendorApprovalIsPending,
  vendorApprovalIsRejected,
  vendorApprovalGetCategory,
  vendorApprovalGetReasonLabel,
  vendorApprovalGetActionLabel,
};
