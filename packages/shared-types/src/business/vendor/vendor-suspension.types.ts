import { BaseEntity } from '../../common/base.types';
import { VENDOR_SUSPENSION } from '@vubon/shared-constants/src/business/vendor/vendor-suspension.constants';
import { Vendor } from './vendor.types';

export interface VendorSuspension extends BaseEntity {
  suspensionId: string;
  vendorId: string;
  vendor: Vendor;
  status: keyof typeof VENDOR_SUSPENSION.STATUS | string;
  reason: keyof typeof VENDOR_SUSPENSION.SUSPENSION_REASONS | string;
  description: string;
  suspendedBy: string;
  suspendedAt: Date;
  liftedAt?: Date;
  duration: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
