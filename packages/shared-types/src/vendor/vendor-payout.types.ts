/**
 * Vendor Payout Types
 * Type definitions for vendor payouts based on shared-constants
 * @module VendorPayoutTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor payout
// ============================================================
import {
  // Vendor Payout
  VENDOR_PAYOUT,
  VendorPayoutType,
  VendorPayoutStatus,
  VendorPayoutMethod,
  VendorPayoutFrequency,
  VendorPayoutCurrency,
  VendorPayoutColor,
  VendorPayoutIcon,
  vendorPayoutGetTypeLabel,
  vendorPayoutGetStatusLabel,
  vendorPayoutGetMethodLabel,
  vendorPayoutGetFrequencyLabel,
  vendorPayoutGetCurrencyLabel,
  vendorPayoutIsCompleted,
  vendorPayoutIsPending,
  vendorPayoutIsFailed,
  vendorPayoutGetColor,
  // Vendor Payout Status
  VENDOR_PAYOUT_STATUS,
  VendorPayoutStatusType,
  VendorPayoutStatusCategory,
  VendorPayoutStatusColor,
  VendorPayoutStatusIcon,
  VendorPayoutStatusTransition,
  vendorPayoutStatusGetLabel,
  vendorPayoutStatusIsCompleted,
  vendorPayoutStatusIsPending,
  vendorPayoutStatusIsFailed,
  vendorPayoutStatusGetCategory,
  vendorPayoutStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Payout Extended Types
// ============================================================

/**
 * Vendor payout
 */
export interface VendorPayout extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorPayoutType;
  status: VendorPayoutStatusType;
  method: VendorPayoutMethod;
  frequency: VendorPayoutFrequency;
  currency: VendorPayoutCurrency;
  amount: number;
  fee: number;
  netAmount: number;
  reference?: string;
  description?: string;
  isCompleted: boolean;
  isPending: boolean;
  isFailed: boolean;
  requestedAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * Vendor payout filter
 */
export interface VendorPayoutFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorPayoutType[];
  statuses?: VendorPayoutStatusType[];
  methods?: VendorPayoutMethod[];
  frequencies?: VendorPayoutFrequency[];
  currencies?: VendorPayoutCurrency[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  isCompleted?: boolean;
  isPending?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
  reference?: string;
}

/**
 * Vendor payout statistics
 */
export interface VendorPayoutStatistics {
  vendorId: ID;
  totalPayouts: number;
  completedPayouts: number;
  pendingPayouts: number;
  failedPayouts: number;
  byType: Record<VendorPayoutType, number>;
  byStatus: Record<VendorPayoutStatusType, number>;
  byMethod: Record<VendorPayoutMethod, number>;
  byFrequency: Record<VendorPayoutFrequency, number>;
  byCurrency: Record<VendorPayoutCurrency, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  totalFee: number;
  totalNetAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  averageFee: number;
  maxFee: number;
  minFee: number;
  mostFrequentType: VendorPayoutType;
  mostFrequentStatus: VendorPayoutStatusType;
  mostFrequentMethod: VendorPayoutMethod;
  mostFrequentFrequency: VendorPayoutFrequency;
  mostFrequentCurrency: VendorPayoutCurrency;
}

/**
 * Vendor payout summary
 */
export interface VendorPayoutSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPayouts: number;
  completed: number;
  pending: number;
  failed: number;
  byType: Record<VendorPayoutType, number>;
  byStatus: Record<VendorPayoutStatusType, number>;
  byMethod: Record<VendorPayoutMethod, number>;
  byFrequency: Record<VendorPayoutFrequency, number>;
  byCurrency: Record<VendorPayoutCurrency, number>;
  payoutTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: VendorPayoutType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorPayoutStatusType;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: VendorPayoutMethod;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: VendorPayoutFrequency;
    count: number;
    label: string;
  }[];
  topCurrencies: {
    currency: VendorPayoutCurrency;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalAmount: number;
    totalFee: number;
    totalNetAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
  };
}

/**
 * Vendor payout configuration
 */
export interface VendorPayoutConfiguration {
  enabled: boolean;
  defaultType: VendorPayoutType;
  defaultMethod: VendorPayoutMethod;
  defaultFrequency: VendorPayoutFrequency;
  defaultCurrency: VendorPayoutCurrency;
  minPayoutAmount: number;
  maxPayoutAmount: number;
  autoProcess: boolean;
  requireApproval: boolean;
  approvalThreshold: number;
  processingTimeHours: number;
  allowPartialPayout: boolean;
  allowScheduledPayout: boolean;
  notificationOnRequest: boolean;
  notificationOnProcessing: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  alertConfig?: VendorPayoutAlertConfig;
}

/**
 * Vendor payout alert configuration
 */
export interface VendorPayoutAlertConfig {
  enabled: boolean;
  highAmountAlert: boolean;
  highAmountThreshold: number;
  failureAlert: boolean;
  delayAlert: boolean;
  delayThresholdHours: number;
  frequencyChangeAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor payout history
 */
export interface VendorPayoutHistory extends BaseEntity, Timestamp {
  id: ID;
  payoutId: ID;
  vendorId: ID;
  userId: ID;
  action: 'request' | 'process' | 'complete' | 'fail' | 'cancel' | 'update' | 'approve' | 'reject';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor payout validation
 */
export interface VendorPayoutValidation {
  isValid: boolean;
  payoutId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor payout export
 */
export interface VendorPayoutExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorPayoutFilter;
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
  // Vendor Payout
  VENDOR_PAYOUT,
  VendorPayoutType,
  VendorPayoutStatus,
  VendorPayoutMethod,
  VendorPayoutFrequency,
  VendorPayoutCurrency,
  VendorPayoutColor,
  VendorPayoutIcon,
  vendorPayoutGetTypeLabel,
  vendorPayoutGetStatusLabel,
  vendorPayoutGetMethodLabel,
  vendorPayoutGetFrequencyLabel,
  vendorPayoutGetCurrencyLabel,
  vendorPayoutIsCompleted,
  vendorPayoutIsPending,
  vendorPayoutIsFailed,
  vendorPayoutGetColor,
  // Vendor Payout Status
  VENDOR_PAYOUT_STATUS,
  VendorPayoutStatusType,
  VendorPayoutStatusCategory,
  VendorPayoutStatusColor,
  VendorPayoutStatusIcon,
  VendorPayoutStatusTransition,
  vendorPayoutStatusGetLabel,
  vendorPayoutStatusIsCompleted,
  vendorPayoutStatusIsPending,
  vendorPayoutStatusIsFailed,
  vendorPayoutStatusGetCategory,
  vendorPayoutStatusCanTransition,
};
