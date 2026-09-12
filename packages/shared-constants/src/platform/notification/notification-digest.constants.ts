import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const NOTIFICATION_DIGEST = {
  STATUS: {
    ...COMMON_STATUS,
    GENERATING: 'generating',
    GENERATED: 'generated',
    SENT: 'sent',
    FAILED: 'failed',
  },
  TYPES: {
    ...COMMON_TYPES,
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  MAX_NOTIFICATIONS_PER_DIGEST: 100,
  DIGEST_TIMEOUT_MINUTES: 15,
  DIGEST_RETENTION_DAYS: 30,
} as const;
