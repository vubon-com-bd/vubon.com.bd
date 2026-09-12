import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const CONTENT_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending_review',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
  UNPUBLISHED: 'unpublished',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  EXPIRED: 'expired',
  FEATURED: 'featured',
} as const;
