import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FLASH_SALE_REPORT } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-report.constants';
import { FlashSaleAnalyticsSchema } from './flash-sale-analytics.schema';

const reportTypeKeys = Object.keys(FLASH_SALE_REPORT.TYPES) as [string, ...string[]];
const reportFormatKeys = Object.keys(FLASH_SALE_REPORT.REPORT_FORMATS) as [string, ...string[]];

export const FlashSaleReportSchema = BaseSchema.extend({
  reportId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  type: z.enum(reportTypeKeys),
  format: z.enum(reportFormatKeys),
  data: z.array(FlashSaleAnalyticsSchema),
  summary: z.object({
    totalSales: z.number(),
    totalRevenue: z.number(),
    totalParticipants: z.number(),
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
