import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const NOTIFICATION_PRIORITY = {
  TYPES: {
    ...COMMON_TYPES,
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
    CRITICAL: 'critical',
  },
  PRIORITY_LEVELS: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    URGENT: 4,
    CRITICAL: 5,
  },
  DELIVERY_TIMEOUT_MINUTES: {
    LOW: 60,
    MEDIUM: 30,
    HIGH: 15,
    URGENT: 5,
    CRITICAL: 2,
  },
} as const;
