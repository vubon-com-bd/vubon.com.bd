import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const ANALYTICS_SORT = {
  TYPES: {
    ...COMMON_TYPES,
    ASC: 'asc',
    DESC: 'desc',
  },
  DEFAULT_SORT_DIRECTION: 'asc',
} as const;
