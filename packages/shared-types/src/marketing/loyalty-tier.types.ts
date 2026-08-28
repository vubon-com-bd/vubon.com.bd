/**
 * Loyalty Tier Types
 * Type definitions for loyalty tiers based on shared-constants
 * @module LoyaltyTierTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants loyalty
// ============================================================
import {
  // Loyalty Tier
  MARKETINGLOYALTY_TIER,
  MarketingLoyaltyTierLevel,
  MarketingLoyaltyTierType,
  MarketingLoyaltyTierRequirement,
  MarketingLoyaltyTierBenefit,
  MarketingLoyaltyTierStatus,
  MarketingLoyaltyTierColor,
  MarketingLoyaltyTierDefault,
  MarketingLoyaltyTierLimit,
  marketingloyaltyGetTierLevelLabel,
  marketingloyaltyGetTierTypeLabel,
  marketingloyaltyGetTierRequirementLabel,
  marketingloyaltyGetTierBenefitLabel,
  marketingloyaltyGetTierStatusLabel,
  marketingloyaltyGetTierColor,
  marketingloyaltyGetTierByPoints,
  marketingloyaltyIsTopTier,
  marketingloyaltyIsMidTier,
} from '@vubon/shared-constants';

// ============================================================
// Loyalty Tier Extended Types
// ============================================================

/**
 * Loyalty Tier
 */
export interface LoyaltyTier extends BaseEntity, Timestamp {
  id: ID;
  loyaltyId: ID;
  userId: ID;
  level: MarketingLoyaltyTierLevel;
  type: MarketingLoyaltyTierType;
  requirement: MarketingLoyaltyTierRequirement;
  benefit: MarketingLoyaltyTierBenefit;
  status: MarketingLoyaltyTierStatus;
  color: MarketingLoyaltyTierColor;
  pointsRequired: number;
  isTopTier: boolean;
  isMidTier: boolean;
  isActive: boolean;
  isDefault: boolean;
  startedAt: Date;
  endedAt?: Date;
  metadata?: Metadata;
}

/**
 * Loyalty Tier Filter
 */
export interface LoyaltyTierFilter {
  ids?: ID[];
  loyaltyIds?: ID[];
  userIds?: ID[];
  levels?: MarketingLoyaltyTierLevel[];
  types?: MarketingLoyaltyTierType[];
  requirements?: MarketingLoyaltyTierRequirement[];
  benefits?: MarketingLoyaltyTierBenefit[];
  statuses?: MarketingLoyaltyTierStatus[];
  colors?: MarketingLoyaltyTierColor[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isTopTier?: boolean;
  isMidTier?: boolean;
  isActive?: boolean;
  isDefault?: boolean;
  minPointsRequired?: number;
  maxPointsRequired?: number;
  searchTerm?: string;
}

/**
 * Loyalty Tier Statistics
 */
export interface LoyaltyTierStatistics {
  loyaltyId: ID;
  totalTiers: number;
  activeTiers: number;
  defaultTiers: number;
  byLevel: Record<MarketingLoyaltyTierLevel, number>;
  byType: Record<MarketingLoyaltyTierType, number>;
  byRequirement: Record<MarketingLoyaltyTierRequirement, number>;
  byBenefit: Record<MarketingLoyaltyTierBenefit, number>;
  byStatus: Record<MarketingLoyaltyTierStatus, number>;
  byColor: Record<MarketingLoyaltyTierColor, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  topTierCount: number;
  midTierCount: number;
  averagePointsRequired: number;
  maxPointsRequired: number;
  minPointsRequired: number;
  mostFrequentLevel: MarketingLoyaltyTierLevel;
  mostFrequentType: MarketingLoyaltyTierType;
  mostFrequentRequirement: MarketingLoyaltyTierRequirement;
  mostFrequentBenefit: MarketingLoyaltyTierBenefit;
}

/**
 * Loyalty Tier Summary
 */
export interface LoyaltyTierSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTiers: number;
  active: number;
  default: number;
  byLevel: Record<MarketingLoyaltyTierLevel, number>;
  byType: Record<MarketingLoyaltyTierType, number>;
  byRequirement: Record<MarketingLoyaltyTierRequirement, number>;
  byBenefit: Record<MarketingLoyaltyTierBenefit, number>;
  byStatus: Record<MarketingLoyaltyTierStatus, number>;
  byColor: Record<MarketingLoyaltyTierColor, number>;
  tierTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topLevels: {
    level: MarketingLoyaltyTierLevel;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: MarketingLoyaltyTierType;
    count: number;
    label: string;
  }[];
  topRequirements: {
    requirement: MarketingLoyaltyTierRequirement;
    count: number;
    label: string;
  }[];
  topBenefits: {
    benefit: MarketingLoyaltyTierBenefit;
    count: number;
    label: string;
  }[];
}

/**
 * Loyalty Tier Configuration
 */
export interface LoyaltyTierConfiguration {
  enabled: boolean;
  defaultLevel: MarketingLoyaltyTierLevel;
  defaultType: MarketingLoyaltyTierType;
  defaultRequirement: MarketingLoyaltyTierRequirement;
  defaultBenefit: MarketingLoyaltyTierBenefit;
  defaultStatus: MarketingLoyaltyTierStatus;
  defaultColor: MarketingLoyaltyTierColor;
  defaultPointsRequired: number;
  maxTiersPerLoyalty: number;
  allowMultipleTypes: boolean;
  allowMultipleRequirements: boolean;
  autoAssign: boolean;
  autoPromote: boolean;
  autoDemote: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  notificationOnPromotion: boolean;
  notificationOnDemotion: boolean;
  alertConfig?: LoyaltyTierAlertConfig;
}

/**
 * Loyalty Tier Alert Configuration
 */
export interface LoyaltyTierAlertConfig {
  enabled: boolean;
  promotionAlert: boolean;
  demotionAlert: boolean;
  pointsThresholdAlert: boolean;
  pointsThreshold: number;
  inactivityAlert: boolean;
  inactivityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Loyalty Tier History
 */
export interface LoyaltyTierHistory extends BaseEntity, Timestamp {
  id: ID;
  tierId: ID;
  loyaltyId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'set_default'
    | 'unset_default'
    | 'promote'
    | 'demote'
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
 * Loyalty Tier Validation
 */
export interface LoyaltyTierValidation {
  isValid: boolean;
  tierId: ID;
  loyaltyId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Loyalty Tier Export
 */
export interface LoyaltyTierExport extends BaseEntity, Timestamp {
  id: ID;
  loyaltyId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: LoyaltyTierFilter;
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
  // Loyalty Tier
  MARKETINGLOYALTY_TIER,
  MarketingLoyaltyTierLevel,
  MarketingLoyaltyTierType,
  MarketingLoyaltyTierRequirement,
  MarketingLoyaltyTierBenefit,
  MarketingLoyaltyTierStatus,
  MarketingLoyaltyTierColor,
  MarketingLoyaltyTierDefault,
  MarketingLoyaltyTierLimit,
  marketingloyaltyGetTierLevelLabel,
  marketingloyaltyGetTierTypeLabel,
  marketingloyaltyGetTierRequirementLabel,
  marketingloyaltyGetTierBenefitLabel,
  marketingloyaltyGetTierStatusLabel,
  marketingloyaltyGetTierColor,
  marketingloyaltyGetTierByPoints,
  marketingloyaltyIsTopTier,
  marketingloyaltyIsMidTier,
};
