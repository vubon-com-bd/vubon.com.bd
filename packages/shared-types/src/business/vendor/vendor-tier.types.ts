import { TypeObject } from '../../common/types.types';
import { VENDOR_TIER } from '@vubon/shared-constants/src/business/vendor/vendor-tier.constants';

export interface VendorTier extends TypeObject {
  type: keyof typeof VENDOR_TIER | string;
  category: 'vendor_tier';
  commissionRate: number;
  maxProducts: number;
  maxTeamMembers: number;
  prioritySupport: boolean;
  apiAccess: boolean;
  customBranding: boolean;
}

export type VendorTierKey = keyof typeof VENDOR_TIER;
