/**
 * Suspension policy configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const SUSPENSION_CONFIG = Object.freeze({
  defaultDurationDays: getOptionalEnvInt('SUSPENSION_DEFAULT_DAYS', 30),
  maxDurationDays: getOptionalEnvInt('SUSPENSION_MAX_DAYS', 365),
  appealWindowDays: getOptionalEnvInt('SUSPENSION_APPEAL_WINDOW_DAYS', 14),
  autoLiftOnResolution: getOptionalEnvBool('SUSPENSION_AUTO_LIFT', true),
} as const);
