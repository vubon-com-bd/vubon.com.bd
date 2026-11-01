/**
 * Review Infrastructure Configuration
 * @module product-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const REVIEW_INFRA_CONFIG = Object.freeze({
  cacheTtlSeconds: getOptionalEnvInt('REVIEW_CACHE_TTL', 900),
  moderationThresholdHours: getOptionalEnvInt('REVIEW_MODERATION_THRESHOLD_HOURS', 24),
  spamReportThreshold: getOptionalEnvInt('REVIEW_SPAM_REPORT_THRESHOLD', 3),
  editWindowHours: getOptionalEnvInt('REVIEW_EDIT_WINDOW_HOURS', 24),
  maxImagesPerReview: getOptionalEnvInt('REVIEW_MAX_IMAGES', 5),
} as const);

export type ReviewInfraConfig = typeof REVIEW_INFRA_CONFIG;
