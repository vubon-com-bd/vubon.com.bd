import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const RETURN_CONFIG = Object.freeze({
  windowDays: getOptionalEnvInt('RETURN_WINDOW_DAYS', 7),
  requireApproval: getOptionalEnvBool('RETURN_REQUIRE_APPROVAL', true),
  requireOriginalPackaging: getOptionalEnvBool('RETURN_REQUIRE_PACKAGING', true),
  maxReasonLength: getOptionalEnvInt('RETURN_MAX_REASON_LENGTH', 500),
} as const);
