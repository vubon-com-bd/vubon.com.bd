/**
 * Vendor Suspension Types
 * Type definitions for vendor suspension based on shared-constants
 * @module VendorSuspensionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Vendor Suspension
  VENDOR_SUSPENSION,
  VendorSuspensionType,
  VendorSuspensionCategory,
  VendorSuspensionColor,
  VendorSuspensionIcon,
  VendorSuspensionReason,
  vendorSuspensionGetLabel,
  vendorSuspensionIsActive,
  vendorSuspensionIsPending,
  vendorSuspensionIsPermanent,
  vendorSuspensionGetCategory,
  vendorSuspensionGetReasonLabel,
  vendorSuspensionGetDuration,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Suspension Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor suspension filter
 */
export interface VendorSuspensionFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorSuspensionType[];
  categories?: VendorSuspensionCategory[];
  reasons?: VendorSuspensionReason[];
  statuses?: ('active' | 'pending' | 'expired' | 'reversed' | 'cancelled')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPending?: boolean;
  isPermanent?: boolean;
  isTemporary?: boolean;
  searchTerm?: string;
  reversedBy?: ID;
}

/**
 * Vendor suspension statistics
 */
export interface VendorSuspensionStatistics {
  vendorId: ID;
  totalSuspensions: number;
  activeSuspensions: number;
  pendingSuspensions: number;
  expiredSuspensions: number;
  reversedSuspensions: number;
  cancelledSuspensions: number;
  permanentSuspensions: number;
  temporarySuspensions: number;
  byType: Record<VendorSuspensionType, number>;
  byCategory: Record<VendorSuspensionCategory, number>;
  byReason: Record<VendorSuspensionReason, number>;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDurationDays: number;
  maxDurationDays: number;
  minDurationDays: number;
  mostFrequentType: VendorSuspensionType;
  mostFrequentCategory: VendorSuspensionCategory;
  mostFrequentReason: VendorSuspensionReason;
  mostFrequentStatus: string;
}

/**
 * Vendor suspension summary
 */
export interface VendorSuspensionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSuspensions: number;
  active: number;
  pending: number;
  expired: number;
  reversed: number;
  cancelled: number;
  permanent: number;
  temporary: number;
  byType: Record<VendorSuspensionType, number>;
  byCategory: Record<VendorSuspensionCategory, number>;
  byReason: Record<VendorSuspensionReason, number>;
  byStatus: Record<string, number>;
  suspensionTrend: {
    date: Date;
    total: number;
    active: number;
    reversed: number;
  }[];
  topTypes: {
    type: VendorSuspensionType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorSuspensionCategory;
    count: number;
    label: string;
  }[];
  topReasons: {
    reason: VendorSuspensionReason;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
}

/**
 * Vendor suspension configuration
 */
export interface VendorSuspensionConfiguration {
  enabled: boolean;
  requireReason: boolean;
  requireNotes: boolean;
  requireApproval: boolean;
  defaultDurationDays: number;
  maxDurationDays: number;
  minDurationDays: number;
  allowPermanentSuspension: boolean;
  allowTemporarySuspension: boolean;
  allowReversal: boolean;
  reversalRequiresApproval: boolean;
  notificationOnSuspend: boolean;
  notificationOnPending: boolean;
  notificationOnReversal: boolean;
  notificationOnExpiry: boolean;
  notificationOnCancellation: boolean;
  alertConfig?: VendorSuspensionAlertConfig;
}

/**
 * Vendor suspension alert configuration
 */
export interface VendorSuspensionAlertConfig {
  enabled: boolean;
  pendingAlert: boolean;
  pendingThresholdDays: number;
  expiryAlert: boolean;
  expiryThresholdDays: number;
  reversalAlert: boolean;
  multipleSuspensionAlert: boolean;
  multipleSuspensionThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor suspension history
 */
export interface VendorSuspensionHistory extends BaseEntity, Timestamp {
  id: ID;
  suspensionId: ID;
  vendorId: ID;
  userId: ID;
  action: 'suspend' | 'pending' | 'reverse' | 'expire' | 'cancel' | 'update' | 'extend';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor suspension validation
 */
export interface VendorSuspensionValidation {
  isValid: boolean;
  suspensionId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor suspension export
 */
export interface VendorSuspensionExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorSuspensionFilter;
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
  // Vendor Suspension
  VENDOR_SUSPENSION,
  VendorSuspensionType,
  VendorSuspensionCategory,
  VendorSuspensionColor,
  VendorSuspensionIcon,
  VendorSuspensionReason,
  vendorSuspensionGetLabel,
  vendorSuspensionIsActive,
  vendorSuspensionIsPending,
  vendorSuspensionIsPermanent,
  vendorSuspensionGetCategory,
  vendorSuspensionGetReasonLabel,
  vendorSuspensionGetDuration,
};
