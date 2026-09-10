import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { NOTIFICATION_REPORT } from '@vubon/shared-constants/src/platform/notification/notification-report.constants';
import { NotificationAnalyticsSchema } from './notification-analytics.schema';

const notificationReportTypeKeys = Object.keys(NOTIFICATION_REPORT.TYPES) as [string, ...string[]];
const notificationReportFormatKeys = Object.keys(NOTIFICATION_REPORT.REPORT_FORMATS) as [
  string,
  ...string[],
];

export const NotificationReportSchema = BaseSchema.extend({
  reportId: z.string().uuid(),
  type: z.enum(notificationReportTypeKeys),
  format: z.enum(notificationReportFormatKeys),
  analytics: z.array(NotificationAnalyticsSchema),
  summary: z.object({
    totalSent: z.number().int().min(0),
    totalDelivered: z.number().int().min(0),
    deliveryRate: z.number().min(0).max(100),
    openRate: z.number().min(0).max(100),
    clickRate: z.number().min(0).max(100),
    conversionRate: z.number().min(0).max(100),
    bounceRate: z.number().min(0).max(100),
    unsubscribeRate: z.number().min(0).max(100),
    channelPerformance: z.record(z.number()),
    typePerformance: z.record(z.number()),
  }),
  insights: z.array(
    z.object({
      type: z.string(),
      title: z.string(),
      description: z.string(),
      severity: z.enum(['info', 'warning', 'success', 'error']),
    })
  ),
  recommendations: z.array(z.string()),
  generatedAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
