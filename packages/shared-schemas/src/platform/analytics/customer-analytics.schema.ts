import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { CUSTOMER_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/customer-analytics.constants';

const customerAnalyticsTypeKeys = Object.keys(CUSTOMER_ANALYTICS.TYPES) as [string, ...string[]];
const customerAnalyticsMetricKeys = Object.keys(CUSTOMER_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const customerAnalyticsSegmentKeys = Object.keys(CUSTOMER_ANALYTICS.CUSTOMER_SEGMENTS) as [
  string,
  ...string[],
];
const customerAnalyticsRfmKeys = Object.keys(CUSTOMER_ANALYTICS.RFM_ANALYSIS) as [
  string,
  ...string[],
];

export const CustomerAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(customerAnalyticsTypeKeys),
  metric: z.enum(customerAnalyticsMetricKeys),
  value: z.number(),
  segment: z.enum(customerAnalyticsSegmentKeys),
  rfm: z.enum(customerAnalyticsRfmKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
