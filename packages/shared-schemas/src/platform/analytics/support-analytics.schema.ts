import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { TicketSchema } from '../../support/ticket.schema';
import { PLATFORM_SUPPORT_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/support-analytics.constants';

const supportAnalyticsMetricValues = Object.values(PLATFORM_SUPPORT_ANALYTICS.METRICS) as [
  string,
  ...string[],
];

export const SupportAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  ticketId: z.string().uuid(),
  ticket: TicketSchema,
  metric: z.enum(supportAnalyticsMetricValues),
  value: z.number(),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
