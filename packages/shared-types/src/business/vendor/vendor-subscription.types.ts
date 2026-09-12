import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants/src/business/vendor/vendor-subscription.constants';
import { Vendor } from './vendor.types';
import { VendorTier } from './vendor-tier.types';

export interface VendorSubscription extends BaseEntity {
  subscriptionId: string;
  vendorId: string;
  vendor: Vendor;
  status: keyof typeof VENDOR_SUBSCRIPTION.STATUS | string;
  type: keyof typeof VENDOR_SUBSCRIPTION.SUBSCRIPTION_TYPES | string;
  tier: VendorTier;
  price: Money;
  startDate: Date;
  endDate: Date;
  trialEndDate?: Date;
  isActive: boolean;
  isAutoRenew: boolean;
  metadata: Record<string, unknown>;
}
