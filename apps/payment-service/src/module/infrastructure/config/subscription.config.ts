import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SUBSCRIPTION_CONFIG = Object.freeze({
  gracePeriodDays: getOptionalEnvInt('SUBSCRIPTION_GRACE_DAYS', 3),
  maxRenewalAttempts: getOptionalEnvInt('SUBSCRIPTION_MAX_RENEWAL_ATTEMPTS', 3),
  renewalReminderDays: getOptionalEnvInt('SUBSCRIPTION_REMINDER_DAYS', 7),
  trialPeriodDays: getOptionalEnvInt('SUBSCRIPTION_TRIAL_DAYS', 14),
} as const);
