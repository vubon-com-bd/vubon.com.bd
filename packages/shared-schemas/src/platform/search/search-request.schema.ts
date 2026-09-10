import { z } from 'zod';
import { PaginationSchema } from '../../common/pagination.schema';
import { SearchFilterSchema } from './search-filter.schema';
import { SearchSortSchema } from './search-sort.schema';
import { SearchOperatorSchema } from './search-operator.schema';
import { SearchMatchSchema } from './search-match.schema';

export const PlatformSearchRequestSchema = z.object({
  query: z.string().min(1).max(100),
  filters: z.array(SearchFilterSchema).optional(),
  sorts: z.array(SearchSortSchema).optional(),
  operators: z.array(SearchOperatorSchema).optional(),
  matches: z.array(SearchMatchSchema).optional(),
  pagination: PaginationSchema,
  fields: z.array(z.string()).optional(),
  highlight: z.boolean().optional(),
  fuzzy: z.boolean().optional(),
  minScore: z.number().min(0).max(1).optional(),
});

export const PlatformSearchParamSchema = z.object({
  q: z.string().min(1).max(100).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  filters: z.string().optional(),
});
