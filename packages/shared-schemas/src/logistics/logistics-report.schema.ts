import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { LOGISTICS_REPORT } from '@vubon/shared-constants/src/logistics/logistics-report.constants';
import { LogisticsAnalyticsSchema } from './logistics-analytics.schema';

const reportTypeKeys = Object.keys(LOGISTICS_REPORT.TYPES) as [string, ...string[]];
const reportFormatKeys = Object.keys(LOGISTICS_REPORT.REPORT_FORMATS) as [string, ...string[]];

export const LogisticsReportSchema = BaseSchema.extend({
  reportId: z.string().uuid(),
  logisticsId: z.string().uuid(),
  type: z.enum(reportTypeKeys),
  format: z.enum(reportFormatKeys),
  analytics: z.array(LogisticsAnalyticsSchema),
  summary: z.object({
    totalShipments: z.number().int().min(0),
    totalDeliveries: z.number().int().min(0),
    onTimeDelivery: z.number().min(0).max(100),
    averageDeliveryTime: z.number().min(0),
    totalCost: z.number().min(0),
    courierPerformance: z.record(z.number()),
    zonePerformance: z.record(z.number()),
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
