/**
 * Product Pricing Rule Constants (EXTENDS common/types)
 * @module shared-constants/business/product/pricing-rule.constants
 */

import { TYPES } from '../../common/types.constants';

export const PRODUCT_PRICING_RULE = {
  // Base types from common
  ...TYPES,

  // Pricing rule specific
  MAX_RULES_PER_PRODUCT: 10,
  MAX_RULES_PER_CATEGORY: 20,
  PRICING_RULE_CACHE_TTL: 3600,

  // Rule type
  PRODUCT_PRICING_RULE_TYPE: {
    DISCOUNT: 'discount',
    PROMOTION: 'promotion',
    BUNDLE: 'bundle',
    TIERED: 'tiered',
    BOGO: 'bogo',
    VOLUME: 'volume',
    SEASONAL: 'seasonal',
    CLEARANCE: 'clearance',
    CUSTOM: 'custom',
  } as const,

  // Rule status
  PRODUCT_PRICING_RULE_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    SCHEDULED: 'scheduled',
  } as const,

  // Rule condition type
  PRODUCT_PRICING_RULE_CONDITION: {
    PRODUCT: 'product',
    CATEGORY: 'category',
    BRAND: 'brand',
    PRICE: 'price',
    QUANTITY: 'quantity',
    TOTAL: 'total',
    USER: 'user',
    USER_GROUP: 'user_group',
    DATE: 'date',
    TIME: 'time',
    DAY_OF_WEEK: 'day_of_week',
    CUSTOM: 'custom',
  } as const,

  // Rule condition operator
  PRODUCT_PRICING_RULE_OPERATOR: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    GREATER_THAN_EQUALS: 'greater_than_equals',
    LESS_THAN_EQUALS: 'less_than_equals',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
  } as const,

  // Rule action type
  PRODUCT_PRICING_RULE_ACTION: {
    FIXED_AMOUNT: 'fixed_amount',
    PERCENTAGE: 'percentage',
    FREE_PRODUCT: 'free_product',
    FREE_SHIPPING: 'free_shipping',
    CUSTOM: 'custom',
  } as const,

  // Rule priority
  PRODUCT_PRICING_RULE_PRIORITY: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    HIGHEST: 4,
  } as const,

  // Rule applicability
  PRODUCT_PRICING_RULE_APPLICABILITY: {
    ALL: 'all',
    SPECIFIC: 'specific',
    EXCLUDE: 'exclude',
  } as const,
} as const;

export type ProductPricingRuleType =
  (typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_TYPE)[keyof typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_TYPE];
export type ProductPricingRuleStatus =
  (typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_STATUS)[keyof typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_STATUS];
export type ProductPricingRuleCondition =
  (typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_CONDITION)[keyof typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_CONDITION];
export type ProductPricingRuleOperator =
  (typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_OPERATOR)[keyof typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_OPERATOR];
export type ProductPricingRuleAction =
  (typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_ACTION)[keyof typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_ACTION];
export type ProductPricingRulePriority =
  (typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_PRIORITY)[keyof typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_PRIORITY];
export type ProductPricingRuleApplicability =
  (typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_APPLICABILITY)[keyof typeof PRODUCT_PRICING_RULE.PRODUCT_PRICING_RULE_APPLICABILITY];
