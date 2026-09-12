import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VendorSchema } from '../../business/vendor/vendor.schema';
import { VENDOR_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/vendor-analytics.constants';

const vendorAnalyticsTypeKeys = Object.keys(VENDOR_ANALYTICS.TYPES) as [string, ...string[]];
const vendorAnalyticsMetricKeys = Object.keys(VENDOR_ANALYTICS.METRICS) as [string, ...string[]];
const vendorAnalyticsIndicatorKeys = Object.keys(VENDOR_ANALYTICS.PERFORMANCE_INDICATORS) as [
  string,
  ...string[],
];

export const PlatformVendorAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  vendorId: z.string().uuid(),
  vendor: VendorSchema,
  type: z.enum(vendorAnalyticsTypeKeys),
  metric: z.enum(vendorAnalyticsMetricKeys),
  value: z.number(),
  indicator: z.enum(vendorAnalyticsIndicatorKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
