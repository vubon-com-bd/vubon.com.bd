/**
 * Pagination Schemas
 * Zod schemas for paginated requests and responses
 */

import { z } from 'zod';
import { HTTP_STATUS } from '@vubon/shared-constants';
import type { PaginationParams, PaginationMeta } from '@vubon/shared-types';
import { httpStatusCodeSchema } from './status.schema';

/**
 * Pagination input type (all fields optional for validation)
 */
export type PaginationInput = {
  [K in keyof PaginationParams]?: PaginationParams[K];
};

/**
 * Pagination parameters schema
 */
export const paginationParamsSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
}) as z.ZodType<PaginationInput>;

/**
 * Pagination metadata schema
 */
export const paginationMetaSchema = z.object({
  currentPage: z.number().int().min(1),
  itemsPerPage: z.number().int().min(1),
  totalItems: z.number().int().min(0),
  totalPages: z.number().int().min(1),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  nextPage: z.number().int().optional(),
  previousPage: z.number().int().optional(),
}) as z.ZodType<PaginationMeta>;

/**
 * Paginated response schema
 */
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    status: httpStatusCodeSchema.default(HTTP_STATUS.OK),
    data: z.array(dataSchema),
    meta: paginationMetaSchema,
    message: z.string().default('Success'),
    timestamp: z
      .string()
      .datetime()
      .default(() => new Date().toISOString()),
  });

/**
 * Paginated request schema
 */
export const paginatedRequestSchema = z.object({
  pagination: paginationParamsSchema,
  filters: z.record(z.unknown()).optional(),
  options: z
    .object({
      includeDeleted: z.boolean().default(false),
      includeMeta: z.boolean().default(false),
    })
    .optional(),
});

/**
 * Create pagination meta helper
 */
export function createPaginationMeta(
  currentPage: number,
  itemsPerPage: number,
  totalItems: number
): PaginationMeta {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
    previousPage: currentPage > 1 ? currentPage - 1 : undefined,
  };
}

/**
 * Default pagination values
 */
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc' as const,
};

/**
 * Pagination limits
 */
export const PAGINATION_LIMITS = {
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 10,
} as const;

/**
 * Validate pagination params
 */
export function validatePaginationParams(params: Partial<PaginationParams>): PaginationParams {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(
    PAGINATION_LIMITS.MAX_LIMIT,
    Math.max(PAGINATION_LIMITS.MIN_LIMIT, params.limit || DEFAULT_PAGINATION.limit)
  );

  return {
    page,
    limit,
    sortBy: params.sortBy || DEFAULT_PAGINATION.sortBy,
    sortOrder: params.sortOrder || DEFAULT_PAGINATION.sortOrder,
    search: params.search,
  };
}
