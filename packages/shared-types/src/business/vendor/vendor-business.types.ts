import { BaseEntity } from '../../common/base.types';
import { VENDOR_BUSINESS } from '@vubon/shared-constants/src/business/vendor/vendor-business.constants';
import { Vendor } from './vendor.types';

export interface VendorBusiness extends BaseEntity {
  businessId: string;
  vendorId: string;
  vendor: Vendor;
  name: string;
  type: keyof typeof VENDOR_BUSINESS.TYPES | string;
  registrationNumber: string;
  taxId: string;
  foundedYear: number;
  employeeCount: number;
  annualRevenue?: number;
  businessSector: string[];
  businessSize: keyof typeof VENDOR_BUSINESS.BUSINESS_SIZE | string;
  isVerified: boolean;
  metadata: Record<string, unknown>;
}
