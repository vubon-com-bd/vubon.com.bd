import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { TRAFFIC_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/traffic-analytics.constants';

const trafficAnalyticsTypeKeys = Object.keys(TRAFFIC_ANALYTICS.TYPES) as [string, ...string[]];
const trafficAnalyticsMetricKeys = Object.keys(TRAFFIC_ANALYTICS.METRICS) as [string, ...string[]];
const trafficAnalyticsSourceKeys = Object.keys(TRAFFIC_ANALYTICS.SOURCE_TYPES) as [
  string,
  ...string[],
];
const trafficAnalyticsDeviceKeys = Object.keys(TRAFFIC_ANALYTICS.DEVICE_TYPES) as [
  string,
  ...string[],
];

export const TrafficAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(trafficAnalyticsTypeKeys),
  metric: z.enum(trafficAnalyticsMetricKeys),
  value: z.number(),
  source: z.enum(trafficAnalyticsSourceKeys),
  device: z.enum(trafficAnalyticsDeviceKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
