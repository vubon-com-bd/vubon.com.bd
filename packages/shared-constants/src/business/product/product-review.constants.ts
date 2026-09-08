import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { RATING } from '../../common/rating.constants';

export const PRODUCT_REVIEW = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    FLAGGED: 'flagged',
  },
  RATING: { ...RATING },
} as const;
