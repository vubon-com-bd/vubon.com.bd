import { BaseEntity } from '../../common/base.types';
import { VENDOR_SUPPORT } from '@vubon/shared-constants/src/business/vendor/vendor-support.constants';
import { Vendor } from './vendor.types';

export interface VendorSupport extends BaseEntity {
  supportId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_SUPPORT.TYPES | string;
  channel: keyof typeof VENDOR_SUPPORT.SUPPORT_CHANNELS | string;
  priority: keyof typeof VENDOR_SUPPORT.SUPPORT_PRIORITY | string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  resolvedAt?: Date;
  metadata: Record<string, unknown>;
}
