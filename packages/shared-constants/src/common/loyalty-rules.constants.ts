/**
 * Loyalty Rules Constants (numeric, calculator-only)
 * @module shared-constants/common/loyalty-rules
 *
 * Note: This is separate from `marketing/loyalty.constants` (LOYALTY),
 * which holds the full loyalty program (status, tiers, rewards, permissions).
 * This file holds only numeric rules used by the loyalty calculator.
 */

export const LOYALTY_RULES = {
  DEFAULT_MULTIPLIER: 1,
  POINT_VALUE: 0.01,
  MIN_REDEEM: 100,
  MAX_REDEEM_PER_ORDER: 5000,
  EXPIRY_DAYS: 365,
} as const;
