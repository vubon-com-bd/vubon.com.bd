/**
 * Vendor Performance Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-performance.constants থেকে।
 */

import { z } from 'zod';
import {
  VENDOR_PERFORMANCE_METRIC,
  VENDOR_PERFORMANCE_GRADE,
} from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const VendorPerformanceMetricSchema = z.enum(
  Object.values(VENDOR_PERFORMANCE_METRIC) as [string, ...string[]]
);

export const VendorPerformanceGradeSchema = z.enum(
  Object.values(VENDOR_PERFORMANCE_GRADE) as [string, ...string[]]
);

export const VendorPerformanceMetricsSchema = z.object({
  metric: VendorPerformanceMetricSchema,
  value: z.number(),
  target: z.number(),
  grade: VendorPerformanceGradeSchema,
});

export const VendorPerformanceSchema = z.object({
  vendorId: UuidSchema,
  grade: VendorPerformanceGradeSchema,
  metrics: z.array(VendorPerformanceMetricsSchema).max(20),
  overallScore: z.number().min(0).max(100),
  evaluationPeriodStart: z.string().datetime(),
  evaluationPeriodEnd: z.string().datetime(),
  orderCount: z.number().int().nonnegative(),
  isSuspended: z.boolean(),
  warningIssued: z.boolean(),
  evaluatedAt: z.string().datetime(),
});

export type VendorPerformanceMetricSchemaType = z.infer<typeof VendorPerformanceMetricSchema>;
export type VendorPerformanceGradeSchemaType = z.infer<typeof VendorPerformanceGradeSchema>;
export type VendorPerformanceSchemaType = z.infer<typeof VendorPerformanceSchema>;
