import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { REVIEW } from '../../common/review.constants';
import { VENDOR_RATING } from './vendor-rating.constants';

export const VENDOR_REVIEW = {
  STATUS: {
    ...COMMON_STATUS,
    ...REVIEW.REVIEW_STATUS,
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    FLAGGED: 'flagged',
    HIDDEN: 'hidden',
  },
  REVIEW: { ...REVIEW },
  VENDOR_RATING: { ...VENDOR_RATING },
  REVIEW_TYPES: {
    POSITIVE: 'positive',
    NEUTRAL: 'neutral',
    NEGATIVE: 'negative',
  },
  MIN_REVIEW_LENGTH: REVIEW.LIMITS.MIN_CHARS,
  MAX_REVIEW_LENGTH: REVIEW.LIMITS.MAX_CHARS,
  AUTO_APPROVAL_THRESHOLD: REVIEW.MODERATION.AUTO_APPROVE ? 4 : 5,
} as const;
