/**
 * Pricing Infrastructure Configuration
 * @module product-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PRICING_INFRA_CONFIG = Object.freeze({
  defaultCurrency: 'BDT',
  vatRatePercent: getOptionalEnvInt('PRICING_VAT_RATE_PERCENT', 15),
  maxDiscountPercent: getOptionalEnvInt('PRICING_MAX_DISCOUNT_PERCENT', 90),
  cacheTtlSeconds: getOptionalEnvInt('PRICING_CACHE_TTL', 300),
  priceSyncIntervalMs: getOptionalEnvInt('PRICING_SYNC_INTERVAL_MS', 300000),
} as const);

export type PricingInfraConfig = typeof PRICING_INFRA_CONFIG;
