/**
 * Promotion Types
 * Type definitions for marketing promotions based on shared-constants
 * @module PromotionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants marketing promotion
// ============================================================
import {
  // Promotion Core
  MARKETINGPROMOTION,
  MarketingPromotionType,
  MarketingPromotionScope,
  MarketingPromotionChannel,
  MarketingPromotionPriority,
  MarketingPromotionDuration,
  MarketingPromotionRedemptionLimit,
  MarketingPromotionDefault,
  MarketingPromotionLimit,
  marketingpromotionGetTypeLabel,
  marketingpromotionGetScopeLabel,
  marketingpromotionGetChannelLabel,
  marketingpromotionGetDurationLabel,
  marketingpromotionGetRedemptionLimitLabel,
  marketingpromotionGetPriorityLabel,
  marketingpromotionIsStackable,
  marketingpromotionIsLimited,
  marketingpromotionGetDefaultDuration,
  marketingpromotionGetDefaultPriority,
  marketingpromotionGetDefaultUsageLimit,
  // Promotion Type
  MARKETINGPROMOTION_TYPE,
  MarketingPromotionCategory,
  MarketingPromotionDiscountType,
  MarketingPromotionTrigger,
  MarketingPromotionFrequency,
  MarketingPromotionMechanic,
  marketingpromotionGetCategoryLabel,
  marketingpromotionGetDiscountTypeLabel,
  marketingpromotionGetTriggerLabel,
  marketingpromotionGetFrequencyLabel,
  marketingpromotionGetMechanicLabel,
  marketingpromotionIsPriceBased,
  marketingpromotionIsProductBased,
  // Promotion Status
  MARKETINGPROMOTION_STATUS,
  MarketingPromotionStatusType,
  MarketingPromotionStatusColor,
  MarketingPromotionStatusOrder,
  MarketingPromotionStatusTransition,
  marketingpromotionGetStatusLabel,
  marketingpromotionGetStatusColor,
  marketingpromotionGetStatusOrder,
  marketingpromotionIsActiveStatus,
  marketingpromotionIsPausedStatus,
  marketingpromotionIsEndedStatus,
  marketingpromotionIsEditableStatus,
  marketingpromotionCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Promotion Extended Types
// ============================================================

/**
 * Promotion
 */
export interface Promotion extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  type: MarketingPromotionType;
  scope: MarketingPromotionScope;
  channel: MarketingPromotionChannel;
  priority: MarketingPromotionPriority;
  status: MarketingPromotionStatusType;
  duration: MarketingPromotionDuration;
  redemptionLimit: MarketingPromotionRedemptionLimit;
  discountType: MarketingPromotionDiscountType;
  discountValue: number;
  maxDiscount?: number;
  minOrderValue?: number;
  isStackable: boolean;
  isLimited: boolean;
  isActive: boolean;
  isPaused: boolean;
  isEnded: boolean;
  isEditable: boolean;
  startDate: Date;
  endDate?: Date;
  usedCount: number;
  maxUsage: number;
  metadata?: Metadata;
}

/**
 * Promotion Filter
 */
export interface PromotionFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingPromotionType[];
  scopes?: MarketingPromotionScope[];
  channels?: MarketingPromotionChannel[];
  priorities?: MarketingPromotionPriority[];
  statuses?: MarketingPromotionStatusType[];
  categories?: MarketingPromotionCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPaused?: boolean;
  isEnded?: boolean;
  isEditable?: boolean;
  isStackable?: boolean;
  isLimited?: boolean;
  minDiscount?: number;
  maxDiscount?: number;
  searchTerm?: string;
}

/**
 * Promotion Statistics
 */
export interface PromotionStatistics {
  userId: ID;
  totalPromotions: number;
  activePromotions: number;
  pausedPromotions: number;
  endedPromotions: number;
  editablePromotions: number;
  byType: Record<MarketingPromotionType, number>;
  byScope: Record<MarketingPromotionScope, number>;
  byChannel: Record<MarketingPromotionChannel, number>;
  byPriority: Record<MarketingPromotionPriority, number>;
  byStatus: Record<MarketingPromotionStatusType, number>;
  byCategory: Record<MarketingPromotionCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalDiscount: number;
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
  totalUsage: number;
  averageUsage: number;
  maxUsage: number;
  minUsage: number;
  mostFrequentType: MarketingPromotionType;
  mostFrequentScope: MarketingPromotionScope;
  mostFrequentChannel: MarketingPromotionChannel;
  mostFrequentStatus: MarketingPromotionStatusType;
}

/**
 * Promotion Summary
 */
export interface PromotionSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  paused: number;
  ended: number;
  editable: number;
  byType: Record<MarketingPromotionType, number>;
  byScope: Record<MarketingPromotionScope, number>;
  byChannel: Record<MarketingPromotionChannel, number>;
  byPriority: Record<MarketingPromotionPriority, number>;
  byStatus: Record<MarketingPromotionStatusType, number>;
  byCategory: Record<MarketingPromotionCategory, number>;
  promotionTrend: {
    date: Date;
    total: number;
    active: number;
    ended: number;
  }[];
  topTypes: {
    type: MarketingPromotionType;
    count: number;
    label: string;
  }[];
  topScopes: {
    scope: MarketingPromotionScope;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: MarketingPromotionChannel;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingPromotionStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Promotion Configuration
 */
export interface PromotionConfiguration {
  enabled: boolean;
  defaultType: MarketingPromotionType;
  defaultScope: MarketingPromotionScope;
  defaultChannel: MarketingPromotionChannel;
  defaultPriority: MarketingPromotionPriority;
  defaultDuration: MarketingPromotionDuration;
  defaultRedemptionLimit: MarketingPromotionRedemptionLimit;
  defaultDiscountType: MarketingPromotionDiscountType;
  defaultDiscountValue: number;
  maxDiscount: number;
  minOrderValue: number;
  maxPromotionsPerUser: number;
  allowStacking: boolean;
  allowLimitedPromotions: boolean;
  requireApproval: boolean;
  autoEnd: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStart: boolean;
  notificationOnEnd: boolean;
  notificationOnDelete: boolean;
  alertConfig?: PromotionAlertConfig;
}

/**
 * Promotion Alert Configuration
 */
export interface PromotionAlertConfig {
  enabled: boolean;
  usageLimitAlert: boolean;
  usageThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  performanceAlert: boolean;
  performanceThreshold: number;
  pendingApprovalAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Promotion History
 */
export interface PromotionHistory extends BaseEntity, Timestamp {
  id: ID;
  promotionId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'start'
    | 'pause'
    | 'resume'
    | 'end'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'redeem';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Promotion Validation
 */
export interface PromotionValidation {
  isValid: boolean;
  promotionId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Promotion Export
 */
export interface PromotionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PromotionFilter;
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
  // Promotion Core
  MARKETINGPROMOTION,
  MarketingPromotionType,
  MarketingPromotionScope,
  MarketingPromotionChannel,
  MarketingPromotionPriority,
  MarketingPromotionDuration,
  MarketingPromotionRedemptionLimit,
  MarketingPromotionDefault,
  MarketingPromotionLimit,
  marketingpromotionGetTypeLabel,
  marketingpromotionGetScopeLabel,
  marketingpromotionGetChannelLabel,
  marketingpromotionGetDurationLabel,
  marketingpromotionGetRedemptionLimitLabel,
  marketingpromotionGetPriorityLabel,
  marketingpromotionIsStackable,
  marketingpromotionIsLimited,
  marketingpromotionGetDefaultDuration,
  marketingpromotionGetDefaultPriority,
  marketingpromotionGetDefaultUsageLimit,
  // Promotion Type
  MARKETINGPROMOTION_TYPE,
  MarketingPromotionCategory,
  MarketingPromotionDiscountType,
  MarketingPromotionTrigger,
  MarketingPromotionFrequency,
  MarketingPromotionMechanic,
  marketingpromotionGetCategoryLabel,
  marketingpromotionGetDiscountTypeLabel,
  marketingpromotionGetTriggerLabel,
  marketingpromotionGetFrequencyLabel,
  marketingpromotionGetMechanicLabel,
  marketingpromotionIsPriceBased,
  marketingpromotionIsProductBased,
  // Promotion Status
  MARKETINGPROMOTION_STATUS,
  MarketingPromotionStatusType,
  MarketingPromotionStatusColor,
  MarketingPromotionStatusOrder,
  MarketingPromotionStatusTransition,
  marketingpromotionGetStatusLabel,
  marketingpromotionGetStatusColor,
  marketingpromotionGetStatusOrder,
  marketingpromotionIsActiveStatus,
  marketingpromotionIsPausedStatus,
  marketingpromotionIsEndedStatus,
  marketingpromotionIsEditableStatus,
  marketingpromotionCanTransition,
};
