/**
 * Subscription configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const SUBSCRIPTION_CONFIG = Object.freeze({
  trialDays: getOptionalEnvInt('SUBSCRIPTION_TRIAL_DAYS', 14),
  gracePeriodDays: getOptionalEnvInt('SUBSCRIPTION_GRACE_DAYS', 7),
  autoRenew: getOptionalEnvBool('SUBSCRIPTION_AUTO_RENEW', true),
  cancelAtPeriodEnd: getOptionalEnvBool('SUBSCRIPTION_CANCEL_AT_PERIOD_END', true),
} as const);
