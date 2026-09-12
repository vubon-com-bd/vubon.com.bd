import { BaseEntity } from '../common/base.types';
import { LOYALTY_REWARD } from '@vubon/shared-constants/src/marketing/loyalty-reward.constants';
import { Loyalty } from './loyalty.types';

export interface LoyaltyReward extends BaseEntity {
  rewardId: string;
  loyaltyId: string;
  loyalty: Loyalty;
  type: keyof typeof LOYALTY_REWARD.TYPES | string;
  value: unknown;
  pointsCost: number;
  discount: number;
  isActive: boolean;
  isRedeemed: boolean;
  redeemedAt?: Date;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
