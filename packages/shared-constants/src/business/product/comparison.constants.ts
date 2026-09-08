import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { FILTER } from '../../common/filter.constants';

export const COMPARISON = {
  TYPES: {
    ...COMMON_TYPES,
    SIDE_BY_SIDE: 'side_by_side',
    TABLE: 'table',
    LIST: 'list',
  },
  FILTER: { ...FILTER },
  MAX_COMPARE_ITEMS: 5,
} as const;
