import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const FLASH_SALE_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  UPCOMING: 'upcoming',
  LIVE: 'live',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ENDED: 'ended',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;
