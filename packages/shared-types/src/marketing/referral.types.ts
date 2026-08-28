/**
 * Referral Types
 * Type definitions for referrals based on shared-constants
 * @module ReferralTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants referral
// ============================================================
import {
  // Referral Core
  MARKETINGREFERRAL,
  MarketingReferralType,
  MarketingReferralSource,
  MarketingReferralProgram,
  MarketingReferralMethod,
  MarketingReferralStatus,
  MarketingReferralTier,
  MarketingReferralDefault,
  MarketingReferralLimit,
  marketingreferralGetTypeLabel,
  marketingreferralGetSourceLabel,
  marketingreferralGetProgramLabel,
  marketingreferralGetMethodLabel,
  marketingreferralGetTierLabel,
  marketingreferralGetDefaultExpiryDays,
  marketingreferralGetDefaultCookieDuration,
  marketingreferralIsCompleted,
  marketingreferralIsActive,
  marketingreferralIsValidReferral,
  // Referral Status
  MARKETINGREFERRAL_STATUS,
  MarketingReferralStatusType,
  MarketingReferralStatusColor,
  MarketingReferralStatusCategory,
  MarketingReferralStatusOrder,
  MarketingReferralStatusTransition,
  marketingreferralGetStatusColor,
  marketingreferralGetStatusCategory,
  marketingreferralIsCompletedStatus,
  marketingreferralIsInProgressStatus,
  marketingreferralIsFailedStatus,
  marketingreferralCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Referral Extended Types
// ============================================================

/**
 * Referral
 */
export interface Referral extends BaseEntity, Timestamp {
  id: ID;
  referrerId: ID;
  refereeId: ID;
  type: MarketingReferralType;
  source: MarketingReferralSource;
  program: MarketingReferralProgram;
  method: MarketingReferralMethod;
  status: MarketingReferralStatusType;
  tier: MarketingReferralTier;
  isCompleted: boolean;
  isActive: boolean;
  isValid: boolean;
  isInProgress: boolean;
  isFailed: boolean;
  completedAt?: Date;
  expiresAt: Date;
  cookieDuration: number;
  metadata?: Metadata;
}

/**
 * Referral Filter
 */
export interface ReferralFilter {
  ids?: ID[];
  referrerIds?: ID[];
  refereeIds?: ID[];
  types?: MarketingReferralType[];
  sources?: MarketingReferralSource[];
  programs?: MarketingReferralProgram[];
  methods?: MarketingReferralMethod[];
  statuses?: MarketingReferralStatusType[];
  tiers?: MarketingReferralTier[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  isActive?: boolean;
  isValid?: boolean;
  isInProgress?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
}

/**
 * Referral Statistics
 */
export interface ReferralStatistics {
  referrerId: ID;
  totalReferrals: number;
  completedReferrals: number;
  activeReferrals: number;
  validReferrals: number;
  inProgressReferrals: number;
  failedReferrals: number;
  byType: Record<MarketingReferralType, number>;
  bySource: Record<MarketingReferralSource, number>;
  byProgram: Record<MarketingReferralProgram, number>;
  byMethod: Record<MarketingReferralMethod, number>;
  byStatus: Record<MarketingReferralStatusType, number>;
  byTier: Record<MarketingReferralTier, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  conversionRate: number;
  averageCompletionTime: number;
  maxCompletionTime: number;
  minCompletionTime: number;
  mostFrequentType: MarketingReferralType;
  mostFrequentSource: MarketingReferralSource;
  mostFrequentProgram: MarketingReferralProgram;
  mostFrequentMethod: MarketingReferralMethod;
  mostFrequentStatus: MarketingReferralStatusType;
}

/**
 * Referral Summary
 */
export interface ReferralSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReferrals: number;
  completed: number;
  active: number;
  valid: number;
  inProgress: number;
  failed: number;
  byType: Record<MarketingReferralType, number>;
  bySource: Record<MarketingReferralSource, number>;
  byProgram: Record<MarketingReferralProgram, number>;
  byMethod: Record<MarketingReferralMethod, number>;
  byStatus: Record<MarketingReferralStatusType, number>;
  byTier: Record<MarketingReferralTier, number>;
  referralTrend: {
    date: Date;
    total: number;
    completed: number;
    inProgress: number;
  }[];
  topTypes: {
    type: MarketingReferralType;
    count: number;
    label: string;
  }[];
  topSources: {
    source: MarketingReferralSource;
    count: number;
    label: string;
  }[];
  topPrograms: {
    program: MarketingReferralProgram;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingReferralStatusType;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    conversionRate: number;
    averageCompletionTime: number;
    successRate: number;
    failureRate: number;
  };
}

/**
 * Referral Configuration
 */
export interface ReferralConfiguration {
  enabled: boolean;
  defaultType: MarketingReferralType;
  defaultSource: MarketingReferralSource;
  defaultProgram: MarketingReferralProgram;
  defaultMethod: MarketingReferralMethod;
  defaultStatus: MarketingReferralStatusType;
  defaultTier: MarketingReferralTier;
  defaultExpiryDays: number;
  defaultCookieDuration: number;
  maxReferralsPerUser: number;
  allowMultipleTypes: boolean;
  allowMultipleSources: boolean;
  requireApproval: boolean;
  requireVerification: boolean;
  autoComplete: boolean;
  notificationOnCreate: boolean;
  notificationOnComplete: boolean;
  notificationOnExpiry: boolean;
  notificationOnFailure: boolean;
  alertConfig?: ReferralAlertConfig;
}

/**
 * Referral Alert Configuration
 */
export interface ReferralAlertConfig {
  enabled: boolean;
  expiryAlert: boolean;
  expiryThreshold: number;
  failureAlert: boolean;
  fraudAlert: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Referral History
 */
export interface ReferralHistory extends BaseEntity, Timestamp {
  id: ID;
  referralId: ID;
  referrerId: ID;
  refereeId: ID;
  action:
    | 'create'
    | 'update'
    | 'complete'
    | 'expire'
    | 'fail'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Referral Validation
 */
export interface ReferralValidation {
  isValid: boolean;
  referralId: ID;
  referrerId: ID;
  refereeId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Referral Export
 */
export interface ReferralExport extends BaseEntity, Timestamp {
  id: ID;
  referrerId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ReferralFilter;
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
  // Referral Core
  MARKETINGREFERRAL,
  MarketingReferralType,
  MarketingReferralSource,
  MarketingReferralProgram,
  MarketingReferralMethod,
  MarketingReferralStatus,
  MarketingReferralTier,
  MarketingReferralDefault,
  MarketingReferralLimit,
  marketingreferralGetTypeLabel,
  marketingreferralGetSourceLabel,
  marketingreferralGetProgramLabel,
  marketingreferralGetMethodLabel,
  marketingreferralGetTierLabel,
  marketingreferralGetDefaultExpiryDays,
  marketingreferralGetDefaultCookieDuration,
  marketingreferralIsCompleted,
  marketingreferralIsActive,
  marketingreferralIsValidReferral,
  // Referral Status
  MARKETINGREFERRAL_STATUS,
  MarketingReferralStatusType,
  MarketingReferralStatusColor,
  MarketingReferralStatusCategory,
  MarketingReferralStatusOrder,
  MarketingReferralStatusTransition,
  marketingreferralGetStatusColor,
  marketingreferralGetStatusCategory,
  marketingreferralIsCompletedStatus,
  marketingreferralIsInProgressStatus,
  marketingreferralIsFailedStatus,
  marketingreferralCanTransition,
};
