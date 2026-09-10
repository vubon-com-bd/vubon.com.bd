import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_PERFORMANCE } from '@vubon/shared-constants/src/business/vendor/vendor-performance.constants';

const vendorPerformanceTypeKeys = Object.keys(VENDOR_PERFORMANCE.TYPES) as [string, ...string[]];

export const VendorPerformanceSchema = BaseSchema.extend({
  performanceId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorPerformanceTypeKeys),
  score: z.number().min(0).max(100),
  metrics: z.object({
    totalOrders: z.number().int().min(0),
    totalRevenue: z.number().min(0),
    totalCommission: z.number().min(0),
    averageRating: z.number().min(0).max(5),
    reviewCount: z.number().int().min(0),
    fulfillmentRate: z.number().min(0).max(100),
    onTimeDelivery: z.number().min(0).max(100),
    customerSatisfaction: z.number().min(0).max(100),
  }),
  rating: z.number().min(0).max(5),
  period: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
