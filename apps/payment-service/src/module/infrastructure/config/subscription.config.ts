/**
 * Subscription Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SUBSCRIPTION_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('RECURRING_ENABLED', false),
  maxActiveSubscriptions: getOptionalEnvInt('RECURRING_MAX_ACTIVE', 10),
  gracePeriodDays: getOptionalEnvInt('RECURRING_GRACE_DAYS', 3),
  retryAttempts: getOptionalEnvInt('RECURRING_RETRY_ATTEMPTS', 3),
  retryIntervalDays: getOptionalEnvInt('RECURRING_RETRY_INTERVAL_DAYS', 2),
  cancelAtPeriodEnd: getOptionalEnvBool('RECURRING_CANCEL_AT_PERIOD_END', true),
  autoRenew: getOptionalEnvBool('RECURRING_AUTO_RENEW', true),
  maxTrialDays: getOptionalEnvInt('SUBSCRIPTION_MAX_TRIAL_DAYS', 30),
});

export type SubscriptionInfraConfig = typeof SUBSCRIPTION_INFRA_CONFIG;
