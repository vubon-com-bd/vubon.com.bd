import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const TICKET_PRIORITY = {
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
  RESPONSE_TIME_MINUTES: {
    LOW: 480,
    MEDIUM: 120,
    HIGH: 60,
    URGENT: 30,
    CRITICAL: 15,
  },
  RESOLUTION_TIME_HOURS: {
    LOW: 48,
    MEDIUM: 24,
    HIGH: 12,
    URGENT: 6,
    CRITICAL: 3,
  },
} as const;
