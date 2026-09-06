/**
 * Deal Rule Constants (EXTENDS common/types + common/status)
 * @module shared-constants/business/flash-sales/deal-rule.constants
 */

import { TYPES } from '../../common/types.constants';
import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ROLES } from '../../common/roles.constants';

export const DEAL_RULE = {
  // Base types from common
  ...TYPES,

  // Status from common
  STATUS: STATUS,

  // Permissions from common
  PERMISSIONS: PERMISSIONS,

  // Roles from common
  ROLES: ROLES,

  // Rule specific
  MAX_RULES_PER_DEAL: 20,
  RULE_CACHE_TTL: 3600,

  // Rule type
  DEAL_RULE_TYPE: {
    ELIGIBILITY: 'eligibility',
    DISCOUNT: 'discount',
    PRIORITY: 'priority',
    LIMIT: 'limit',
    EXCLUSION: 'exclusion',
    COMBINATION: 'combination',
    CUSTOM: 'custom',
  } as const,

  // Rule condition
  DEAL_RULE_CONDITION: {
    USER_TYPE: 'user_type',
    USER_GROUP: 'user_group',
    USER_LOCATION: 'user_location',
    ORDER_AMOUNT: 'order_amount',
    ORDER_COUNT: 'order_count',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_BRAND: 'product_brand',
    PRODUCT_PRICE: 'product_price',
    PRODUCT_STOCK: 'product_stock',
    DEVICE_TYPE: 'device_type',
    PURCHASE_HISTORY: 'purchase_history',
    CUSTOMER_LOYALTY: 'customer_loyalty',
    TIME: 'time',
    DATE: 'date',
    DAY_OF_WEEK: 'day_of_week',
    CUSTOM: 'custom',
  } as const,

  // Rule operator
  DEAL_RULE_OPERATOR: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    GREATER_THAN_OR_EQUALS: 'greater_than_or_equals',
    LESS_THAN_OR_EQUALS: 'less_than_or_equals',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    MATCHES: 'matches',
  } as const,

  // Rule priority
  DEAL_RULE_PRIORITY: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
    URGENT: 5,
  } as const,

  // Rule applicability
  DEAL_RULE_APPLICABILITY: {
    ALL: 'all',
    ANY: 'any',
    NONE: 'none',
    CUSTOM: 'custom',
  } as const,

  // Rule status
  DEAL_RULE_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,
} as const;

export type DealRuleType = (typeof DEAL_RULE.DEAL_RULE_TYPE)[keyof typeof DEAL_RULE.DEAL_RULE_TYPE];
export type DealRuleCondition =
  (typeof DEAL_RULE.DEAL_RULE_CONDITION)[keyof typeof DEAL_RULE.DEAL_RULE_CONDITION];
export type DealRuleOperator =
  (typeof DEAL_RULE.DEAL_RULE_OPERATOR)[keyof typeof DEAL_RULE.DEAL_RULE_OPERATOR];
export type DealRulePriority =
  (typeof DEAL_RULE.DEAL_RULE_PRIORITY)[keyof typeof DEAL_RULE.DEAL_RULE_PRIORITY];
export type DealRuleApplicability =
  (typeof DEAL_RULE.DEAL_RULE_APPLICABILITY)[keyof typeof DEAL_RULE.DEAL_RULE_APPLICABILITY];
export type DealRuleStatus =
  (typeof DEAL_RULE.DEAL_RULE_STATUS)[keyof typeof DEAL_RULE.DEAL_RULE_STATUS];
