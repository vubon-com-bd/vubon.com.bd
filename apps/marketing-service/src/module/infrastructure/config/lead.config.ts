import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const LEAD_CONFIG = Object.freeze({
  qualificationThreshold: getOptionalEnvInt('LEAD_QUALIFICATION_THRESHOLD', 60),
  maxAssignmentAttempts: getOptionalEnvInt('LEAD_MAX_ASSIGNMENT_ATTEMPTS', 3),
  autoAssignEnabled: true,
} as const);
