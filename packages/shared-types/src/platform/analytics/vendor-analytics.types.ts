import { BaseEntity } from '../../common/base.types';
import { Vendor } from '../../business/vendor/vendor.types';
import { VENDOR_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/vendor-analytics.constants';

export interface VendorAnalytics extends BaseEntity {
  analyticsId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_ANALYTICS.TYPES | string;
  metric: keyof typeof VENDOR_ANALYTICS.METRICS | string;
  value: number;
  indicator: keyof typeof VENDOR_ANALYTICS.PERFORMANCE_INDICATORS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
