import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const CANCEL_CONFIG = Object.freeze({
  windowHours: getOptionalEnvInt('CANCEL_WINDOW_HOURS', 24),
  requireApproval: getOptionalEnvBool('CANCEL_REQUIRE_APPROVAL', true),
  maxReasonLength: getOptionalEnvInt('CANCEL_MAX_REASON_LENGTH', 500),
} as const);
