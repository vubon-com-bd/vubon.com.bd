/**
 * Loyalty Core Types
 * @module shared-types/marketing
 */

import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';
import type { LoyaltyStatusValue } from './loyalty-status.types';
import type { LoyaltyTierValue } from './loyalty-tier.types';
import type { LoyaltyPoints } from './loyalty-points.types';

export interface Loyalty extends BaseEntity<string> {
  readonly userId: UserId;
  readonly status: LoyaltyStatusValue;
  readonly tier: LoyaltyTierValue;
  readonly points: LoyaltyPoints;
  readonly tierExpiresAt?: string;
  readonly isEnrolled: boolean;
  readonly enrolledAt: string;
  readonly lastTierChangeAt?: string;
}

export interface LoyaltyPublic {
  readonly userId: UserId;
  readonly status: LoyaltyStatusValue;
  readonly tier: LoyaltyTierValue;
  readonly points: number;
  readonly tierExpiresAt?: string;
}

export interface LoyaltyListFilter {
  readonly status?: LoyaltyStatusValue;
  readonly tier?: LoyaltyTierValue;
  readonly minPoints?: number;
  readonly maxPoints?: number;
  readonly search?: string;
}
