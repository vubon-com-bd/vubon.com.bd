import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { NOTIFICATION_ANALYTICS } from '@vubon/shared-constants/src/platform/notification/notification-analytics.constants';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/src/platform/notification/notification-status.constants';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/src/platform/notification/notification-type.constants';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/src/platform/notification/notification-channel.constants';

const notificationAnalyticsTypeKeys = Object.keys(NOTIFICATION_ANALYTICS.TYPES) as [
  string,
  ...string[],
];
const notificationAnalyticsMetricKeys = Object.keys(NOTIFICATION_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const notificationAnalyticsGranularityKeys = Object.keys(
  NOTIFICATION_ANALYTICS.ANALYTICS_GRANULARITY
) as [string, ...string[]];
const notificationStatusKeys = Object.keys(NOTIFICATION_STATUS) as [string, ...string[]];
const notificationTypeKeys = Object.keys(NOTIFICATION_TYPE.TYPES) as [string, ...string[]];
const notificationChannelKeys = Object.keys(NOTIFICATION_CHANNEL.TYPES) as [string, ...string[]];

export const NotificationAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(notificationAnalyticsTypeKeys),
  metric: z.enum(notificationAnalyticsMetricKeys),
  value: z.number(),
  status: z.enum(notificationStatusKeys),
  notificationType: z.enum(notificationTypeKeys),
  channel: z.enum(notificationChannelKeys),
  period: z.enum(notificationAnalyticsGranularityKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
