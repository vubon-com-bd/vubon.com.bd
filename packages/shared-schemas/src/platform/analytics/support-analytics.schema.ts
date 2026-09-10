import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { TicketSchema } from '../../support/ticket.schema';
import { SUPPORT_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/support-analytics.constants';

const supportAnalyticsTypeKeys = Object.keys(SUPPORT_ANALYTICS.TYPES) as [string, ...string[]];
const supportAnalyticsMetricKeys = Object.keys(SUPPORT_ANALYTICS.METRICS) as [string, ...string[]];
const supportAnalyticsAgentPerformanceKeys = Object.keys(SUPPORT_ANALYTICS.AGENT_PERFORMANCE) as [
  string,
  ...string[],
];

export const SupportAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  ticketId: z.string().uuid(),
  ticket: TicketSchema,
  type: z.enum(supportAnalyticsTypeKeys),
  metric: z.enum(supportAnalyticsMetricKeys),
  value: z.number(),
  agentPerformance: z.enum(supportAnalyticsAgentPerformanceKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
