import { z } from 'zod';
import { PAGINATION } from '@vubon/shared-constants/src/common/pagination.constants';
import { SORT } from '@vubon/shared-constants/src/common/sort.constants';
import { FilterSchema } from './filter.schema';
import { SortSchema } from './sort.schema';

const sortOrderValues = [SORT.ASC, SORT.DESC] as [string, ...string[]];

export const SearchSchema = z.object({
  query: z.string().min(1).max(100),
  filters: z.array(FilterSchema).optional(),
  sort: z.array(SortSchema).optional(),
  fields: z.array(z.string()).optional(),
  limit: z.number().int().min(PAGINATION.MIN_LIMIT).max(PAGINATION.MAX_LIMIT).optional(),
  offset: z.number().int().min(0).optional(),
});

export const SearchParamSchema = z.object({
  q: z.string().min(1).max(100).optional(),
  page: z.number().int().min(PAGINATION.DEFAULT_PAGE).optional(),
  limit: z.number().int().min(PAGINATION.MIN_LIMIT).max(PAGINATION.MAX_LIMIT).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(sortOrderValues).optional(),
});
