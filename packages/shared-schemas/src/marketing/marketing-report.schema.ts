import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MARKETING_REPORT } from '@vubon/shared-constants/src/marketing/marketing-report.constants';
import { MarketingAnalyticsSchema } from './marketing-analytics.schema';

const marketingReportTypeKeys = Object.keys(MARKETING_REPORT.TYPES) as [string, ...string[]];
const marketingReportFormatKeys = Object.keys(MARKETING_REPORT.REPORT_FORMATS) as [
  string,
  ...string[],
];

export const MarketingReportSchema = BaseSchema.extend({
  reportId: z.string().uuid(),
  type: z.enum(marketingReportTypeKeys),
  format: z.enum(marketingReportFormatKeys),
  analytics: z.array(MarketingAnalyticsSchema),
  summary: z.object({
    totalCampaigns: z.number().int().min(0),
    activeCampaigns: z.number().int().min(0),
    totalRevenue: z.number().min(0),
    totalCost: z.number().min(0),
    totalRoi: z.number().min(0),
    topChannels: z.record(z.number()),
    topCampaigns: z.record(z.number()),
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
