/**
 * Approval workflow configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const APPROVAL_CONFIG = Object.freeze({
  autoApproveThreshold: getOptionalEnvInt('APPROVAL_AUTO_THRESHOLD', 90),
  reviewSlaHours: getOptionalEnvInt('APPROVAL_REVIEW_SLA_HOURS', 48),
  maxResubmissions: getOptionalEnvInt('APPROVAL_MAX_RESUBMISSIONS', 3),
  appealWindowDays: getOptionalEnvInt('APPROVAL_APPEAL_WINDOW_DAYS', 30),
  enableAutoApproval: getOptionalEnvBool('APPROVAL_AUTO_ENABLED', false),
} as const);
