import { BaseEntity } from '../../common/base.types';
import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants/src/business/vendor/vendor-return-policy.constants';
import { Vendor } from './vendor.types';

export interface VendorReturnPolicy extends BaseEntity {
  policyId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_RETURN_POLICY.TYPES | string;
  windowDays: number;
  conditions: string[];
  restockingFee: number;
  shippingCost: keyof typeof VENDOR_RETURN_POLICY.RETURN_SHIPPING_COST | string;
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
