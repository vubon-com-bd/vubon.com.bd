import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { LOYALTY_STATUS } from '@vubon/shared-constants/src/marketing/loyalty-status.constants';
import { LoyaltyPoints } from './loyalty-points.types';
import { LoyaltyTier } from './loyalty-tier.types';
import { LoyaltyReward } from './loyalty-reward.types';

export interface Loyalty extends BaseEntity {
  loyaltyId: string;
  userId: string;
  user: User;
  status: keyof typeof LOYALTY_STATUS | string;
  points: LoyaltyPoints;
  tier: LoyaltyTier;
  rewards: LoyaltyReward[];
  totalPointsEarned: number;
  totalPointsSpent: number;
  availablePoints: number;
  lifetimeValue: number;
  joinDate: Date;
  lastActivityDate: Date;
  tierUpgradeDate?: Date;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
