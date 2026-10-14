/**
 * Tier configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const TIER_CONFIG = Object.freeze({
  bronzeMinSales: getOptionalEnvInt('TIER_BRONZE_MIN_SALES', 0),
  silverMinSales: getOptionalEnvInt('TIER_SILVER_MIN_SALES', 100_001),
  goldMinSales: getOptionalEnvInt('TIER_GOLD_MIN_SALES', 1_000_001),
  platinumMinSales: getOptionalEnvInt('TIER_PLATINUM_MIN_SALES', 10_000_001),
  diamondMinSales: getOptionalEnvInt('TIER_DIAMOND_MIN_SALES', 100_000_001),
  downgradeGraceDays: getOptionalEnvInt('TIER_DOWNGRADE_GRACE_DAYS', 30),
} as const);
