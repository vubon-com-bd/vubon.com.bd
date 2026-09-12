import { Address } from '../../common/address.types';
import { VENDOR_ADDRESS } from '@vubon/shared-constants/src/business/vendor/vendor-address.constants';
import { Vendor } from './vendor.types';

export interface VendorAddress extends Address {
  addressId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_ADDRESS.TYPES | string;
  isDefault: boolean;
  isVerified: boolean;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
