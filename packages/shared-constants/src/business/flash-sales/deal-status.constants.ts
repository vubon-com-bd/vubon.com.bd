import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const DEAL_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;
