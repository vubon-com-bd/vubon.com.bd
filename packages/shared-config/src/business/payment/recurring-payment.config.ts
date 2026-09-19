/**
 * Recurring payment configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const RECURRING_PAYMENT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('RECURRING_ENABLED', false),
  maxActiveSubscriptions: getOptionalEnvInt('RECURRING_MAX_ACTIVE', 10),
  gracePeriodDays: getOptionalEnvInt('RECURRING_GRACE_DAYS', 3),
  retryAttempts: getOptionalEnvInt('RECURRING_RETRY_ATTEMPTS', 3),
  retryIntervalDays: getOptionalEnvInt('RECURRING_RETRY_INTERVAL_DAYS', 2),
  cancelAtPeriodEnd: getOptionalEnvBool('RECURRING_CANCEL_AT_PERIOD_END', true),
  autoRenew: getOptionalEnvBool('RECURRING_AUTO_RENEW', true),
});
