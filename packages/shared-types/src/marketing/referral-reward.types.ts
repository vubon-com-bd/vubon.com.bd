import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { REFERRAL_REWARD } from '@vubon/shared-constants/src/marketing/referral-reward.constants';
import { Referral } from './referral.types';
import { LoyaltyPoints } from './loyalty-points.types';

export interface ReferralReward extends BaseEntity {
  rewardId: string;
  referralId: string;
  referral: Referral;
  type: keyof typeof REFERRAL_REWARD.TYPES | string;
  referrerAmount: Money;
  refereeAmount: Money;
  totalAmount: Money;
  points: LoyaltyPoints;
  isClaimed: boolean;
  claimedAt?: Date;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
