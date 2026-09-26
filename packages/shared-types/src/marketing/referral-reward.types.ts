/**
 * Referral Reward Types
 * @module shared-types/marketing
 */

import type { REFERRAL_REWARD_TYPE, REFERRAL_TYPE } from '@vubon/shared-constants/marketing';
import type { Money } from '../common/primitives';

export type ReferralRewardTypeValue =
  (typeof REFERRAL_REWARD_TYPE)[keyof typeof REFERRAL_REWARD_TYPE];

export type ReferralTypeValue = (typeof REFERRAL_TYPE)[keyof typeof REFERRAL_TYPE];

export interface ReferralReward {
  readonly type: ReferralRewardTypeValue;
  readonly amount?: Money;
  readonly percent?: number;
  readonly points?: number;
  readonly currency?: string;
  readonly expiresAt?: string;
}

export interface ReferralRewardGrant {
  readonly referralId: string;
  readonly userId: string;
  readonly reward: ReferralReward;
  readonly grantedAt: string;
  readonly expiresAt?: string;
  readonly claimedAt?: string;
}
