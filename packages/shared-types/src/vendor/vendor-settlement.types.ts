/**
 * Vendor Settlement Types
 * Type definitions for vendor settlements based on shared-constants
 * @module VendorSettlementTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Currency } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor settlement
// ============================================================
import {
  // Vendor Settlement
  VENDOR_SETTLEMENT,
  VendorSettlementType,
  VendorSettlementStatus,
  VendorSettlementMethod,
  VendorSettlementFrequency,
  VendorSettlementPeriod,
  vendorSettlementGetTypeLabel,
  vendorSettlementGetStatusLabel,
  vendorSettlementGetMethodLabel,
  vendorSettlementGetFrequencyLabel,
  vendorSettlementIsCompleted,
  vendorSettlementIsPending,
  vendorSettlementIsFailed,
  vendorSettlementGetPeriodLabel,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Settlement Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor settlement filter
 */
export interface VendorSettlementFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorSettlementType[];
  statuses?: VendorSettlementStatus[];
  methods?: VendorSettlementMethod[];
  frequencies?: VendorSettlementFrequency[];
  periods?: VendorSettlementPeriod[];
  currencies?: Currency[];
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
 * Vendor settlement statistics
 */
export interface VendorSettlementStatistics {
  vendorId: ID;
  totalSettlements: number;
  completedSettlements: number;
  pendingSettlements: number;
  failedSettlements: number;
  byType: Record<VendorSettlementType, number>;
  byStatus: Record<VendorSettlementStatus, number>;
  byMethod: Record<VendorSettlementMethod, number>;
  byFrequency: Record<VendorSettlementFrequency, number>;
  byPeriod: Record<VendorSettlementPeriod, number>;
  byCurrency: Record<Currency, number>;
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
  mostFrequentType: VendorSettlementType;
  mostFrequentStatus: VendorSettlementStatus;
  mostFrequentMethod: VendorSettlementMethod;
  mostFrequentFrequency: VendorSettlementFrequency;
  mostFrequentPeriod: VendorSettlementPeriod;
  mostFrequentCurrency: Currency;
}

/**
 * Vendor settlement summary
 */
export interface VendorSettlementSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettlements: number;
  completed: number;
  pending: number;
  failed: number;
  byType: Record<VendorSettlementType, number>;
  byStatus: Record<VendorSettlementStatus, number>;
  byMethod: Record<VendorSettlementMethod, number>;
  byFrequency: Record<VendorSettlementFrequency, number>;
  byPeriod: Record<VendorSettlementPeriod, number>;
  byCurrency: Record<Currency, number>;
  settlementTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: VendorSettlementType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorSettlementStatus;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: VendorSettlementMethod;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: VendorSettlementFrequency;
    count: number;
    label: string;
  }[];
  topPeriods: {
    period: VendorSettlementPeriod;
    count: number;
    label: string;
  }[];
  topCurrencies: {
    currency: Currency;
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
 * Vendor settlement configuration
 */
export interface VendorSettlementConfiguration {
  enabled: boolean;
  defaultType: VendorSettlementType;
  defaultMethod: VendorSettlementMethod;
  defaultFrequency: VendorSettlementFrequency;
  defaultPeriod: VendorSettlementPeriod;
  defaultCurrency: Currency;
  minSettlementAmount: number;
  maxSettlementAmount: number;
  maxPerDay: number;
  maxPerWeek: number;
  autoProcess: boolean;
  requireApproval: boolean;
  approvalThreshold: number;
  processingTimeHours: number;
  allowPartialSettlement: boolean;
  allowScheduledSettlement: boolean;
  notificationOnRequest: boolean;
  notificationOnProcessing: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  alertConfig?: VendorSettlementAlertConfig;
}

/**
 * Vendor settlement alert configuration
 */
export interface VendorSettlementAlertConfig {
  enabled: boolean;
  highAmountAlert: boolean;
  highAmountThreshold: number;
  failureAlert: boolean;
  delayAlert: boolean;
  delayThresholdHours: number;
  frequencyChangeAlert: boolean;
  dailyLimitAlert: boolean;
  weeklyLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor settlement history
 */
export interface VendorSettlementHistory extends BaseEntity, Timestamp {
  id: ID;
  settlementId: ID;
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
 * Vendor settlement validation
 */
export interface VendorSettlementValidation {
  isValid: boolean;
  settlementId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor settlement export
 */
export interface VendorSettlementExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorSettlementFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (শুধুমাত্র নতুন টাইপ)
// ============================================================

export {
  // Vendor Settlement
  VENDOR_SETTLEMENT,
  VendorSettlementType,
  VendorSettlementStatus,
  VendorSettlementMethod,
  VendorSettlementFrequency,
  VendorSettlementPeriod,
  vendorSettlementGetTypeLabel,
  vendorSettlementGetStatusLabel,
  vendorSettlementGetMethodLabel,
  vendorSettlementGetFrequencyLabel,
  vendorSettlementIsCompleted,
  vendorSettlementIsPending,
  vendorSettlementIsFailed,
  vendorSettlementGetPeriodLabel,
};
