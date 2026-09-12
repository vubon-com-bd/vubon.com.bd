import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const TESTIMONIAL_STATUS = {
  ...COMMON_STATUS,
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  FEATURED: 'featured',
} as const;
