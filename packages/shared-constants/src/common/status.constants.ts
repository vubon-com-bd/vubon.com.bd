export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked',
  DELETED: 'deleted',
  ARCHIVED: 'archived',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  EXPIRED: 'expired',
} as const;

export type StatusType = (typeof STATUS)[keyof typeof STATUS];
