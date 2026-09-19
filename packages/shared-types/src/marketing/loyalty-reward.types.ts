/**
 * Loyalty Reward Types
 * @module shared-types/marketing
 */

import type { Money } from '../common/primitives';
import type { LoyaltyTierValue } from './loyalty-tier.types';

export type LoyaltyRewardTypeValue =
  | 'discount'
  | 'free_shipping'
  | 'free_product'
  | 'cashback'
  | 'points'
  | 'gift_card'
  | 'exclusive_access';

export interface LoyaltyReward {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly type: LoyaltyRewardTypeValue;
  readonly pointsCost: number;
  readonly value?: Money;
  readonly percent?: number;
  readonly currency?: string;
  readonly minimumTier?: LoyaltyTierValue;
  readonly isActive: boolean;
  readonly stock?: number;
  readonly expiresAt?: string;
  readonly createdAt: string;
}

export interface LoyaltyRewardRedemption {
  readonly id: string;
  readonly rewardId: string;
  readonly userId: string;
  readonly pointsSpent: number;
  readonly code?: string;
  readonly redeemedAt: string;
  readonly usedAt?: string;
  readonly expiresAt?: string;
}
