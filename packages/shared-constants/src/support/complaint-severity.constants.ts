import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const COMPLAINT_SEVERITY = {
  TYPES: {
    ...COMMON_TYPES,
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },
  SEVERITY_LEVELS: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
  },
  RESPONSE_TIME_HOURS: {
    LOW: 48,
    MEDIUM: 24,
    HIGH: 12,
    CRITICAL: 6,
  },
} as const;
