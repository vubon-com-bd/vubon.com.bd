/**
 * Promotion Restriction Types
 * Type definitions for promotion restrictions based on shared-constants
 * @module PromotionRestrictionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants marketing promotion
// ============================================================
import {
  // Promotion Restriction
  MARKETINGPROMOTION_RESTRICTION,
  MarketingPromotionRestrictionType,
  MarketingPromotionRestrictionOperator,
  MarketingPromotionRestrictionCondition,
  MarketingPromotionRestrictionPriority,
  MarketingPromotionRestrictionAction,
  MarketingPromotionRestrictionDefault,
  marketingpromotionGetRestrictionTypeLabel,
  marketingpromotionGetRestrictionOperatorLabel,
  marketingpromotionGetRestrictionConditionLabel,
  marketingpromotionGetRestrictionActionLabel,
  marketingpromotionIsOrderRestriction,
  marketingpromotionIsProductRestriction,
  marketingpromotionIsCustomerRestriction,
  marketingpromotionIsTimeRestriction,
  marketingpromotionGetDefaultOperator,
  marketingpromotionGetDefaultCondition,
} from '@vubon/shared-constants';

// ============================================================
// Promotion Restriction Extended Types
// ============================================================

/**
 * Promotion Restriction
 */
export interface PromotionRestriction extends BaseEntity, Timestamp {
  id: ID;
  promotionId: ID;
  userId: ID;
  type: MarketingPromotionRestrictionType;
  operator: MarketingPromotionRestrictionOperator;
  condition: MarketingPromotionRestrictionCondition;
  priority: MarketingPromotionRestrictionPriority;
  action: MarketingPromotionRestrictionAction;
  value: unknown;
  isActive: boolean;
  isOrderRestriction: boolean;
  isProductRestriction: boolean;
  isCustomerRestriction: boolean;
  isTimeRestriction: boolean;
  metadata?: Metadata;
}

/**
 * Promotion Restriction Filter
 */
export interface PromotionRestrictionFilter {
  ids?: ID[];
  promotionIds?: ID[];
  userIds?: ID[];
  types?: MarketingPromotionRestrictionType[];
  operators?: MarketingPromotionRestrictionOperator[];
  conditions?: MarketingPromotionRestrictionCondition[];
  priorities?: MarketingPromotionRestrictionPriority[];
  actions?: MarketingPromotionRestrictionAction[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isOrderRestriction?: boolean;
  isProductRestriction?: boolean;
  isCustomerRestriction?: boolean;
  isTimeRestriction?: boolean;
  searchTerm?: string;
}

/**
 * Promotion Restriction Statistics
 */
export interface PromotionRestrictionStatistics {
  promotionId: ID;
  totalRestrictions: number;
  activeRestrictions: number;
  byType: Record<MarketingPromotionRestrictionType, number>;
  byOperator: Record<MarketingPromotionRestrictionOperator, number>;
  byCondition: Record<MarketingPromotionRestrictionCondition, number>;
  byPriority: Record<MarketingPromotionRestrictionPriority, number>;
  byAction: Record<MarketingPromotionRestrictionAction, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  orderRestrictions: number;
  productRestrictions: number;
  customerRestrictions: number;
  timeRestrictions: number;
  mostFrequentType: MarketingPromotionRestrictionType;
  mostFrequentOperator: MarketingPromotionRestrictionOperator;
  mostFrequentCondition: MarketingPromotionRestrictionCondition;
}

/**
 * Promotion Restriction Summary
 */
export interface PromotionRestrictionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRestrictions: number;
  active: number;
  byType: Record<MarketingPromotionRestrictionType, number>;
  byOperator: Record<MarketingPromotionRestrictionOperator, number>;
  byCondition: Record<MarketingPromotionRestrictionCondition, number>;
  byPriority: Record<MarketingPromotionRestrictionPriority, number>;
  byAction: Record<MarketingPromotionRestrictionAction, number>;
  restrictionTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: MarketingPromotionRestrictionType;
    count: number;
    label: string;
  }[];
  topOperators: {
    operator: MarketingPromotionRestrictionOperator;
    count: number;
    label: string;
  }[];
  topConditions: {
    condition: MarketingPromotionRestrictionCondition;
    count: number;
    label: string;
  }[];
}

/**
 * Promotion Restriction Configuration
 */
export interface PromotionRestrictionConfiguration {
  enabled: boolean;
  defaultType: MarketingPromotionRestrictionType;
  defaultOperator: MarketingPromotionRestrictionOperator;
  defaultCondition: MarketingPromotionRestrictionCondition;
  defaultPriority: MarketingPromotionRestrictionPriority;
  defaultAction: MarketingPromotionRestrictionAction;
  maxRestrictionsPerPromotion: number;
  allowMultipleTypes: boolean;
  allowMultipleOperators: boolean;
  requireCondition: boolean;
  requireAction: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: PromotionRestrictionAlertConfig;
}

/**
 * Promotion Restriction Alert Configuration
 */
export interface PromotionRestrictionAlertConfig {
  enabled: boolean;
  invalidRestrictionAlert: boolean;
  overlappingRestrictionAlert: boolean;
  conflictingRestrictionAlert: boolean;
  maxLimitAlert: boolean;
  maxLimitThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Promotion Restriction History
 */
export interface PromotionRestrictionHistory extends BaseEntity, Timestamp {
  id: ID;
  restrictionId: ID;
  promotionId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Promotion Restriction Validation
 */
export interface PromotionRestrictionValidation {
  isValid: boolean;
  restrictionId: ID;
  promotionId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Promotion Restriction Export
 */
export interface PromotionRestrictionExport extends BaseEntity, Timestamp {
  id: ID;
  promotionId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PromotionRestrictionFilter;
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
  // Promotion Restriction
  MARKETINGPROMOTION_RESTRICTION,
  MarketingPromotionRestrictionType,
  MarketingPromotionRestrictionOperator,
  MarketingPromotionRestrictionCondition,
  MarketingPromotionRestrictionPriority,
  MarketingPromotionRestrictionAction,
  MarketingPromotionRestrictionDefault,
  marketingpromotionGetRestrictionTypeLabel,
  marketingpromotionGetRestrictionOperatorLabel,
  marketingpromotionGetRestrictionConditionLabel,
  marketingpromotionGetRestrictionActionLabel,
  marketingpromotionIsOrderRestriction,
  marketingpromotionIsProductRestriction,
  marketingpromotionIsCustomerRestriction,
  marketingpromotionIsTimeRestriction,
  marketingpromotionGetDefaultOperator,
  marketingpromotionGetDefaultCondition,
};
