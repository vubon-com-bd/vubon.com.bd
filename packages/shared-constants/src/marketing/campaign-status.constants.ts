import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const CAMPAIGN_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  PAUSED: 'paused',
  ENDED: 'ended',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
} as const;
