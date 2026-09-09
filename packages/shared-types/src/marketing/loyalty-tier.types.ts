import { TypeObject } from '../common/types.types';
import { LOYALTY_TIER } from '@vubon/shared-constants/src/marketing/loyalty-tier.constants';

export interface LoyaltyTier extends TypeObject {
  type: keyof typeof LOYALTY_TIER.TYPES | string;
  category: 'loyalty_tier';
  minPoints: number;
  discount: number;
  benefits: string[];
  isBasic: boolean;
  isSilver: boolean;
  isGold: boolean;
  isPlatinum: boolean;
  isDiamond: boolean;
}

export type LoyaltyTierKey = keyof typeof LOYALTY_TIER.TYPES;
