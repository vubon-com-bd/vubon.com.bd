import { BaseEntity } from '../common/base.types';
import { LOYALTY_POINTS } from '@vubon/shared-constants/src/marketing/loyalty-points.constants';
import { Loyalty } from './loyalty.types';

export interface LoyaltyPoints extends BaseEntity {
  pointsId: string;
  loyaltyId: string;
  loyalty: Loyalty;
  type: keyof typeof LOYALTY_POINTS.TYPES | string;
  amount: number;
  multiplier: number;
  totalPoints: number;
  minRedemption: number;
  maxPerTransaction: number;
  isActive: boolean;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
