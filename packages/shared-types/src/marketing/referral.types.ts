/**
 * Referral Core Types
 * @module shared-types/marketing
 */

import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';
import type { ReferralStatusValue } from './referral-status.types';
import type { ReferralReward, ReferralTypeValue } from './referral-reward.types';

export interface Referral extends BaseEntity<string> {
  readonly referrerId: UserId;
  readonly refereeId?: UserId;
  readonly refereeEmail?: string;
  readonly code: string;
  readonly type: ReferralTypeValue;
  readonly status: ReferralStatusValue;
  readonly referrerReward?: ReferralReward;
  readonly refereeReward?: ReferralReward;
  readonly qualifyingOrderId?: string;
  readonly qualifyingAmount?: number;
  readonly currency: string;
  readonly expiresAt: string;
  readonly qualifiedAt?: string;
  readonly rewardedAt?: string;
}

export interface ReferralPublic {
  readonly id: string;
  readonly code: string;
  readonly status: ReferralStatusValue;
  readonly createdAt: string;
  readonly qualifiedAt?: string;
}

export interface ReferralListFilter {
  readonly referrerId?: UserId;
  readonly refereeId?: UserId;
  readonly status?: ReferralStatusValue;
  readonly type?: ReferralTypeValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
