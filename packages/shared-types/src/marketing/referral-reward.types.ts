/**
 * Referral Reward Types
 * Type definitions for referral rewards based on shared-constants
 * @module ReferralRewardTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants referral
// ============================================================
import {
  // Referral Reward
  MARKETINGREFERRAL_REWARD,
  MarketingReferralRewardType,
  MarketingReferralRewardStructure,
  MarketingReferralRewardTrigger,
  MarketingReferralRewardLevel,
  MarketingReferralRewardRedemption,
  MarketingReferralRewardEligibility,
  MarketingReferralRewardStatus,
  MarketingReferralRewardDefault,
  MarketingReferralRewardLimit,
  marketingreferralGetRewardTypeLabel,
  marketingreferralGetRewardStructureLabel,
  marketingreferralGetRewardTriggerLabel,
  marketingreferralGetRewardLevelLabel,
  marketingreferralGetRewardRedemptionLabel,
  marketingreferralGetRewardEligibilityLabel,
  marketingreferralGetRewardStatusLabel,
  marketingreferralGetDefaultPercentage,
  marketingreferralGetDefaultPoints,
  marketingreferralIsCashReward,
  marketingreferralIsDiscountReward,
  marketingreferralIsPointsReward,
  marketingreferralCalculateReward,
} from '@vubon/shared-constants';

// ============================================================
// Referral Reward Extended Types
// ============================================================

/**
 * Referral Reward
 */
export interface ReferralReward extends BaseEntity, Timestamp {
  id: ID;
  referralId: ID;
  referrerId: ID;
  refereeId: ID;
  type: MarketingReferralRewardType;
  structure: MarketingReferralRewardStructure;
  trigger: MarketingReferralRewardTrigger;
  level: MarketingReferralRewardLevel;
  redemption: MarketingReferralRewardRedemption;
  eligibility: MarketingReferralRewardEligibility;
  status: MarketingReferralRewardStatus;
  value: number;
  currency: string;
  isCash: boolean;
  isDiscount: boolean;
  isPoints: boolean;
  isRedeemed: boolean;
  isExpired: boolean;
  isCancelled: boolean;
  earnedAt: Date;
  redeemedAt?: Date;
  expiresAt?: Date;
  cancelledAt?: Date;
  metadata?: Metadata;
}

/**
 * Referral Reward Filter
 */
export interface ReferralRewardFilter {
  ids?: ID[];
  referralIds?: ID[];
  referrerIds?: ID[];
  refereeIds?: ID[];
  types?: MarketingReferralRewardType[];
  structures?: MarketingReferralRewardStructure[];
  triggers?: MarketingReferralRewardTrigger[];
  levels?: MarketingReferralRewardLevel[];
  redemptions?: MarketingReferralRewardRedemption[];
  eligibilities?: MarketingReferralRewardEligibility[];
  statuses?: MarketingReferralRewardStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCash?: boolean;
  isDiscount?: boolean;
  isPoints?: boolean;
  isRedeemed?: boolean;
  isExpired?: boolean;
  isCancelled?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Referral Reward Statistics
 */
export interface ReferralRewardStatistics {
  referrerId: ID;
  totalRewards: number;
  earnedRewards: number;
  redeemedRewards: number;
  expiredRewards: number;
  cancelledRewards: number;
  byType: Record<MarketingReferralRewardType, number>;
  byStructure: Record<MarketingReferralRewardStructure, number>;
  byTrigger: Record<MarketingReferralRewardTrigger, number>;
  byLevel: Record<MarketingReferralRewardLevel, number>;
  byRedemption: Record<MarketingReferralRewardRedemption, number>;
  byEligibility: Record<MarketingReferralRewardEligibility, number>;
  byStatus: Record<MarketingReferralRewardStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalValue: number;
  averageValue: number;
  maxValue: number;
  minValue: number;
  totalEarnedValue: number;
  totalRedeemedValue: number;
  totalExpiredValue: number;
  totalCancelledValue: number;
  cashRewards: number;
  discountRewards: number;
  pointsRewards: number;
  mostFrequentType: MarketingReferralRewardType;
  mostFrequentStructure: MarketingReferralRewardStructure;
  mostFrequentTrigger: MarketingReferralRewardTrigger;
  mostFrequentLevel: MarketingReferralRewardLevel;
}

/**
 * Referral Reward Summary
 */
export interface ReferralRewardSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRewards: number;
  earned: number;
  redeemed: number;
  expired: number;
  cancelled: number;
  byType: Record<MarketingReferralRewardType, number>;
  byStructure: Record<MarketingReferralRewardStructure, number>;
  byTrigger: Record<MarketingReferralRewardTrigger, number>;
  byLevel: Record<MarketingReferralRewardLevel, number>;
  byRedemption: Record<MarketingReferralRewardRedemption, number>;
  byEligibility: Record<MarketingReferralRewardEligibility, number>;
  byStatus: Record<MarketingReferralRewardStatus, number>;
  rewardTrend: {
    date: Date;
    total: number;
    earned: number;
    redeemed: number;
  }[];
  topTypes: {
    type: MarketingReferralRewardType;
    count: number;
    label: string;
  }[];
  topStructures: {
    structure: MarketingReferralRewardStructure;
    count: number;
    label: string;
  }[];
  topTriggers: {
    trigger: MarketingReferralRewardTrigger;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: MarketingReferralRewardLevel;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalValue: number;
    averageValue: number;
    maxValue: number;
    minValue: number;
    totalEarnedValue: number;
    totalRedeemedValue: number;
    totalExpiredValue: number;
    totalCancelledValue: number;
    cashValue: number;
    discountValue: number;
    pointsValue: number;
  };
}

/**
 * Referral Reward Configuration
 */
export interface ReferralRewardConfiguration {
  enabled: boolean;
  defaultType: MarketingReferralRewardType;
  defaultStructure: MarketingReferralRewardStructure;
  defaultTrigger: MarketingReferralRewardTrigger;
  defaultLevel: MarketingReferralRewardLevel;
  defaultRedemption: MarketingReferralRewardRedemption;
  defaultEligibility: MarketingReferralRewardEligibility;
  defaultStatus: MarketingReferralRewardStatus;
  defaultPercentage: number;
  defaultPoints: number;
  defaultValue: number;
  minRewardValue: number;
  maxRewardValue: number;
  maxRewardsPerReferral: number;
  maxRewardsPerUser: number;
  allowCashRewards: boolean;
  allowDiscountRewards: boolean;
  allowPointsRewards: boolean;
  requireRedemption: boolean;
  autoRedeem: boolean;
  redemptionWindowDays: number;
  notificationOnEarn: boolean;
  notificationOnRedeem: boolean;
  notificationOnExpire: boolean;
  notificationOnCancel: boolean;
  alertConfig?: ReferralRewardAlertConfig;
}

/**
 * Referral Reward Alert Configuration
 */
export interface ReferralRewardAlertConfig {
  enabled: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  redemptionAlert: boolean;
  redemptionThreshold: number;
  fraudAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Referral Reward History
 */
export interface ReferralRewardHistory extends BaseEntity, Timestamp {
  id: ID;
  rewardId: ID;
  referralId: ID;
  referrerId: ID;
  refereeId: ID;
  action: 'earn' | 'redeem' | 'expire' | 'cancel' | 'restore' | 'adjust';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Referral Reward Validation
 */
export interface ReferralRewardValidation {
  isValid: boolean;
  rewardId: ID;
  referralId: ID;
  referrerId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Referral Reward Export
 */
export interface ReferralRewardExport extends BaseEntity, Timestamp {
  id: ID;
  referrerId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ReferralRewardFilter;
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
  // Referral Reward
  MARKETINGREFERRAL_REWARD,
  MarketingReferralRewardType,
  MarketingReferralRewardStructure,
  MarketingReferralRewardTrigger,
  MarketingReferralRewardLevel,
  MarketingReferralRewardRedemption,
  MarketingReferralRewardEligibility,
  MarketingReferralRewardStatus,
  MarketingReferralRewardDefault,
  MarketingReferralRewardLimit,
  marketingreferralGetRewardTypeLabel,
  marketingreferralGetRewardStructureLabel,
  marketingreferralGetRewardTriggerLabel,
  marketingreferralGetRewardLevelLabel,
  marketingreferralGetRewardRedemptionLabel,
  marketingreferralGetRewardEligibilityLabel,
  marketingreferralGetRewardStatusLabel,
  marketingreferralGetDefaultPercentage,
  marketingreferralGetDefaultPoints,
  marketingreferralIsCashReward,
  marketingreferralIsDiscountReward,
  marketingreferralIsPointsReward,
  marketingreferralCalculateReward,
};
