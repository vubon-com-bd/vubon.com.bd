import { BaseEntity } from '../../common/base.types';
import { VENDOR_ACTIVITY } from '@vubon/shared-constants/src/business/vendor/vendor-activity.constants';
import { Vendor } from './vendor.types';

export interface VendorActivity extends BaseEntity {
  activityId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_ACTIVITY.TYPES | string;
  severity: keyof typeof VENDOR_ACTIVITY.ACTIVITY_SEVERITY | string;
  description: string;
  data: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  performedBy: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
