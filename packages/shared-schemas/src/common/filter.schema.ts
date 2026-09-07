import { z } from 'zod';

export const FilterSchema = z.object({
  field: z.string().min(1),
  operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'like', 'in', 'between']),
  value: z.unknown(),
});

export const FilterListSchema = z.object({
  filters: z.array(FilterSchema).optional(),
});
