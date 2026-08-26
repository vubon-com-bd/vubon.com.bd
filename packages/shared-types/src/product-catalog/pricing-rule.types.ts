/**
 * Pricing Rule Types
 * Type definitions for product pricing rules based on shared-constants
 * @module PricingRuleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Pricing
  ProductPricingType,
  ProductPriceStatus,
  ProductCurrency,
  ProductTaxClass,
} from '@vubon/shared-constants';

// ============================================================
// Pricing Rule Extended Types
// ============================================================

/**
 * Pricing rule
 */
export interface PricingRule extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  type: 'fixed' | 'percentage' | 'dynamic' | 'tiered' | 'volume' | 'bundle' | 'promotional';
  priority: number;
  isActive: boolean;
  appliesTo: 'all' | 'category' | 'product' | 'variant' | 'customer_group' | 'order' | 'cart';
  appliesToIds?: ID[];
  conditions: PricingRuleCondition[];
  actions: PricingRuleAction[];
  metadata?: Metadata;
}

/**
 * Pricing rule condition
 */
export interface PricingRuleCondition {
  id: string;
  field: string;
  operator:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'between'
    | 'regex';
  value: unknown;
  condition: 'and' | 'or';
  metadata?: Metadata;
}

/**
 * Pricing rule action
 */
export interface PricingRuleAction {
  id: string;
  type:
    | 'set_price'
    | 'adjust_price'
    | 'percentage_discount'
    | 'fixed_discount'
    | 'tier_pricing'
    | 'volume_pricing'
    | 'bundle_pricing';
  value: number;
  currency?: ProductCurrency;
  minQuantity?: number;
  maxQuantity?: number;
  tieredPrices?: PricingTier[];
  metadata?: Metadata;
}

/**
 * Pricing tier
 */
export interface PricingTier {
  id: string;
  minQuantity: number;
  maxQuantity?: number;
  price: number;
  currency?: ProductCurrency;
  metadata?: Metadata;
}

/**
 * Pricing rule filter
 */
export interface PricingRuleFilter {
  ids?: ID[];
  types?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minPriority?: number;
  maxPriority?: number;
  appliesTo?: string[];
  appliesToIds?: ID[];
  searchTerm?: string;
}

/**
 * Pricing rule statistics
 */
export interface PricingRuleStatistics {
  totalRules: number;
  activeRules: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
  byAppliesTo: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePriority: number;
  maxPriority: number;
  minPriority: number;
  mostFrequentType: string;
  mostFrequentAppliesTo: string;
}

/**
 * Pricing rule summary
 */
export interface PricingRuleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRules: number;
  active: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
  byAppliesTo: Record<string, number>;
  ruleTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: string;
    count: number;
    label: string;
  }[];
  topAppliesTo: {
    appliesTo: string;
    count: number;
    label: string;
  }[];
}

/**
 * Pricing rule configuration
 */
export interface PricingRuleConfiguration {
  enabled: boolean;
  defaultType: string;
  defaultPriority: number;
  maxRulesPerProduct: number;
  allowMultipleRules: boolean;
  ruleCombinationStrategy: 'sequential' | 'best' | 'worst' | 'average' | 'stack';
  requireConditions: boolean;
  requireActions: boolean;
  validateRules: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: PricingRuleAlertConfig;
}

/**
 * Pricing rule alert configuration
 */
export interface PricingRuleAlertConfig {
  enabled: boolean;
  ruleConflictAlert: boolean;
  duplicateRuleAlert: boolean;
  inactiveRuleAlert: boolean;
  highPriorityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Pricing rule history
 */
export interface PricingRuleHistory extends BaseEntity, Timestamp {
  id: ID;
  ruleId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Pricing rule validation
 */
export interface PricingRuleValidation {
  isValid: boolean;
  ruleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Pricing rule application
 */
export interface PricingRuleApplication extends BaseEntity, Timestamp {
  id: ID;
  ruleId: ID;
  productId: ID;
  variantId?: ID;
  originalPrice: number;
  appliedPrice: number;
  discountAmount: number;
  discountPercentage: number;
  currency: ProductCurrency;
  appliedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Pricing rule export
 */
export interface PricingRuleExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PricingRuleFilter;
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
  // Pricing
  ProductPricingType,
  ProductPriceStatus,
  ProductCurrency,
  ProductTaxClass,
};
