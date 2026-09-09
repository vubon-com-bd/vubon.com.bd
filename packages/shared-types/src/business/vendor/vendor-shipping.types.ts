import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { SHIPPING_METHODS } from '@vubon/shared-constants/src/common/shipping-methods.constants';
import { VENDOR_SHIPPING } from '@vubon/shared-constants/src/business/vendor/vendor-shipping.constants';
import { Vendor } from './vendor.types';
import { VendorAddress } from './vendor-address.types';

export interface VendorShipping extends BaseEntity {
  shippingId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_SHIPPING.TYPES | string;
  method: keyof typeof SHIPPING_METHODS | string;
  cost: Money;
  freeShippingThreshold?: Money;
  estimatedDays: number;
  zones: string[];
  weightLimit?: number;
  isActive: boolean;
  isDefault: boolean;
  address: VendorAddress;
  metadata: Record<string, unknown>;
}
