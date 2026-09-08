import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { VALIDATION } from '../../common/validation.constants';
import { DEAL_STATUS } from './deal-status.constants';

export const DEAL_RULE = {
  TYPES: {
    ...COMMON_TYPES,
    ELIGIBILITY: 'eligibility',
    QUALIFICATION: 'qualification',
    RESTRICTION: 'restriction',
    PRIORITY: 'priority',
  },
  VALIDATION: { ...VALIDATION },
  DEAL_STATUS: { ...DEAL_STATUS },
  RULE_TYPES: {
    USER_ELIGIBILITY: 'user_eligibility',
    PRODUCT_ELIGIBILITY: 'product_eligibility',
    TIME_RESTRICTION: 'time_restriction',
    QUANTITY_RESTRICTION: 'quantity_restriction',
    VALUE_RESTRICTION: 'value_restriction',
  },
  RULE_OPERATORS: {
    EQUAL: 'equal',
    NOT_EQUAL: 'not_equal',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    CONTAINS: 'contains',
  },
  MAX_RULES_PER_DEAL: 20,
  RULE_PRIORITY_LEVELS: {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  },
} as const;
