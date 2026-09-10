import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { USER_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/user-analytics.constants';

const userAnalyticsTypeKeys = Object.keys(USER_ANALYTICS.TYPES) as [string, ...string[]];
const userAnalyticsMetricKeys = Object.keys(USER_ANALYTICS.METRICS) as [string, ...string[]];
const userAnalyticsRetentionPeriodKeys = Object.keys(USER_ANALYTICS.RETENTION_PERIODS) as [
  string,
  ...string[],
];

export const UserAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  type: z.enum(userAnalyticsTypeKeys),
  metric: z.enum(userAnalyticsMetricKeys),
  value: z.number(),
  period: z.enum(userAnalyticsRetentionPeriodKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
