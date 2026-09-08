import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const WEBINAR_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  ENDED: 'ended',
  RECORDED: 'recorded',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
} as const;
