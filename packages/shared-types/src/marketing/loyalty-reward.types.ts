/**
 * Loyalty Reward Types
 * Type definitions for loyalty rewards based on shared-constants
 * @module LoyaltyRewardTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants loyalty
// ============================================================
import {
  // Loyalty Reward
  MARKETINGLOYALTY_REWARD,
  MarketingLoyaltyRewardType,
  MarketingLoyaltyRewardCategory,
  MarketingLoyaltyRewardStatus,
  MarketingLoyaltyRewardRedemptionMethod,
  MarketingLoyaltyRewardFrequency,
  MarketingLoyaltyRewardVisibility,
  MarketingLoyaltyRewardDefault,
  MarketingLoyaltyRewardLimit,
  marketingloyaltyGetRewardTypeLabel,
  marketingloyaltyGetRewardCategoryLabel,
  marketingloyaltyGetRewardStatusLabel,
  marketingloyaltyGetRewardRedemptionMethodLabel,
  marketingloyaltyGetRewardFrequencyLabel,
  marketingloyaltyGetRewardVisibilityLabel,
  marketingloyaltyGetDefaultPointsRequired,
  marketingloyaltyGetDefaultExpiryDays,
  marketingloyaltyIsDiscountReward,
  marketingloyaltyIsPhysicalReward,
  marketingloyaltyIsDigitalReward,
  marketingloyaltyCalculatePointsToRedeem,
} from '@vubon/shared-constants';

// ============================================================
// Loyalty Reward Extended Types
// ============================================================

/**
 * Loyalty Reward
 */
export interface LoyaltyReward extends BaseEntity, Timestamp {
  id: ID;
  loyaltyId: ID;
  userId: ID;
  name: string;
  description?: string;
  type: MarketingLoyaltyRewardType;
  category: MarketingLoyaltyRewardCategory;
  status: MarketingLoyaltyRewardStatus;
  redemptionMethod: MarketingLoyaltyRewardRedemptionMethod;
  frequency: MarketingLoyaltyRewardFrequency;
  visibility: MarketingLoyaltyRewardVisibility;
  pointsRequired: number;
  expiryDays: number;
  value: number;
  currency: string;
  isDiscount: boolean;
  isPhysical: boolean;
  isDigital: boolean;
  isActive: boolean;
  isAvailable: boolean;
  isLimited: boolean;
  totalQuantity: number;
  availableQuantity: number;
  redeemedQuantity: number;
  startsAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Loyalty Reward Filter
 */
export interface LoyaltyRewardFilter {
  ids?: ID[];
  loyaltyIds?: ID[];
  userIds?: ID[];
  types?: MarketingLoyaltyRewardType[];
  categories?: MarketingLoyaltyRewardCategory[];
  statuses?: MarketingLoyaltyRewardStatus[];
  redemptionMethods?: MarketingLoyaltyRewardRedemptionMethod[];
  frequencies?: MarketingLoyaltyRewardFrequency[];
  visibilities?: MarketingLoyaltyRewardVisibility[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isAvailable?: boolean;
  isLimited?: boolean;
  isDiscount?: boolean;
  isPhysical?: boolean;
  isDigital?: boolean;
  minPointsRequired?: number;
  maxPointsRequired?: number;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Loyalty Reward Statistics
 */
export interface LoyaltyRewardStatistics {
  loyaltyId: ID;
  totalRewards: number;
  activeRewards: number;
  availableRewards: number;
  limitedRewards: number;
  byType: Record<MarketingLoyaltyRewardType, number>;
  byCategory: Record<MarketingLoyaltyRewardCategory, number>;
  byStatus: Record<MarketingLoyaltyRewardStatus, number>;
  byRedemptionMethod: Record<MarketingLoyaltyRewardRedemptionMethod, number>;
  byFrequency: Record<MarketingLoyaltyRewardFrequency, number>;
  byVisibility: Record<MarketingLoyaltyRewardVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePointsRequired: number;
  maxPointsRequired: number;
  minPointsRequired: number;
  averageValue: number;
  maxValue: number;
  minValue: number;
  totalQuantity: number;
  availableQuantity: number;
  redeemedQuantity: number;
  redemptionRate: number;
  discountRewards: number;
  physicalRewards: number;
  digitalRewards: number;
  mostFrequentType: MarketingLoyaltyRewardType;
  mostFrequentCategory: MarketingLoyaltyRewardCategory;
  mostFrequentRedemptionMethod: MarketingLoyaltyRewardRedemptionMethod;
}

/**
 * Loyalty Reward Summary
 */
export interface LoyaltyRewardSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRewards: number;
  active: number;
  available: number;
  limited: number;
  byType: Record<MarketingLoyaltyRewardType, number>;
  byCategory: Record<MarketingLoyaltyRewardCategory, number>;
  byStatus: Record<MarketingLoyaltyRewardStatus, number>;
  byRedemptionMethod: Record<MarketingLoyaltyRewardRedemptionMethod, number>;
  byFrequency: Record<MarketingLoyaltyRewardFrequency, number>;
  byVisibility: Record<MarketingLoyaltyRewardVisibility, number>;
  rewardTrend: {
    date: Date;
    total: number;
    active: number;
    redeemed: number;
  }[];
  topTypes: {
    type: MarketingLoyaltyRewardType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: MarketingLoyaltyRewardCategory;
    count: number;
    label: string;
  }[];
  topRedemptionMethods: {
    method: MarketingLoyaltyRewardRedemptionMethod;
    count: number;
    label: string;
  }[];
  redemptionMetrics: {
    totalQuantity: number;
    availableQuantity: number;
    redeemedQuantity: number;
    redemptionRate: number;
  };
}

/**
 * Loyalty Reward Configuration
 */
export interface LoyaltyRewardConfiguration {
  enabled: boolean;
  defaultType: MarketingLoyaltyRewardType;
  defaultCategory: MarketingLoyaltyRewardCategory;
  defaultStatus: MarketingLoyaltyRewardStatus;
  defaultRedemptionMethod: MarketingLoyaltyRewardRedemptionMethod;
  defaultFrequency: MarketingLoyaltyRewardFrequency;
  defaultVisibility: MarketingLoyaltyRewardVisibility;
  defaultPointsRequired: number;
  defaultExpiryDays: number;
  maxRewardsPerLoyalty: number;
  maxRewardsPerUser: number;
  allowLimitedRewards: boolean;
  allowDiscountRewards: boolean;
  allowPhysicalRewards: boolean;
  allowDigitalRewards: boolean;
  requireApproval: boolean;
  autoActivate: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  notificationOnRedemption: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: LoyaltyRewardAlertConfig;
}

/**
 * Loyalty Reward Alert Configuration
 */
export interface LoyaltyRewardAlertConfig {
  enabled: boolean;
  lowStockAlert: boolean;
  lowStockThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  highRedemptionAlert: boolean;
  highRedemptionThreshold: number;
  popularityAlert: boolean;
  popularityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Loyalty Reward History
 */
export interface LoyaltyRewardHistory extends BaseEntity, Timestamp {
  id: ID;
  rewardId: ID;
  loyaltyId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'redeem'
    | 'expire'
    | 'restore'
    | 'delete'
    | 'stock_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Loyalty Reward Validation
 */
export interface LoyaltyRewardValidation {
  isValid: boolean;
  rewardId: ID;
  loyaltyId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Loyalty Reward Export
 */
export interface LoyaltyRewardExport extends BaseEntity, Timestamp {
  id: ID;
  loyaltyId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: LoyaltyRewardFilter;
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
  // Loyalty Reward
  MARKETINGLOYALTY_REWARD,
  MarketingLoyaltyRewardType,
  MarketingLoyaltyRewardCategory,
  MarketingLoyaltyRewardStatus,
  MarketingLoyaltyRewardRedemptionMethod,
  MarketingLoyaltyRewardFrequency,
  MarketingLoyaltyRewardVisibility,
  MarketingLoyaltyRewardDefault,
  MarketingLoyaltyRewardLimit,
  marketingloyaltyGetRewardTypeLabel,
  marketingloyaltyGetRewardCategoryLabel,
  marketingloyaltyGetRewardStatusLabel,
  marketingloyaltyGetRewardRedemptionMethodLabel,
  marketingloyaltyGetRewardFrequencyLabel,
  marketingloyaltyGetRewardVisibilityLabel,
  marketingloyaltyGetDefaultPointsRequired,
  marketingloyaltyGetDefaultExpiryDays,
  marketingloyaltyIsDiscountReward,
  marketingloyaltyIsPhysicalReward,
  marketingloyaltyIsDigitalReward,
  marketingloyaltyCalculatePointsToRedeem,
};
