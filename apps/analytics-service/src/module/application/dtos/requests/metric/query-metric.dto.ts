import { z } from 'zod';
import {
  ANALYTICS_METRIC,
  ANALYTICS_PERIOD,
} from '@vubon/shared-constants/platform/analytics';

export const QueryMetricSchema = z
  .object({
    metricNames: z
      .array(z.enum(Object.values(ANALYTICS_METRIC) as [string, ...string[]]))
      .min(1, 'At least one metric required')
      .max(50, 'Too many metrics (max 50)'),
    period: z.enum(Object.values(ANALYTICS_PERIOD) as [string, ...string[]]).optional(),
    fromDate: z.string().datetime().optional(),
    toDate: z.string().datetime().optional(),
    dimensions: z.array(z.string().min(1).max(50)).max(10).optional(),
    filters: z
      .array(
        z.object({
          field: z.string().min(1).max(100),
          operator: z.enum(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'nin']),
          value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
        }),
      )
      .max(20)
      .optional(),
  })
  .strict()
  .refine(
    (d) => {
      if (d.fromDate && d.toDate) {
        return new Date(d.toDate).getTime() >= new Date(d.fromDate).getTime();
      }
      return true;
    },
    'toDate must be >= fromDate',
  );

export type QueryMetricDTO = z.infer<typeof QueryMetricSchema>;
