import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const COMPLEMENTARY = {
  TYPES: {
    ...COMMON_TYPES,
    ACCESSORY: 'accessory',
    ADD_ON: 'add_on',
    UPGRADE: 'upgrade',
    SERVICE: 'service',
    MAINTENANCE: 'maintenance',
  },
  COMPLEMENTARY_SCORE_THRESHOLD: 0.6,
  MAX_COMPLEMENTARY_ITEMS: 10,
  COMPLEMENTARY_CATEGORY_MATCH: 0.8,
  ANALYSIS_WINDOW_DAYS: 60,
  UPDATE_INTERVAL_DAYS: 7,
} as const;
