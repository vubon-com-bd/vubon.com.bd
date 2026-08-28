/**
 * Affiliate Commission Types
 * Type definitions for affiliate commissions based on shared-constants
 * @module AffiliateCommissionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants affiliate
// ============================================================
import {
  // Affiliate Commission
  MARKETINGAFFILIATE_COMMISSION,
  MarketingAffiliateCommissionType,
  MarketingAffiliateCommissionStructure,
  MarketingAffiliateCommissionCalculation,
  MarketingAffiliateCommissionRate,
  MarketingAffiliateCommissionTracking,
  MarketingAffiliateAttributionWindow,
  MarketingAffiliateCommissionDefault,
  MarketingAffiliateCommissionLimit,
  marketingaffiliateGetCommissionTypeLabel,
  marketingaffiliateGetCommissionStructureLabel,
  marketingaffiliateGetCommissionCalculationLabel,
  marketingaffiliateGetCommissionTrackingLabel,
  marketingaffiliateGetAttributionWindowLabel,
  marketingaffiliateIsPercentageCommission,
  marketingaffiliateIsFixedCommission,
  marketingaffiliateIsTieredCommission,
  marketingaffiliateIsRecurringCommission,
  marketingaffiliateGetDefaultAttributionDays,
  marketingaffiliateGetDefaultMinimumEarnings,
  marketingaffiliateCalculateCommission,
} from '@vubon/shared-constants';

// ============================================================
// Affiliate Commission Extended Types
// ============================================================

/**
 * Affiliate Commission
 */
export interface AffiliateCommission extends BaseEntity, Timestamp {
  id: ID;
  affiliateId: ID;
  referralId: ID;
  type: MarketingAffiliateCommissionType;
  structure: MarketingAffiliateCommissionStructure;
  calculation: MarketingAffiliateCommissionCalculation;
  tracking: MarketingAffiliateCommissionTracking;
  attributionWindow: MarketingAffiliateAttributionWindow;
  rate: MarketingAffiliateCommissionRate;
  amount: number;
  currency: string;
  isPercentage: boolean;
  isFixed: boolean;
  isTiered: boolean;
  isRecurring: boolean;
  isPaid: boolean;
  isPending: boolean;
  isCancelled: boolean;
  earnedAt: Date;
  paidAt?: Date;
  cancelledAt?: Date;
  metadata?: Metadata;
}

/**
 * Affiliate Commission Filter
 */
export interface AffiliateCommissionFilter {
  ids?: ID[];
  affiliateIds?: ID[];
  referralIds?: ID[];
  types?: MarketingAffiliateCommissionType[];
  structures?: MarketingAffiliateCommissionStructure[];
  calculations?: MarketingAffiliateCommissionCalculation[];
  trackings?: MarketingAffiliateCommissionTracking[];
  attributionWindows?: MarketingAffiliateAttributionWindow[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPercentage?: boolean;
  isFixed?: boolean;
  isTiered?: boolean;
  isRecurring?: boolean;
  isPaid?: boolean;
  isPending?: boolean;
  isCancelled?: boolean;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
}

/**
 * Affiliate Commission Statistics
 */
export interface AffiliateCommissionStatistics {
  affiliateId: ID;
  totalCommissions: number;
  paidCommissions: number;
  pendingCommissions: number;
  cancelledCommissions: number;
  byType: Record<MarketingAffiliateCommissionType, number>;
  byStructure: Record<MarketingAffiliateCommissionStructure, number>;
  byCalculation: Record<MarketingAffiliateCommissionCalculation, number>;
  byTracking: Record<MarketingAffiliateCommissionTracking, number>;
  byAttributionWindow: Record<MarketingAffiliateAttributionWindow, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  totalPaidAmount: number;
  totalPendingAmount: number;
  totalCancelledAmount: number;
  mostFrequentType: MarketingAffiliateCommissionType;
  mostFrequentStructure: MarketingAffiliateCommissionStructure;
  mostFrequentCalculation: MarketingAffiliateCommissionCalculation;
}

/**
 * Affiliate Commission Summary
 */
export interface AffiliateCommissionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalCommissions: number;
  paid: number;
  pending: number;
  cancelled: number;
  byType: Record<MarketingAffiliateCommissionType, number>;
  byStructure: Record<MarketingAffiliateCommissionStructure, number>;
  byCalculation: Record<MarketingAffiliateCommissionCalculation, number>;
  byTracking: Record<MarketingAffiliateCommissionTracking, number>;
  byAttributionWindow: Record<MarketingAffiliateAttributionWindow, number>;
  commissionTrend: {
    date: Date;
    total: number;
    paid: number;
    pending: number;
  }[];
  topTypes: {
    type: MarketingAffiliateCommissionType;
    count: number;
    label: string;
  }[];
  topStructures: {
    structure: MarketingAffiliateCommissionStructure;
    count: number;
    label: string;
  }[];
  topCalculations: {
    calculation: MarketingAffiliateCommissionCalculation;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
    totalPaidAmount: number;
    totalPendingAmount: number;
    totalCancelledAmount: number;
  };
}

/**
 * Affiliate Commission Configuration
 */
export interface AffiliateCommissionConfiguration {
  enabled: boolean;
  defaultType: MarketingAffiliateCommissionType;
  defaultStructure: MarketingAffiliateCommissionStructure;
  defaultCalculation: MarketingAffiliateCommissionCalculation;
  defaultTracking: MarketingAffiliateCommissionTracking;
  defaultAttributionWindow: MarketingAffiliateAttributionWindow;
  defaultRate: MarketingAffiliateCommissionRate;
  defaultMinimumEarnings: number;
  defaultAttributionDays: number;
  maxCommissionsPerAffiliate: number;
  allowPercentageCommissions: boolean;
  allowFixedCommissions: boolean;
  allowTieredCommissions: boolean;
  allowRecurringCommissions: boolean;
  autoPay: boolean;
  payThreshold: number;
  notificationOnEarn: boolean;
  notificationOnPay: boolean;
  notificationOnCancel: boolean;
  alertConfig?: AffiliateCommissionAlertConfig;
}

/**
 * Affiliate Commission Alert Configuration
 */
export interface AffiliateCommissionAlertConfig {
  enabled: boolean;
  highCommissionAlert: boolean;
  highCommissionThreshold: number;
  lowCommissionAlert: boolean;
  lowCommissionThreshold: number;
  pendingAlert: boolean;
  pendingThreshold: number;
  fraudAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Affiliate Commission History
 */
export interface AffiliateCommissionHistory extends BaseEntity, Timestamp {
  id: ID;
  commissionId: ID;
  affiliateId: ID;
  referralId: ID;
  action: 'create' | 'update' | 'pay' | 'cancel' | 'refund' | 'adjust';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Affiliate Commission Validation
 */
export interface AffiliateCommissionValidation {
  isValid: boolean;
  commissionId: ID;
  affiliateId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Affiliate Commission Export
 */
export interface AffiliateCommissionExport extends BaseEntity, Timestamp {
  id: ID;
  affiliateId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AffiliateCommissionFilter;
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
  // Affiliate Commission
  MARKETINGAFFILIATE_COMMISSION,
  MarketingAffiliateCommissionType,
  MarketingAffiliateCommissionStructure,
  MarketingAffiliateCommissionCalculation,
  MarketingAffiliateCommissionRate,
  MarketingAffiliateCommissionTracking,
  MarketingAffiliateAttributionWindow,
  MarketingAffiliateCommissionDefault,
  MarketingAffiliateCommissionLimit,
  marketingaffiliateGetCommissionTypeLabel,
  marketingaffiliateGetCommissionStructureLabel,
  marketingaffiliateGetCommissionCalculationLabel,
  marketingaffiliateGetCommissionTrackingLabel,
  marketingaffiliateGetAttributionWindowLabel,
  marketingaffiliateIsPercentageCommission,
  marketingaffiliateIsFixedCommission,
  marketingaffiliateIsTieredCommission,
  marketingaffiliateIsRecurringCommission,
  marketingaffiliateGetDefaultAttributionDays,
  marketingaffiliateGetDefaultMinimumEarnings,
  marketingaffiliateCalculateCommission,
};
