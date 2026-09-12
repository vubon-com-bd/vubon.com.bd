import { z } from 'zod';
import { SORT } from '@vubon/shared-constants/src/common/sort.constants';

/**
 * Sort direction values — from SORT.ASC / SORT.DESC.
 */
const sortOrderValues = [SORT.ASC, SORT.DESC] as [string, ...string[]];

export const SortSchema = z.object({
  field: z.string().min(1),
  order: z.enum(sortOrderValues).default(SORT.ASC),
});

export const SortListSchema = z.object({
  sort: z.array(SortSchema).optional(),
});

export const SortParamSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(sortOrderValues).optional(),
});
