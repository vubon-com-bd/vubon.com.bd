import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const GUIDE_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  PUBLISHED: 'published',
  UPDATED: 'updated',
  ARCHIVED: 'archived',
} as const;
