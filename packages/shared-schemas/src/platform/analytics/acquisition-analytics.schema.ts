import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { ACQUISITION_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/acquisition-analytics.constants';

const acquisitionAnalyticsTypeKeys = Object.keys(ACQUISITION_ANALYTICS.TYPES) as [
  string,
  ...string[],
];
const acquisitionAnalyticsMetricKeys = Object.keys(ACQUISITION_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const acquisitionAnalyticsChannelKeys = Object.keys(ACQUISITION_ANALYTICS.ACQUISITION_CHANNELS) as [
  string,
  ...string[],
];

export const AcquisitionAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(acquisitionAnalyticsTypeKeys),
  metric: z.enum(acquisitionAnalyticsMetricKeys),
  value: z.number(),
  channel: z.enum(acquisitionAnalyticsChannelKeys),
  cost: MoneySchema,
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
