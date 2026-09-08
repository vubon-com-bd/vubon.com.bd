import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CURRENCY } from '../common/currency.constants';
import { CAMPAIGN_CHANNEL } from './campaign-channel.constants';

export const CAMPAIGN_BUDGET = {
  TYPES: {
    ...COMMON_TYPES,
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    TOTAL: 'total',
    FLEXIBLE: 'flexible',
  },
  CURRENCY: { ...CURRENCY },
  CAMPAIGN_CHANNEL: { ...CAMPAIGN_CHANNEL },
  BUDGET_DISTRIBUTION: {
    EVEN: 'even',
    PRIORITY: 'priority',
    PERFORMANCE: 'performance',
    CUSTOM: 'custom',
  },
  MIN_DAILY_BUDGET: 100,
  MAX_DAILY_BUDGET: 1000000,
  MIN_TOTAL_BUDGET: 1000,
  MAX_TOTAL_BUDGET: 10000000,
} as const;
