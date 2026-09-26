import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const LOYALTY_CONFIG = Object.freeze({
  pointsPerCurrency: getOptionalEnvInt('LOYALTY_POINTS_PER_CURRENCY', 1),
  pointsExpiryDays: getOptionalEnvInt('LOYALTY_POINTS_EXPIRY_DAYS', 365),
  tierUpgradeThresholds: Object.freeze({
    bronze: 0,
    silver: 5000,
    gold: 20000,
    platinum: 50000,
    diamond: 100000,
  }),
} as const);
