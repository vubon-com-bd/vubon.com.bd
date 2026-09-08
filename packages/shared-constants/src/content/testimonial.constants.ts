import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { TESTIMONIAL_STATUS } from './testimonial-status.constants';
import { RATING } from '../common/rating.constants';
import { USER_STATUS } from '../user/user-status.constants';

export const TESTIMONIAL = {
  STATUS: {
    ...STATUS,
    ...TESTIMONIAL_STATUS,
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'testimonial:view',
    CREATE: 'testimonial:create',
    UPDATE: 'testimonial:update',
    DELETE: 'testimonial:delete',
    APPROVE: 'testimonial:approve',
  },
  TESTIMONIAL_STATUS: { ...TESTIMONIAL_STATUS },
  RATING: { ...RATING },
  USER_STATUS: { ...USER_STATUS },
  MAX_CONTENT_LENGTH: 1000,
  MIN_CONTENT_LENGTH: 10,
  AUTO_APPROVE_THRESHOLD: 4,
} as const;
