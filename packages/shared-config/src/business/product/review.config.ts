/**
 * Review configuration
 * @module shared-config/business/product
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const REVIEW_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('REVIEW_ENABLED', true),
  requireVerifiedPurchase: getOptionalEnvBool('REVIEW_VERIFIED_ONLY', false),
  autoApproveReviews: getOptionalEnvBool('REVIEW_AUTO_APPROVE', false),
  maxImages: getOptionalEnvInt('REVIEW_MAX_IMAGES', 5),
  commentMinLength: getOptionalEnvInt('REVIEW_COMMENT_MIN', 10),
  commentMaxLength: getOptionalEnvInt('REVIEW_COMMENT_MAX', 2000),
  editWindowHours: getOptionalEnvInt('REVIEW_EDIT_WINDOW_HOURS', 24),
  minRating: 1,
  maxRating: 5,
  helpfulVoteEnabled: getOptionalEnvBool('REVIEW_HELPFUL_VOTE', true),
});
