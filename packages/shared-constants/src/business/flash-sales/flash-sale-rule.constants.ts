/**
 * Flash Sale Rule Constants (EXTENDS common/types)
 * @module shared-constants/business/flash-sales/flash-sale-rule.constants
 */

import { TYPES } from '../../common/types.constants';

export const FLASH_SALE_RULE = {
  // Base types from common
  ...TYPES,

  // Rule specific
  MAX_RULES_PER_SALE: 20,
  RULE_CACHE_TTL: 3600,

  // Rule type
  FLASH_SALE_RULE_TYPE: {
    ELIGIBILITY: 'eligibility',
    DISCOUNT: 'discount',
    PRIORITY: 'priority',
    LIMIT: 'limit',
    EXCLUSION: 'exclusion',
    COMBINATION: 'combination',
    CUSTOM: 'custom',
  } as const,

  // Rule condition
  FLASH_SALE_RULE_CONDITION: {
    USER_TYPE: 'user_type',
    USER_GROUP: 'user_group',
    ORDER_AMOUNT: 'order_amount',
    ORDER_COUNT: 'order_count',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_BRAND: 'product_brand',
    PRODUCT_PRICE: 'product_price',
    LOCATION: 'location',
    DEVICE: 'device',
    TIME: 'time',
  } as const,

  // Rule operator
  FLASH_SALE_RULE_OPERATOR: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    CONTAINS: 'contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
  } as const,

  // Rule priority
  FLASH_SALE_RULE_PRIORITY: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
  } as const,
} as const;

export type FlashSaleRuleType =
  (typeof FLASH_SALE_RULE.FLASH_SALE_RULE_TYPE)[keyof typeof FLASH_SALE_RULE.FLASH_SALE_RULE_TYPE];
export type FlashSaleRuleCondition =
  (typeof FLASH_SALE_RULE.FLASH_SALE_RULE_CONDITION)[keyof typeof FLASH_SALE_RULE.FLASH_SALE_RULE_CONDITION];
export type FlashSaleRuleOperator =
  (typeof FLASH_SALE_RULE.FLASH_SALE_RULE_OPERATOR)[keyof typeof FLASH_SALE_RULE.FLASH_SALE_RULE_OPERATOR];
export type FlashSaleRulePriority =
  (typeof FLASH_SALE_RULE.FLASH_SALE_RULE_PRIORITY)[keyof typeof FLASH_SALE_RULE.FLASH_SALE_RULE_PRIORITY];
