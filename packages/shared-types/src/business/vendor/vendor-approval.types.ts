import { BaseEntity } from '../../common/base.types';
import { VENDOR_APPROVAL } from '@vubon/shared-constants/src/business/vendor/vendor-approval.constants';
import { Vendor } from './vendor.types';

export interface VendorApproval extends BaseEntity {
  approvalId: string;
  vendorId: string;
  vendor: Vendor;
  status: keyof typeof VENDOR_APPROVAL.STATUS | string;
  reviewedBy: string;
  reviewedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectedReason?: string;
  conditions?: string[];
  notes?: string;
  metadata: Record<string, unknown>;
}
