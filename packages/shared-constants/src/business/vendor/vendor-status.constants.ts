import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const VENDOR_STATUS = {
  ...COMMON_STATUS,
  PENDING: 'pending',
  PENDING_APPROVAL: 'pending_approval',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  DELETED: 'deleted',
  ARCHIVED: 'archived',
} as const;
