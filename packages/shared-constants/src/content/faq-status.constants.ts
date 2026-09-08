import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const FAQ_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;
