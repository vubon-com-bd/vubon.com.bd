/**
 * Filter Schemas
 * Zod schemas for filtering and sorting
 */

import { z } from 'zod';
import type { FilterParams } from '@vubon/shared-types';
import { sortOrderSchema } from './type.schema';

/**
 * Base filter schema (as ZodObject for extend support)
 */
const baseFilterSchema = z.object({
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: sortOrderSchema.optional(),
  page: z.number().int().min(1).default(1).optional(),
  limit: z.number().int().min(1).max(100).default(10).optional(),
});

/**
 * Base filter schema (as ZodType for type safety)
 */
export const filterSchema = baseFilterSchema as z.ZodType<FilterParams>;

/**
 * Date range filter schema
 */
export const dateRangeFilterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

/**
 * Status filter schema
 */
export const statusFilterSchema = z.object({
  status: z.string().optional(),
});

/**
 * ID filter schema
 */
export const idFilterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
});

/**
 * Generic filter schema builder
 * Uses the base ZodObject to support extend()
 */
export function createFilterSchema<T extends z.ZodRawShape>(fields: T) {
  return baseFilterSchema.extend(fields);
}

/**
 * Sort schema
 */
export const sortSchema = z.object({
  field: z.string(),
  order: sortOrderSchema,
});

/**
 * Multiple sort schema
 */
export const multiSortSchema = z.array(sortSchema);

/**
 * Search filter schema
 */
export const searchFilterSchema = z.object({
  query: z.string().min(1),
  fields: z.array(z.string()).optional(),
  fuzzy: z.boolean().default(false),
});
