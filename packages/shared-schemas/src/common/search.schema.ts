import { z } from 'zod';
import { FilterSchema } from './filter.schema';
import { SortSchema } from './sort.schema';

export const SearchSchema = z.object({
  query: z.string().min(1).max(100),
  filters: z.array(FilterSchema).optional(),
  sort: z.array(SortSchema).optional(),
  fields: z.array(z.string()).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  offset: z.number().int().min(0).optional(),
});

export const SearchParamSchema = z.object({
  q: z.string().min(1).max(100).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});
