import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const ANNOUNCEMENT_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  PUBLISHED: 'published',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
} as const;
