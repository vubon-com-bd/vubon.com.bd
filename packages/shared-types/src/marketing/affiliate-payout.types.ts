/**
 * Affiliate Payout Types
 * Type definitions for affiliate payouts based on shared-constants
 * @module AffiliatePayoutTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants affiliate
// ============================================================
import {
  // Affiliate Payout
  MARKETINGAFFILIATE_PAYOUT,
  MarketingAffiliatePayoutMethod,
  MarketingAffiliatePayoutFrequency,
  MarketingAffiliatePayoutCurrency,
  MarketingAffiliatePayoutType,
  MarketingAffiliatePayoutThreshold,
  MarketingAffiliatePayoutFee,
  MarketingAffiliatePayoutLimit,
  MarketingAffiliatePayoutDefault,
  marketingaffiliateGetPayoutMethodLabel,
  marketingaffiliateGetPayoutFrequencyLabel,
  marketingaffiliateGetPayoutCurrencySymbol,
  marketingaffiliateGetPayoutTypeLabel,
  marketingaffiliateGetPayoutFee,
  marketingaffiliateIsPayoutComplete,
  marketingaffiliateIsPayoutPending,
  marketingaffiliateIsPayoutFailed,
  marketingaffiliateGetDefaultPayoutMethod,
  marketingaffiliateGetMinimumPayout,
  marketingaffiliateCalculatePayoutAfterFee,
  // Affiliate Payout Status
  MARKETINGAFFILIATE_PAYOUT_STATUS,
  MarketingAffiliatePayoutStatusColor,
  MarketingAffiliatePayoutStatusCategory,
  MarketingAffiliatePayoutStatusOrder,
  MarketingAffiliatePayoutStatusTransition,
  marketingaffiliateGetPayoutStatusColor,
  marketingaffiliateGetPayoutStatusCategory,
  marketingaffiliateIsPayoutCompleted,
  marketingaffiliateIsPayoutInProgress,
  marketingaffiliateCanTransitionPayout,
} from '@vubon/shared-constants';

// ============================================================
// Affiliate Payout Extended Types
// ============================================================

/**
 * Affiliate Payout
 */
export interface AffiliatePayout extends BaseEntity, Timestamp {
  id: ID;
  affiliateId: ID;
  method: MarketingAffiliatePayoutMethod;
  frequency: MarketingAffiliatePayoutFrequency;
  currency: MarketingAffiliatePayoutCurrency;
  type: MarketingAffiliatePayoutType;
  amount: number;
  fee: number;
  netAmount: number;
  status: string;
  isComplete: boolean;
  isPending: boolean;
  isFailed: boolean;
  isInProgress: boolean;
  requestedAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * Affiliate Payout Filter
 */
export interface AffiliatePayoutFilter {
  ids?: ID[];
  affiliateIds?: ID[];
  methods?: MarketingAffiliatePayoutMethod[];
  frequencies?: MarketingAffiliatePayoutFrequency[];
  currencies?: MarketingAffiliatePayoutCurrency[];
  types?: MarketingAffiliatePayoutType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isPending?: boolean;
  isFailed?: boolean;
  isInProgress?: boolean;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
}

/**
 * Affiliate Payout Statistics
 */
export interface AffiliatePayoutStatistics {
  affiliateId: ID;
  totalPayouts: number;
  completedPayouts: number;
  pendingPayouts: number;
  failedPayouts: number;
  inProgressPayouts: number;
  byMethod: Record<MarketingAffiliatePayoutMethod, number>;
  byFrequency: Record<MarketingAffiliatePayoutFrequency, number>;
  byCurrency: Record<MarketingAffiliatePayoutCurrency, number>;
  byType: Record<MarketingAffiliatePayoutType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  totalFee: number;
  averageFee: number;
  maxFee: number;
  minFee: number;
  totalNetAmount: number;
  averageNetAmount: number;
  maxNetAmount: number;
  minNetAmount: number;
  mostFrequentMethod: MarketingAffiliatePayoutMethod;
  mostFrequentFrequency: MarketingAffiliatePayoutFrequency;
  mostFrequentCurrency: MarketingAffiliatePayoutCurrency;
}

/**
 * Affiliate Payout Summary
 */
export interface AffiliatePayoutSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPayouts: number;
  completed: number;
  pending: number;
  failed: number;
  inProgress: number;
  byMethod: Record<MarketingAffiliatePayoutMethod, number>;
  byFrequency: Record<MarketingAffiliatePayoutFrequency, number>;
  byCurrency: Record<MarketingAffiliatePayoutCurrency, number>;
  byType: Record<MarketingAffiliatePayoutType, number>;
  payoutTrend: {
    date: Date;
    total: number;
    completed: number;
    pending: number;
  }[];
  topMethods: {
    method: MarketingAffiliatePayoutMethod;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: MarketingAffiliatePayoutFrequency;
    count: number;
    label: string;
  }[];
  topCurrencies: {
    currency: MarketingAffiliatePayoutCurrency;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
    totalFee: number;
    averageFee: number;
    maxFee: number;
    minFee: number;
    totalNetAmount: number;
    averageNetAmount: number;
    maxNetAmount: number;
    minNetAmount: number;
  };
}

/**
 * Affiliate Payout Configuration
 */
export interface AffiliatePayoutConfiguration {
  enabled: boolean;
  defaultMethod: MarketingAffiliatePayoutMethod;
  defaultFrequency: MarketingAffiliatePayoutFrequency;
  defaultCurrency: MarketingAffiliatePayoutCurrency;
  defaultType: MarketingAffiliatePayoutType;
  minimumPayout: number;
  maximumPayout: number;
  feeRate: number;
  feeType: 'fixed' | 'percentage';
  allowMultipleMethods: boolean;
  allowMultipleCurrencies: boolean;
  autoProcess: boolean;
  processDelayHours: number;
  notificationOnRequest: boolean;
  notificationOnProcess: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AffiliatePayoutAlertConfig;
}

/**
 * Affiliate Payout Alert Configuration
 */
export interface AffiliatePayoutAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  pendingAlert: boolean;
  pendingThreshold: number;
  fraudAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Affiliate Payout History
 */
export interface AffiliatePayoutHistory extends BaseEntity, Timestamp {
  id: ID;
  payoutId: ID;
  affiliateId: ID;
  action: 'request' | 'process' | 'complete' | 'fail' | 'cancel' | 'retry';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Affiliate Payout Validation
 */
export interface AffiliatePayoutValidation {
  isValid: boolean;
  payoutId: ID;
  affiliateId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Affiliate Payout Export
 */
export interface AffiliatePayoutExport extends BaseEntity, Timestamp {
  id: ID;
  affiliateId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AffiliatePayoutFilter;
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
  // Affiliate Payout
  MARKETINGAFFILIATE_PAYOUT,
  MarketingAffiliatePayoutMethod,
  MarketingAffiliatePayoutFrequency,
  MarketingAffiliatePayoutCurrency,
  MarketingAffiliatePayoutType,
  MarketingAffiliatePayoutThreshold,
  MarketingAffiliatePayoutFee,
  MarketingAffiliatePayoutLimit,
  MarketingAffiliatePayoutDefault,
  marketingaffiliateGetPayoutMethodLabel,
  marketingaffiliateGetPayoutFrequencyLabel,
  marketingaffiliateGetPayoutCurrencySymbol,
  marketingaffiliateGetPayoutTypeLabel,
  marketingaffiliateGetPayoutFee,
  marketingaffiliateIsPayoutComplete,
  marketingaffiliateIsPayoutPending,
  marketingaffiliateIsPayoutFailed,
  marketingaffiliateGetDefaultPayoutMethod,
  marketingaffiliateGetMinimumPayout,
  marketingaffiliateCalculatePayoutAfterFee,
  // Affiliate Payout Status
  MARKETINGAFFILIATE_PAYOUT_STATUS,
  MarketingAffiliatePayoutStatusColor,
  MarketingAffiliatePayoutStatusCategory,
  MarketingAffiliatePayoutStatusOrder,
  MarketingAffiliatePayoutStatusTransition,
  marketingaffiliateGetPayoutStatusColor,
  marketingaffiliateGetPayoutStatusCategory,
  marketingaffiliateIsPayoutCompleted,
  marketingaffiliateIsPayoutInProgress,
  marketingaffiliateCanTransitionPayout,
};
