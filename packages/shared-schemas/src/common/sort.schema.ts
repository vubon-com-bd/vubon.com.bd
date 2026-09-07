import { z } from 'zod';

export const SortSchema = z.object({
  field: z.string().min(1),
  order: z.enum(['asc', 'desc']).default('asc'),
});

export const SortListSchema = z.object({
  sort: z.array(SortSchema).optional(),
});

export const SortParamSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});
