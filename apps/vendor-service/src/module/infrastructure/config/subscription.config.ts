import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SUBSCRIPTION_CONFIG = Object.freeze({
  trialDays: getOptionalEnvInt('SUBSCRIPTION_TRIAL_DAYS', 14),
  renewalReminderDays: getOptionalEnvInt('SUBSCRIPTION_REMINDER_DAYS', 7),
  gracePeriodDays: getOptionalEnvInt('SUBSCRIPTION_GRACE_DAYS', 3),
  maxDowngradesPerCycle: getOptionalEnvInt('SUBSCRIPTION_MAX_DOWNGRADES', 1),
} as const);
