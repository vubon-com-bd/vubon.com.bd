/**
 * Deal Types
 * Type definitions for flash sale deals based on shared-constants
 * @module DealTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales deal
// ============================================================
import {
  // Deal Core
  DEAL,
  DealType,
  DealCategory,
  DealChannel,
  flashsalesDealGetTypeLabel,
  flashsalesDealGetCategoryLabel,
  flashsalesDealGetChannelLabel,
  flashsalesDealIsValidType,
  flashsalesDealIsValidCategory,
  flashsalesDealGetDefaultMaxUses,
  flashsalesDealGetDefaultMaxUsesPerUser,
  flashsalesDealGetMaxDiscountPercentage,
  flashsalesDealGetMaxFixedAmount,
  // Deal Type
  DEAL_TYPE,
  DealTypeCategory,
  DealTypeComplexity,
  DealTypeScope,
  DealTypeFrequency,
  DealTypeTrigger,
  DealTypeDuration,
  flashsalesDealTypeGetCategoryLabel,
  flashsalesDealTypeGetComplexityLabel,
  flashsalesDealTypeGetScopeLabel,
  flashsalesDealTypeGetFrequencyLabel,
  flashsalesDealTypeGetTriggerLabel,
  flashsalesDealTypeGetDurationLabel,
  flashsalesDealTypeGetDurationHours,
  flashsalesDealTypeIsValidCategory,
  flashsalesDealTypeIsValidScope,
  // Deal Status
  DEAL_STATUS,
  DealStatusType,
  DealStatusCategory,
  DealStatusColor,
  DealStatusPriority,
  flashsalesDealStatusGetLabel,
  flashsalesDealStatusGetCategory,
  flashsalesDealStatusGetColor,
  flashsalesDealStatusGetPriority,
  flashsalesDealStatusIsActive,
  flashsalesDealStatusIsScheduled,
  flashsalesDealStatusIsComplete,
  flashsalesDealStatusCanTransitionTo,
  flashsalesDealStatusGetAvailableTransitions,
  flashsalesDealStatusIsValid,
  // Deal Priority
  DEAL_PRIORITY,
  DealPriorityLevel,
  DealPriorityScore,
  DealPriorityColor,
  DealPrioritySLATarget,
  DealPriorityResourceAllocation,
  DealPriorityWeight,
  flashsalesDealPriorityGetLevelLabel,
  flashsalesDealPriorityGetScore,
  flashsalesDealPriorityGetColor,
  flashsalesDealPriorityGetSLATarget,
  flashsalesDealPriorityGetResourceAllocation,
  flashsalesDealPriorityGetWeight,
  flashsalesDealPriorityIsUrgent,
  flashsalesDealPriorityIsHigh,
  flashsalesDealPriorityIsLow,
  flashsalesDealPriorityIsValid,
  flashsalesDealPriorityGetPriorityFromScore,
  // Deal Discount Type
  DEAL_DISCOUNT_TYPE,
  DealDiscountTypeType,
  DealDiscountCalculation,
  DealDiscountApplication,
  DealDiscountTierType,
  flashsalesDealDiscountTypeGetTypeLabel,
  flashsalesDealDiscountTypeGetCalculationLabel,
  flashsalesDealDiscountTypeGetApplicationLabel,
  flashsalesDealDiscountTypeGetTierTypeLabel,
  flashsalesDealDiscountTypeIsValidType,
  flashsalesDealDiscountTypeIsValidApplication,
  // Deal Restriction
  DEAL_RESTRICTION,
  DealRestrictionType,
  DealRestrictionCondition,
  DealRestrictionOperator,
  DealRestrictionValidation,
  flashsalesDealRestrictionGetTypeLabel,
  flashsalesDealRestrictionGetConditionLabel,
  flashsalesDealRestrictionGetOperatorLabel,
  flashsalesDealRestrictionGetValidationLabel,
  flashsalesDealRestrictionIsValidType,
  flashsalesDealRestrictionIsValidOperator,
  // Deal Target
  DEAL_TARGET,
  DealTargetType,
  DealTargetSegment,
  DealTargetCriteria,
  DealTargetPriority,
  flashsalesDealTargetGetTypeLabel,
  flashsalesDealTargetGetSegmentLabel,
  flashsalesDealTargetGetCriteriaLabel,
  flashsalesDealTargetGetPriorityLabel,
  flashsalesDealTargetIsValidType,
  flashsalesDealTargetIsValidSegment,
  flashsalesDealTargetIsHighValue,
  flashsalesDealTargetIsNewCustomer,
} from '@vubon/shared-constants';

// ============================================================
// Deal Extended Types
// ============================================================

/**
 * Deal Discount
 */
export interface DealDiscount {
  type: DealDiscountTypeType;
  calculation: DealDiscountCalculation;
  application: DealDiscountApplication;
  tierType?: DealDiscountTierType;
  value: number;
  maxValue?: number;
  minValue?: number;
  tiers?: DealDiscountTier[];
  metadata?: Metadata;
}

/**
 * Deal Discount Tier
 */
export interface DealDiscountTier {
  minQuantity: number;
  maxQuantity?: number;
  value: number;
  metadata?: Metadata;
}

/**
 * Deal Restriction
 */
export interface DealRestriction {
  type: DealRestrictionType;
  condition: DealRestrictionCondition;
  operator: DealRestrictionOperator;
  value: unknown;
  validation: DealRestrictionValidation;
  metadata?: Metadata;
}

/**
 * Deal Target
 */
export interface DealTarget {
  type: DealTargetType;
  segment: DealTargetSegment;
  criteria: DealTargetCriteria;
  priority: DealTargetPriority;
  isHighValue: boolean;
  isNewCustomer: boolean;
  metadata?: Metadata;
}

/**
 * Deal
 */
export interface Deal extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  name: string;
  description?: string;
  type: DealType;
  category: DealCategory;
  channel: DealChannel;
  status: DealStatusType;
  priority: DealPriorityLevel;
  discount: DealDiscount;
  restrictions: DealRestriction[];
  targets: DealTarget[];
  maxUses: number;
  usedCount: number;
  maxUsesPerUser: number;
  usedPerUser: Record<ID, number>;
  isActive: boolean;
  isScheduled: boolean;
  isComplete: boolean;
  isUrgent: boolean;
  isHigh: boolean;
  isLow: boolean;
  isValid: boolean;
  startsAt: Date;
  expiresAt: Date;
  metadata?: Metadata;
}

/**
 * Deal Filter
 */
export interface DealFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  types?: DealType[];
  categories?: DealCategory[];
  channels?: DealChannel[];
  statuses?: DealStatusType[];
  priorities?: DealPriorityLevel[];
  discountTypes?: DealDiscountTypeType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isScheduled?: boolean;
  isComplete?: boolean;
  isUrgent?: boolean;
  isHigh?: boolean;
  isLow?: boolean;
  minDiscountValue?: number;
  maxDiscountValue?: number;
  searchTerm?: string;
}

/**
 * Deal Statistics
 */
export interface DealStatistics {
  flashSaleId: ID;
  totalDeals: number;
  activeDeals: number;
  scheduledDeals: number;
  completeDeals: number;
  urgentDeals: number;
  highPriorityDeals: number;
  lowPriorityDeals: number;
  byType: Record<DealType, number>;
  byCategory: Record<DealCategory, number>;
  byChannel: Record<DealChannel, number>;
  byStatus: Record<DealStatusType, number>;
  byPriority: Record<DealPriorityLevel, number>;
  byDiscountType: Record<DealDiscountTypeType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalUses: number;
  averageUses: number;
  maxUses: number;
  minUses: number;
  averageDiscountValue: number;
  maxDiscountValue: number;
  minDiscountValue: number;
  mostFrequentType: DealType;
  mostFrequentCategory: DealCategory;
  mostFrequentStatus: DealStatusType;
  mostFrequentPriority: DealPriorityLevel;
}

/**
 * Deal Summary
 */
export interface DealSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDeals: number;
  active: number;
  scheduled: number;
  complete: number;
  urgent: number;
  high: number;
  low: number;
  byType: Record<DealType, number>;
  byCategory: Record<DealCategory, number>;
  byChannel: Record<DealChannel, number>;
  byStatus: Record<DealStatusType, number>;
  byPriority: Record<DealPriorityLevel, number>;
  byDiscountType: Record<DealDiscountTypeType, number>;
  dealTrend: {
    date: Date;
    total: number;
    active: number;
    complete: number;
  }[];
  topTypes: {
    type: DealType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: DealCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: DealStatusType;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: DealPriorityLevel;
    count: number;
    label: string;
  }[];
  usageMetrics: {
    totalUses: number;
    averageUses: number;
    maxUses: number;
    minUses: number;
  };
  discountMetrics: {
    averageDiscountValue: number;
    maxDiscountValue: number;
    minDiscountValue: number;
  };
}

/**
 * Deal Configuration
 */
export interface DealConfiguration {
  enabled: boolean;
  defaultType: DealType;
  defaultCategory: DealCategory;
  defaultChannel: DealChannel;
  defaultStatus: DealStatusType;
  defaultPriority: DealPriorityLevel;
  defaultMaxUses: number;
  defaultMaxUsesPerUser: number;
  maxDiscountPercentage: number;
  maxFixedAmount: number;
  requireApproval: boolean;
  allowMultipleDiscounts: boolean;
  allowStacking: boolean;
  autoActivate: boolean;
  notificationOnCreate: boolean;
  notificationOnActivate: boolean;
  notificationOnComplete: boolean;
  notificationOnExpire: boolean;
  notificationOnUsage: boolean;
  alertConfig?: DealAlertConfig;
}

/**
 * Deal Alert Configuration
 */
export interface DealAlertConfig {
  enabled: boolean;
  highUsageAlert: boolean;
  highUsageThreshold: number;
  lowUsageAlert: boolean;
  lowUsageThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  highDiscountAlert: boolean;
  highDiscountThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Deal History
 */
export interface DealHistory extends BaseEntity, Timestamp {
  id: ID;
  dealId: ID;
  flashSaleId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'pause'
    | 'resume'
    | 'complete'
    | 'expire'
    | 'delete'
    | 'restore'
    | 'use';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Deal Validation
 */
export interface DealValidation {
  isValid: boolean;
  dealId: ID;
  flashSaleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Deal Export
 */
export interface DealExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DealFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Deal Usage
 */
export interface DealUsage extends BaseEntity, Timestamp {
  id: ID;
  dealId: ID;
  flashSaleId: ID;
  userId: ID;
  orderId: ID;
  discountAmount: number;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Deal Core
  DEAL,
  DealType,
  DealCategory,
  DealChannel,
  flashsalesDealGetTypeLabel,
  flashsalesDealGetCategoryLabel,
  flashsalesDealGetChannelLabel,
  flashsalesDealIsValidType,
  flashsalesDealIsValidCategory,
  flashsalesDealGetDefaultMaxUses,
  flashsalesDealGetDefaultMaxUsesPerUser,
  flashsalesDealGetMaxDiscountPercentage,
  flashsalesDealGetMaxFixedAmount,
  // Deal Type
  DEAL_TYPE,
  DealTypeCategory,
  DealTypeComplexity,
  DealTypeScope,
  DealTypeFrequency,
  DealTypeTrigger,
  DealTypeDuration,
  flashsalesDealTypeGetCategoryLabel,
  flashsalesDealTypeGetComplexityLabel,
  flashsalesDealTypeGetScopeLabel,
  flashsalesDealTypeGetFrequencyLabel,
  flashsalesDealTypeGetTriggerLabel,
  flashsalesDealTypeGetDurationLabel,
  flashsalesDealTypeGetDurationHours,
  flashsalesDealTypeIsValidCategory,
  flashsalesDealTypeIsValidScope,
  // Deal Status
  DEAL_STATUS,
  DealStatusType,
  DealStatusCategory,
  DealStatusColor,
  DealStatusPriority,
  flashsalesDealStatusGetLabel,
  flashsalesDealStatusGetCategory,
  flashsalesDealStatusGetColor,
  flashsalesDealStatusGetPriority,
  flashsalesDealStatusIsActive,
  flashsalesDealStatusIsScheduled,
  flashsalesDealStatusIsComplete,
  flashsalesDealStatusCanTransitionTo,
  flashsalesDealStatusGetAvailableTransitions,
  flashsalesDealStatusIsValid,
  // Deal Priority
  DEAL_PRIORITY,
  DealPriorityLevel,
  DealPriorityScore,
  DealPriorityColor,
  DealPrioritySLATarget,
  DealPriorityResourceAllocation,
  DealPriorityWeight,
  flashsalesDealPriorityGetLevelLabel,
  flashsalesDealPriorityGetScore,
  flashsalesDealPriorityGetColor,
  flashsalesDealPriorityGetSLATarget,
  flashsalesDealPriorityGetResourceAllocation,
  flashsalesDealPriorityGetWeight,
  flashsalesDealPriorityIsUrgent,
  flashsalesDealPriorityIsHigh,
  flashsalesDealPriorityIsLow,
  flashsalesDealPriorityIsValid,
  flashsalesDealPriorityGetPriorityFromScore,
  // Deal Discount Type
  DEAL_DISCOUNT_TYPE,
  DealDiscountTypeType,
  DealDiscountCalculation,
  DealDiscountApplication,
  DealDiscountTierType,
  flashsalesDealDiscountTypeGetTypeLabel,
  flashsalesDealDiscountTypeGetCalculationLabel,
  flashsalesDealDiscountTypeGetApplicationLabel,
  flashsalesDealDiscountTypeGetTierTypeLabel,
  flashsalesDealDiscountTypeIsValidType,
  flashsalesDealDiscountTypeIsValidApplication,
  // Deal Restriction
  DEAL_RESTRICTION,
  DealRestrictionType,
  DealRestrictionCondition,
  DealRestrictionOperator,
  DealRestrictionValidation,
  flashsalesDealRestrictionGetTypeLabel,
  flashsalesDealRestrictionGetConditionLabel,
  flashsalesDealRestrictionGetOperatorLabel,
  flashsalesDealRestrictionGetValidationLabel,
  flashsalesDealRestrictionIsValidType,
  flashsalesDealRestrictionIsValidOperator,
  // Deal Target
  DEAL_TARGET,
  DealTargetType,
  DealTargetSegment,
  DealTargetCriteria,
  DealTargetPriority,
  flashsalesDealTargetGetTypeLabel,
  flashsalesDealTargetGetSegmentLabel,
  flashsalesDealTargetGetCriteriaLabel,
  flashsalesDealTargetGetPriorityLabel,
  flashsalesDealTargetIsValidType,
  flashsalesDealTargetIsValidSegment,
  flashsalesDealTargetIsHighValue,
  flashsalesDealTargetIsNewCustomer,
};
