/**
 * Loyalty Tier Types
 * @module shared-types/marketing
 */

import type { LOYALTY_TIER } from '@vubon/shared-constants/marketing';

export type LoyaltyTierValue = (typeof LOYALTY_TIER)[keyof typeof LOYALTY_TIER];

export interface LoyaltyTierMetadata {
  readonly value: LoyaltyTierValue;
  readonly label: string;
  readonly minPoints: number;
  readonly maxPoints: number | null;
  readonly earnMultiplier: number;
}

export interface LoyaltyTierHistory {
  readonly userId: string;
  readonly previousTier: LoyaltyTierValue;
  readonly newTier: LoyaltyTierValue;
  readonly reason: string;
  readonly changedAt: string;
}
