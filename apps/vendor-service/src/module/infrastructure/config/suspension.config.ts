import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SUSPENSION_CONFIG = Object.freeze({
  defaultDurationDays: getOptionalEnvInt('SUSPENSION_DEFAULT_DAYS', 30),
  maxAppeals: getOptionalEnvInt('SUSPENSION_MAX_APPEALS', 3),
  appealWindowDays: getOptionalEnvInt('SUSPENSION_APPEAL_WINDOW_DAYS', 14),
} as const);
