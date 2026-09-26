import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const REVIEW_CONFIG = Object.freeze({
  minRating: 1,
  maxRating: 5,
  maxContentLength: getOptionalEnvInt('REVIEW_MAX_CONTENT_LENGTH', 2000),
  autoApprove: getOptionalEnvBool('REVIEW_AUTO_APPROVE', false),
  requirePurchase: getOptionalEnvBool('REVIEW_REQUIRE_PURCHASE', false),
} as const);
