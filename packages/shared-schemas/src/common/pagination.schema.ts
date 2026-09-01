import { z } from 'zod';

/**
 * Pagination Schema
 * পেজিনেশন স্কিমা
 */
export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
});

/**
 * Pagination Response Schema
 * পেজিনেশন রেসপন্স স্কিমা
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => {
  return z.object({
    items: z.array(itemSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    totalPages: z.number().int().nonnegative(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
  });
};

export type PaginationSchemaType = z.infer<typeof PaginationSchema>;
