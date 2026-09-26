/**
 * Loyalty Points Types
 * @module shared-types/marketing
 */

import type { LOYALTY_POINT_TYPE, LOYALTY_EARN_RULE } from '@vubon/shared-constants/marketing';
import type { UserId } from '../common/primitives';

export type LoyaltyPointTypeValue = (typeof LOYALTY_POINT_TYPE)[keyof typeof LOYALTY_POINT_TYPE];

export type LoyaltyEarnRuleValue = (typeof LOYALTY_EARN_RULE)[keyof typeof LOYALTY_EARN_RULE];

export interface LoyaltyPoints {
  readonly userId: UserId;
  readonly balance: number;
  readonly lifetimeEarned: number;
  readonly lifetimeRedeemed: number;
  readonly lifetimeExpired: number;
  readonly lastEarnedAt?: string;
  readonly lastRedeemedAt?: string;
  readonly expiresAt?: string;
  readonly updatedAt: string;
}

export interface LoyaltyPointsTransaction {
  readonly id: string;
  readonly userId: UserId;
  readonly type: LoyaltyPointTypeValue;
  readonly points: number;
  readonly balanceAfter: number;
  readonly rule?: LoyaltyEarnRuleValue;
  readonly reference?: string;
  readonly description?: string;
  readonly expiresAt?: string;
  readonly occurredAt: string;
}

export interface LoyaltyPointsAdjustment {
  readonly userId: UserId;
  readonly points: number;
  readonly reason: string;
  readonly adjustedBy: string;
}
