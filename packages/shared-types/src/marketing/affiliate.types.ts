/**
 * Affiliate Types
 * Type definitions for affiliates based on shared-constants
 * @module AffiliateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants affiliate
// ============================================================
import {
  // Affiliate Core
  MARKETINGAFFILIATE,
  MarketingAffiliateType,
  MarketingAffiliateLevel,
  MarketingAffiliateTier,
  MarketingAffiliateSource,
  MarketingAffiliateVertical,
  MarketingAffiliateMetric,
  MarketingAffiliateDefault,
  MarketingAffiliateLimit,
  marketingaffiliateGetTypeLabel,
  marketingaffiliateGetLevelLabel,
  marketingaffiliateGetTierLabel,
  marketingaffiliateGetSourceLabel,
  marketingaffiliateGetVerticalLabel,
  marketingaffiliateGetMetricLabel,
  marketingaffiliateGetDefaultCookieDuration,
  marketingaffiliateIsTopTier,
  marketingaffiliateIsBusinessType,
  marketingaffiliateIsIndividualType,
  // Affiliate Status
  MARKETINGAFFILIATE_STATUS,
  MarketingAffiliateStatusType,
  MarketingAffiliateStatusColor,
  MarketingAffiliateStatusCategory,
  MarketingAffiliateStatusOrder,
  MarketingAffiliateStatusTransition,
  marketingaffiliateGetStatusLabel,
  marketingaffiliateGetStatusColor,
  marketingaffiliateGetStatusCategory,
  marketingaffiliateIsActiveStatus,
  marketingaffiliateIsSuspendedStatus,
  marketingaffiliateIsTerminatedStatus,
  marketingaffiliateIsFraudStatus,
  marketingaffiliateCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Affiliate Extended Types
// ============================================================

/**
 * Affiliate
 */
export interface Affiliate extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: MarketingAffiliateType;
  level: MarketingAffiliateLevel;
  tier: MarketingAffiliateTier;
  source: MarketingAffiliateSource;
  vertical: MarketingAffiliateVertical;
  status: MarketingAffiliateStatusType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  cookieDuration: number;
  isTopTier: boolean;
  isBusiness: boolean;
  isIndividual: boolean;
  isActive: boolean;
  isSuspended: boolean;
  isTerminated: boolean;
  isFraud: boolean;
  joinedAt: Date;
  terminatedAt?: Date;
  metadata?: Metadata;
}

/**
 * Affiliate Filter
 */
export interface AffiliateFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingAffiliateType[];
  levels?: MarketingAffiliateLevel[];
  tiers?: MarketingAffiliateTier[];
  sources?: MarketingAffiliateSource[];
  verticals?: MarketingAffiliateVertical[];
  statuses?: MarketingAffiliateStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isTopTier?: boolean;
  isBusiness?: boolean;
  isIndividual?: boolean;
  isActive?: boolean;
  isSuspended?: boolean;
  isTerminated?: boolean;
  isFraud?: boolean;
  searchTerm?: string;
}

/**
 * Affiliate Statistics
 */
export interface AffiliateStatistics {
  userId: ID;
  totalAffiliates: number;
  activeAffiliates: number;
  suspendedAffiliates: number;
  terminatedAffiliates: number;
  fraudAffiliates: number;
  byType: Record<MarketingAffiliateType, number>;
  byLevel: Record<MarketingAffiliateLevel, number>;
  byTier: Record<MarketingAffiliateTier, number>;
  bySource: Record<MarketingAffiliateSource, number>;
  byVertical: Record<MarketingAffiliateVertical, number>;
  byStatus: Record<MarketingAffiliateStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  topTierCount: number;
  businessCount: number;
  individualCount: number;
  mostFrequentType: MarketingAffiliateType;
  mostFrequentLevel: MarketingAffiliateLevel;
  mostFrequentTier: MarketingAffiliateTier;
  mostFrequentSource: MarketingAffiliateSource;
  mostFrequentVertical: MarketingAffiliateVertical;
  mostFrequentStatus: MarketingAffiliateStatusType;
}

/**
 * Affiliate Summary
 */
export interface AffiliateSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  suspended: number;
  terminated: number;
  fraud: number;
  byType: Record<MarketingAffiliateType, number>;
  byLevel: Record<MarketingAffiliateLevel, number>;
  byTier: Record<MarketingAffiliateTier, number>;
  bySource: Record<MarketingAffiliateSource, number>;
  byVertical: Record<MarketingAffiliateVertical, number>;
  byStatus: Record<MarketingAffiliateStatusType, number>;
  affiliateTrend: {
    date: Date;
    total: number;
    active: number;
    terminated: number;
  }[];
  topTypes: {
    type: MarketingAffiliateType;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: MarketingAffiliateLevel;
    count: number;
    label: string;
  }[];
  topTiers: {
    tier: MarketingAffiliateTier;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingAffiliateStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Affiliate Configuration
 */
export interface AffiliateConfiguration {
  enabled: boolean;
  defaultType: MarketingAffiliateType;
  defaultLevel: MarketingAffiliateLevel;
  defaultTier: MarketingAffiliateTier;
  defaultSource: MarketingAffiliateSource;
  defaultStatus: MarketingAffiliateStatusType;
  defaultCookieDuration: number;
  maxAffiliatesPerUser: number;
  requireApproval: boolean;
  requireVerification: boolean;
  allowMultipleTypes: boolean;
  allowMultipleVerticals: boolean;
  autoSuspendFraud: boolean;
  fraudDetectionEnabled: boolean;
  notificationOnJoin: boolean;
  notificationOnStatusChange: boolean;
  notificationOnFraud: boolean;
  notificationOnDelete: boolean;
  alertConfig?: AffiliateAlertConfig;
}

/**
 * Affiliate Alert Configuration
 */
export interface AffiliateAlertConfig {
  enabled: boolean;
  fraudAlert: boolean;
  fraudThreshold: number;
  inactivityAlert: boolean;
  inactivityThreshold: number;
  pendingApprovalAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Affiliate History
 */
export interface AffiliateHistory extends BaseEntity, Timestamp {
  id: ID;
  affiliateId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'suspend'
    | 'terminate'
    | 'restore'
    | 'fraud_detected'
    | 'fraud_cleared'
    | 'delete'
    | 'tier_change'
    | 'level_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Affiliate Validation
 */
export interface AffiliateValidation {
  isValid: boolean;
  affiliateId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Affiliate Export
 */
export interface AffiliateExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AffiliateFilter;
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
  // Affiliate Core
  MARKETINGAFFILIATE,
  MarketingAffiliateType,
  MarketingAffiliateLevel,
  MarketingAffiliateTier,
  MarketingAffiliateSource,
  MarketingAffiliateVertical,
  MarketingAffiliateMetric,
  MarketingAffiliateDefault,
  MarketingAffiliateLimit,
  marketingaffiliateGetTypeLabel,
  marketingaffiliateGetLevelLabel,
  marketingaffiliateGetTierLabel,
  marketingaffiliateGetSourceLabel,
  marketingaffiliateGetVerticalLabel,
  marketingaffiliateGetMetricLabel,
  marketingaffiliateGetDefaultCookieDuration,
  marketingaffiliateIsTopTier,
  marketingaffiliateIsBusinessType,
  marketingaffiliateIsIndividualType,
  // Affiliate Status
  MARKETINGAFFILIATE_STATUS,
  MarketingAffiliateStatusType,
  MarketingAffiliateStatusColor,
  MarketingAffiliateStatusCategory,
  MarketingAffiliateStatusOrder,
  MarketingAffiliateStatusTransition,
  marketingaffiliateGetStatusLabel,
  marketingaffiliateGetStatusColor,
  marketingaffiliateGetStatusCategory,
  marketingaffiliateIsActiveStatus,
  marketingaffiliateIsSuspendedStatus,
  marketingaffiliateIsTerminatedStatus,
  marketingaffiliateIsFraudStatus,
  marketingaffiliateCanTransition,
};
