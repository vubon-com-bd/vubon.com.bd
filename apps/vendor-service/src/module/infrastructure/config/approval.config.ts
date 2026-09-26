import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const APPROVAL_CONFIG = Object.freeze({
  autoApproveHours: getOptionalEnvInt('APPROVAL_AUTO_HOURS', 48),
  maxPendingDays: getOptionalEnvInt('APPROVAL_MAX_PENDING_DAYS', 7),
  requireManualReview: true,
} as const);
