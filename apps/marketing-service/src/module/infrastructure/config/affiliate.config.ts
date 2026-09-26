import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const AFFILIATE_CONFIG = Object.freeze({
  defaultCommissionRate: getOptionalEnvInt('AFFILIATE_DEFAULT_COMMISSION', 10),
  minPayoutAmount: getOptionalEnvInt('AFFILIATE_MIN_PAYOUT', 500),
  cookieWindowDays: getOptionalEnvInt('AFFILIATE_COOKIE_WINDOW_DAYS', 30),
} as const);
