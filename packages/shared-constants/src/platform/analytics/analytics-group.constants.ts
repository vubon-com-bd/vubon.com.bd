import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const ANALYTICS_GROUP = {
  TYPES: {
    ...COMMON_TYPES,
    DATE: 'date',
    CATEGORY: 'category',
    DIMENSION: 'dimension',
  },
  GROUP_OPERATIONS: {
    BY: 'by',
    ROLLUP: 'rollup',
    CUBE: 'cube',
  },
  MAX_GROUP_FIELDS: 5,
} as const;
