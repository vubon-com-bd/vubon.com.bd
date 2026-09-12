import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { REFERRAL_STATUS } from '@vubon/shared-constants/src/marketing/referral-status.constants';
import { ReferralReward } from './referral-reward.types';

export interface Referral extends BaseEntity {
  referralId: string;
  code: string;
  referrerId: string;
  referrer: User;
  refereeId: string;
  referee: User;
  status: keyof typeof REFERRAL_STATUS | string;
  reward: ReferralReward;
  isCompleted: boolean;
  isExpired: boolean;
  expiresAt: Date;
  completedAt?: Date;
  metadata: Record<string, unknown>;
}
