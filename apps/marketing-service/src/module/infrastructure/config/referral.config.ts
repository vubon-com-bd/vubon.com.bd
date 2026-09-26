import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const REFERRAL_CONFIG = Object.freeze({
  rewardPercent: getOptionalEnvInt('REFERRAL_REWARD_PERCENT', 10),
  expiryDays: getOptionalEnvInt('REFERRAL_EXPIRY_DAYS', 30),
  codePrefix: 'REF',
} as const);
