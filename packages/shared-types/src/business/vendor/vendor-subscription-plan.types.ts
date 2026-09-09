import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { VENDOR_SUBSCRIPTION_PLAN } from '@vubon/shared-constants/src/business/vendor/vendor-subscription-plan.constants';
import { VendorFeature } from './vendor-feature.types';

export interface VendorSubscriptionPlan extends BaseEntity {
  planId: string;
  name: string;
  description?: string;
  tier: keyof typeof VENDOR_SUBSCRIPTION_PLAN.TYPES | string;
  price: Money;
  billingPeriod: 'monthly' | 'quarterly' | 'annual';
  features: VendorFeature[];
  maxProducts: number;
  maxTeamMembers: number;
  maxStorage: number;
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
