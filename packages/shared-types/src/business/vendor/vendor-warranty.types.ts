import { BaseEntity } from '../../common/base.types';
import { VENDOR_WARRANTY } from '@vubon/shared-constants/src/business/vendor/vendor-warranty.constants';
import { Vendor } from './vendor.types';

export interface VendorWarranty extends BaseEntity {
  warrantyId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_WARRANTY.TYPES | string;
  periodDays: number;
  coverage: string[];
  exclusions: string[];
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
