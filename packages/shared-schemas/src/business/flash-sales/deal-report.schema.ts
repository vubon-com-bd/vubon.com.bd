import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { DEAL_REPORT } from '@vubon/shared-constants/src/business/flash-sales/deal-report.constants';
import { DealAnalyticsSchema } from './deal-analytics.schema';

const reportTypeKeys = Object.keys(DEAL_REPORT.TYPES) as [string, ...string[]];
const reportFormatKeys = Object.keys(DEAL_REPORT.REPORT_FORMATS) as [string, ...string[]];

export const DealReportSchema = BaseSchema.extend({
  reportId: z.string().uuid(),
  dealId: z.string().uuid(),
  type: z.enum(reportTypeKeys),
  format: z.enum(reportFormatKeys),
  data: z.array(DealAnalyticsSchema),
  summary: z.object({
    totalSales: z.number(),
    totalRevenue: z.number(),
    totalDiscount: z.number(),
    conversionRate: z.number(),
    averageOrderValue: z.number(),
    topProducts: z.array(
      z.object({
        productId: z.string().uuid(),
        name: z.string(),
        quantity: z.number(),
        revenue: z.number(),
      })
    ),
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
