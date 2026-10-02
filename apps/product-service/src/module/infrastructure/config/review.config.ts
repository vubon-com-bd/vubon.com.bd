import { getOptionalEnvInt } from './_helpers.js';
import { REVIEW } from '@vubon/shared-constants/business/product';

const REVIEW_CONFIG = Object.freeze({
  EDIT_WINDOW_HOURS: REVIEW.EDIT_WINDOW_HOURS,
  MAX_IMAGES: REVIEW.MAX_IMAGES,
  AUTO_APPROVE: REVIEW.AUTO_APPROVE,
  SPAM_REPORT_THRESHOLD: 5,
  CACHE_TTL_SECONDS: getOptionalEnvInt('REVIEW_CACHE_TTL', 120),
} as const);

export type ReviewConfig = typeof REVIEW_CONFIG;
export const reviewConfig = REVIEW_CONFIG;
export function getReviewConfig(): ReviewConfig { return REVIEW_CONFIG; }
