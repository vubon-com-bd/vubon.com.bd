import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const NOTIFICATION_BROADCAST = {
  STATUS: {
    ...COMMON_STATUS,
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    SENDING: 'sending',
    SENT: 'sent',
    PARTIAL: 'partial',
    FAILED: 'failed',
  },
  TYPES: {
    ...COMMON_TYPES,
    ALL_USERS: 'all_users',
    SEGMENT: 'segment',
    ROLE: 'role',
    CUSTOM: 'custom',
  },
  MAX_RECIPIENTS: 1000000,
  BATCH_SIZE: 1000,
  BROADCAST_TIMEOUT_MINUTES: 60,
} as const;
