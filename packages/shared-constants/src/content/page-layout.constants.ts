import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const PAGE_LAYOUT = {
  TYPES: {
    ...COMMON_TYPES,
    ONE_COLUMN: 'one_column',
    TWO_COLUMN: 'two_column',
    THREE_COLUMN: 'three_column',
    GRID: 'grid',
    MASONRY: 'masonry',
  },
  LAYOUT_WIDTHS: {
    FULL: 'full',
    CONTAINED: 'contained',
    NARROW: 'narrow',
  },
} as const;
