import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_REPORT } from '@vubon/shared-constants/src/business/vendor/vendor-report.constants';
import { VendorPerformanceSchema } from './vendor-performance.schema';
import { VendorActivitySchema } from './vendor-activity.schema';

const vendorReportTypeKeys = Object.keys(VENDOR_REPORT.TYPES) as [string, ...string[]];
const vendorReportFormatKeys = Object.keys(VENDOR_REPORT.REPORT_FORMATS) as [string, ...string[]];

export const VendorReportSchema = BaseSchema.extend({
  reportId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorReportTypeKeys),
  format: z.enum(vendorReportFormatKeys),
  performance: VendorPerformanceSchema,
  activities: z.array(VendorActivitySchema),
  summary: z.object({
    totalSales: z.number(),
    totalRevenue: z.number(),
    totalOrders: z.number(),
    averageRating: z.number(),
    reviewCount: z.number(),
    fulfillmentRate: z.number(),
    customerSatisfaction: z.number(),
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
