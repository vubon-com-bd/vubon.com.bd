/**
 * Vendor Performance Schema
 * ভেন্ডর পারফরম্যান্স সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_PERFORMANCE } from '@vubon/shared-constants';

export const VendorPerformanceSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  period: z.enum(Object.values(VENDOR_PERFORMANCE.PERIODS) as [string, ...string[]]),
  date: z.date(),
  totalSales: z.number().min(0).default(0),
  totalOrders: z.number().int().min(0).default(0),
  totalRevenue: z.number().min(0).default(0),
  averageOrderValue: z.number().min(0).default(0),
  conversionRate: z.number().min(0).max(100).default(0),
  customerSatisfaction: z.number().min(0).max(100).default(0),
  productRating: z.number().min(0).max(5).default(0),
  orderCompletion: z.number().min(0).max(100).default(0),
  shippingTime: z.number().min(0).default(0),
  responseTime: z.number().min(0).default(0),
  metrics: z.record(z.number()).default({}),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorPerformanceCreateSchema = VendorPerformanceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorPerformanceUpdateSchema = VendorPerformanceCreateSchema.partial();

export type VendorPerformance = z.infer<typeof VendorPerformanceSchema>;
export type VendorPerformanceCreate = z.infer<typeof VendorPerformanceCreateSchema>;
export type VendorPerformanceUpdate = z.infer<typeof VendorPerformanceUpdateSchema>;
