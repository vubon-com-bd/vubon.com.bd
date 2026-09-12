import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const RETURN_REASON = {
  TYPES: {
    ...COMMON_TYPES,
    DEFECTIVE: 'defective',
    DAMAGED: 'damaged',
    WRONG_ITEM: 'wrong_item',
    MISSING_PARTS: 'missing_parts',
    NOT_AS_DESCRIBED: 'not_as_described',
    SIZE_ISSUE: 'size_issue',
    COLOR_ISSUE: 'color_issue',
    QUALITY_ISSUE: 'quality_issue',
    DELIVERY_ISSUE: 'delivery_issue',
    CUSTOMER_REQUEST: 'customer_request',
    OTHER: 'other',
  },
  REASON_CATEGORIES: {
    PRODUCT: 'product',
    DELIVERY: 'delivery',
    CUSTOMER: 'customer',
    OTHER: 'other',
  },
  REASON_PRIORITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  },
} as const;
