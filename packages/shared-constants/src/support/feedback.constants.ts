import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { RATING } from '../common/rating.constants';

export const FEEDBACK = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    REVIEWED: 'reviewed',
    ACTIONED: 'actioned',
    REJECTED: 'rejected',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'feedback:view',
    CREATE: 'feedback:create',
    UPDATE: 'feedback:update',
    DELETE: 'feedback:delete',
    REVIEW: 'feedback:review',
  },
  RATING: { ...RATING },
  FEEDBACK_TYPES: {
    SUGGESTION: 'suggestion',
    COMPLAINT: 'complaint',
    PRAISE: 'praise',
    ISSUE: 'issue',
  },
  MAX_CONTENT_LENGTH: 5000,
  MIN_CONTENT_LENGTH: 10,
} as const;
