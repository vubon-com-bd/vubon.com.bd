import { BaseEntity } from '../../common/base.types';
import { VENDOR_VERIFICATION } from '@vubon/shared-constants/src/business/vendor/vendor-verification.constants';
import { Vendor } from './vendor.types';

export interface VendorVerification extends BaseEntity {
  verificationId: string;
  vendorId: string;
  vendor: Vendor;
  level: keyof typeof VENDOR_VERIFICATION.VERIFICATION_LEVELS | string;
  status: keyof typeof VENDOR_VERIFICATION.STATUS | string;
  documents: string[];
  verifiedBy: string;
  verifiedAt?: Date;
  rejectedAt?: Date;
  rejectedReason?: string;
  expiresAt?: Date;
  metadata: Record<string, unknown>;
}
