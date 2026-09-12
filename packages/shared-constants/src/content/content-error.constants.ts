import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { ERROR_CODE } from '../common/error-code.constants';

export const CONTENT_ERROR = {
  TYPES: {
    ...COMMON_TYPES,
    ...ERROR_CODE,
    CONTENT_NOT_FOUND: 'content_not_found',
    CONTENT_UNAUTHORIZED: 'content_unauthorized',
    CONTENT_INVALID: 'content_invalid',
    CONTENT_EXPIRED: 'content_expired',
    CONTENT_PENDING: 'content_pending',
    CONTENT_REJECTED: 'content_rejected',
    CONTENT_LIMIT_EXCEEDED: 'content_limit_exceeded',
  },
  ERROR_CODE: { ...ERROR_CODE },
  ERROR_MESSAGES: {
    CONTENT_NOT_FOUND: 'Content not found',
    CONTENT_UNAUTHORIZED: 'You are not authorized to access this content',
    CONTENT_INVALID: 'Invalid content data',
    CONTENT_EXPIRED: 'Content has expired',
    CONTENT_PENDING: 'Content is pending review',
    CONTENT_REJECTED: 'Content has been rejected',
    CONTENT_LIMIT_EXCEEDED: 'Content limit exceeded',
  },
} as const;
