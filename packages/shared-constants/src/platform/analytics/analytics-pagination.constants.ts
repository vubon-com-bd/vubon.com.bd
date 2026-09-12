import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const ANALYTICS_PAGINATION = {
  TYPES: {
    ...COMMON_TYPES,
    OFFSET: 'offset',
    CURSOR: 'cursor',
    PAGE: 'page',
  },
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 1000,
  DEFAULT_PAGE: 1,
} as const;
