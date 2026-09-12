import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const PAGE_TEMPLATE = {
  TYPES: {
    ...COMMON_TYPES,
    DEFAULT: 'default',
    FULL_WIDTH: 'full_width',
    SIDEBAR_LEFT: 'sidebar_left',
    SIDEBAR_RIGHT: 'sidebar_right',
    SPLIT: 'split',
    LANDING: 'landing',
    COMING_SOON: 'coming_soon',
    MAINTENANCE: 'maintenance',
  },
  TEMPLATE_CATEGORIES: {
    BASIC: 'basic',
    LANDING: 'landing',
    SPECIAL: 'special',
  },
} as const;
