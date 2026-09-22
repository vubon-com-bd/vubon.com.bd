import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const TIER_CONFIG = Object.freeze({
  bronzeThreshold: getOptionalEnvInt('TIER_BRONZE_THRESHOLD', 0),
  silverThreshold: getOptionalEnvInt('TIER_SILVER_THRESHOLD', 40),
  goldThreshold: getOptionalEnvInt('TIER_GOLD_THRESHOLD', 60),
  platinumThreshold: getOptionalEnvInt('TIER_PLATINUM_THRESHOLD', 75),
  diamondThreshold: getOptionalEnvInt('TIER_DIAMOND_THRESHOLD', 90),
  evaluationDays: getOptionalEnvInt('TIER_EVALUATION_DAYS', 30),
} as const);
