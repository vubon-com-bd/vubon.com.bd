/**
 * Custom Query Request DTO
 * @module analytics-service/application/dtos/requests/query
 */
import { z } from 'zod';

const FilterConditionSchema = z.object({
  field: z.string().min(1).max(64),
  operator: z.enum([
    'equals',
    'not_equals',
    'contains',
    'starts_with',
    'ends_with',
    'greater_than',
    'greater_than_or_equal',
    'less_than',
    'less_than_or_equal',
    'in',
    'not_in',
    'between',
    'is_null',
    'is_not_null',
  ]),
  value: z.unknown(),
});

export const CustomQuerySchema = z.object({
  metrics: z.array(z.string().min(1).max(100)).min(1).max(50),
  dimensions: z.array(z.string().min(1).max(100)).max(10).optional(),
  filters: z.array(FilterConditionSchema).max(20).optional(),
  filterLogic: z.enum(['and', 'or']).default('and'),
  fromDate: z.string().datetime(),
  toDate: z.string().datetime(),
  limit: z.number().int().positive().max(100000).default(1000),
  sortBy: z.string().max(64).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type CustomQueryDto = z.input<typeof CustomQuerySchema>;
