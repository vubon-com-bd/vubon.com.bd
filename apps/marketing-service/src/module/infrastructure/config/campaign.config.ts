import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CAMPAIGN_CONFIG = Object.freeze({
  maxActive: getOptionalEnvInt('CAMPAIGN_MAX_ACTIVE', 20),
  defaultBudgetCurrency: 'BDT',
  cleanupIntervalSeconds: getOptionalEnvInt('CAMPAIGN_CLEANUP_INTERVAL', 86400),
} as const);
