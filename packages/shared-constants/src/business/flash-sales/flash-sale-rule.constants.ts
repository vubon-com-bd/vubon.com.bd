import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { VALIDATION } from '../../common/validation.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_RULE = {
  TYPES: {
    ...COMMON_TYPES,
    QUANTITY_LIMIT: 'quantity_limit',
    TIME_LIMIT: 'time_limit',
    USER_LIMIT: 'user_limit',
    PRODUCT_LIMIT: 'product_limit',
    CATEGORY_LIMIT: 'category_limit',
    PRICE_LIMIT: 'price_limit',
  },
  VALIDATION: { ...VALIDATION },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  RULE_OPERATORS: {
    EQUAL: 'equal',
    NOT_EQUAL: 'not_equal',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
  },
  RULE_PRIORITIES: {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  },
  MAX_RULES_PER_SALE: 20,
} as const;
