import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const PAGE_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;
