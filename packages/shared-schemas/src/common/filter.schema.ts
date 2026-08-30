/**
 * Filter Schema
 *
 * This module defines Zod schemas for advanced filtering, search,
 * and query building used across all API endpoints.
 *
 * @module FilterSchema
 */

import { z } from 'zod';
import { dateSchema, uuidSchema } from './core-primitives.schema';

// ============================================================
// 1. Filter Operators & Constants
// ============================================================

export const FILTER_OPERATORS = {
  EQ: 'eq',
  NEQ: 'neq',
  GT: 'gt',
  GTE: 'gte',
  LT: 'lt',
  LTE: 'lte',
  LIKE: 'like',
  ILIKE: 'ilike',
  STARTS_WITH: 'startsWith',
  ENDS_WITH: 'endsWith',
  IN: 'in',
  NIN: 'nin',
  IS_NULL: 'isNull',
  IS_NOT_NULL: 'isNotNull',
  BETWEEN: 'between',
  IS_TRUE: 'isTrue',
  IS_FALSE: 'isFalse',
} as const;

export type FilterOperator = (typeof FILTER_OPERATORS)[keyof typeof FILTER_OPERATORS];

export const FILTER_OPERATOR_LABELS: Record<FilterOperator, string> = {
  [FILTER_OPERATORS.EQ]: 'Equals',
  [FILTER_OPERATORS.NEQ]: 'Not Equals',
  [FILTER_OPERATORS.GT]: 'Greater Than',
  [FILTER_OPERATORS.GTE]: 'Greater Than or Equal',
  [FILTER_OPERATORS.LT]: 'Less Than',
  [FILTER_OPERATORS.LTE]: 'Less Than or Equal',
  [FILTER_OPERATORS.LIKE]: 'Contains (case sensitive)',
  [FILTER_OPERATORS.ILIKE]: 'Contains (case insensitive)',
  [FILTER_OPERATORS.STARTS_WITH]: 'Starts With',
  [FILTER_OPERATORS.ENDS_WITH]: 'Ends With',
  [FILTER_OPERATORS.IN]: 'In Array',
  [FILTER_OPERATORS.NIN]: 'Not In Array',
  [FILTER_OPERATORS.IS_NULL]: 'Is Null',
  [FILTER_OPERATORS.IS_NOT_NULL]: 'Is Not Null',
  [FILTER_OPERATORS.BETWEEN]: 'Between',
  [FILTER_OPERATORS.IS_TRUE]: 'Is True',
  [FILTER_OPERATORS.IS_FALSE]: 'Is False',
} as const;

// ============================================================
// 2. Core Filter Schemas
// ============================================================

export const filterSchema = z.object({
  field: z.string().min(1, 'Field name is required'),
  operator: z.enum([
    FILTER_OPERATORS.EQ,
    FILTER_OPERATORS.NEQ,
    FILTER_OPERATORS.GT,
    FILTER_OPERATORS.GTE,
    FILTER_OPERATORS.LT,
    FILTER_OPERATORS.LTE,
    FILTER_OPERATORS.LIKE,
    FILTER_OPERATORS.ILIKE,
    FILTER_OPERATORS.STARTS_WITH,
    FILTER_OPERATORS.ENDS_WITH,
    FILTER_OPERATORS.IN,
    FILTER_OPERATORS.NIN,
    FILTER_OPERATORS.IS_NULL,
    FILTER_OPERATORS.IS_NOT_NULL,
    FILTER_OPERATORS.BETWEEN,
    FILTER_OPERATORS.IS_TRUE,
    FILTER_OPERATORS.IS_FALSE,
  ]),
  value: z.unknown().optional(),
  negate: z.boolean().default(false),
});

export const strictFilterSchema = <T extends string>(allowedFields: T[]) =>
  filterSchema.extend({
    field: z.enum(allowedFields as [T, ...T[]]),
  });

export const typedFilterSchema = z.discriminatedUnion('operator', [
  z.object({
    field: z.string(),
    operator: z.enum([
      FILTER_OPERATORS.EQ,
      FILTER_OPERATORS.NEQ,
      FILTER_OPERATORS.LIKE,
      FILTER_OPERATORS.ILIKE,
      FILTER_OPERATORS.STARTS_WITH,
      FILTER_OPERATORS.ENDS_WITH,
    ]),
    value: z.string(),
    negate: z.boolean().default(false),
  }),
  z.object({
    field: z.string(),
    operator: z.enum([
      FILTER_OPERATORS.EQ,
      FILTER_OPERATORS.NEQ,
      FILTER_OPERATORS.GT,
      FILTER_OPERATORS.GTE,
      FILTER_OPERATORS.LT,
      FILTER_OPERATORS.LTE,
    ]),
    value: z.number(),
    negate: z.boolean().default(false),
  }),
  z.object({
    field: z.string(),
    operator: z.enum([FILTER_OPERATORS.IN, FILTER_OPERATORS.NIN]),
    value: z.array(z.unknown()).min(1, 'Array must have at least one value'),
    negate: z.boolean().default(false),
  }),
  z.object({
    field: z.string(),
    operator: z.enum([
      FILTER_OPERATORS.EQ,
      FILTER_OPERATORS.NEQ,
      FILTER_OPERATORS.GT,
      FILTER_OPERATORS.GTE,
      FILTER_OPERATORS.LT,
      FILTER_OPERATORS.LTE,
      FILTER_OPERATORS.BETWEEN,
    ]),
    value: z.union([
      dateSchema,
      z
        .tuple([dateSchema, dateSchema])
        .refine(
          ([start, end]: [Date | string, Date | string]) => new Date(start) <= new Date(end),
          {
            message: 'Start date must be before end date',
          }
        ),
    ]),
    negate: z.boolean().default(false),
  }),
  z.object({
    field: z.string(),
    operator: z.enum([FILTER_OPERATORS.IS_NULL, FILTER_OPERATORS.IS_NOT_NULL]),
    value: z.undefined().optional(),
    negate: z.boolean().default(false),
  }),
  z.object({
    field: z.string(),
    operator: z.enum([FILTER_OPERATORS.IS_TRUE, FILTER_OPERATORS.IS_FALSE]),
    value: z.undefined().optional(),
    negate: z.boolean().default(false),
  }),
]);

// ============================================================
// 3. Filter Group Schemas (Recursive fix)
// ============================================================

// Base filter group type (without self-reference)
const filterGroupBase = z.object({
  operator: z.enum(['and', 'or']).default('and'),
  filters: z.array(z.union([filterSchema, z.any()])),
});

// Self-referential filter group
export const filterGroupSchema: z.ZodTypeAny = z.lazy(() =>
  z.object({
    operator: z.enum(['and', 'or']).default('and'),
    filters: z.array(z.union([filterSchema, filterGroupSchema])),
  })
);

export const strictFilterGroupSchema = <T extends string>(allowedFields: T[]): z.ZodTypeAny =>
  z.lazy(() =>
    z.object({
      operator: z.enum(['and', 'or']).default('and'),
      filters: z.array(
        z.union([strictFilterSchema(allowedFields), strictFilterGroupSchema(allowedFields)])
      ),
    })
  );

// ============================================================
// 4. Search Filter Schemas
// ============================================================

export const searchFilterSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  fields: z.array(z.string()).min(1, 'At least one search field is required'),
  operator: z.enum(['and', 'or']).default('and'),
  caseSensitive: z.boolean().default(false),
  fuzzy: z.boolean().default(false),
  minScore: z.number().min(0).max(1).optional(),
});

export const strictSearchFilterSchema = <T extends string>(allowedFields: T[]) =>
  searchFilterSchema.extend({
    fields: z.array(z.enum(allowedFields as [T, ...T[]])),
  });

export const searchQuerySchema = z.object({
  q: z.string().optional(),
  fields: z.array(z.string()).optional(),
  operator: z.enum(['and', 'or']).default('and'),
  fuzzy: z.boolean().default(false),
  caseSensitive: z.boolean().default(false),
});

// ============================================================
// 5. Advanced Filter Schemas
// ============================================================

export const advancedFilterSchema = z.object({
  filters: z.array(filterGroupSchema).optional(),
  search: searchFilterSchema.optional(),
  status: z.string().optional(),
  dateRange: z
    .object({
      from: dateSchema.optional(),
      to: dateSchema.optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  ids: z.array(uuidSchema).optional(),
  excludeIds: z.array(uuidSchema).optional(),
  userId: uuidSchema.optional(),
  adminId: uuidSchema.optional(),
  custom: z.record(z.unknown()).optional(),
});

export const advancedFilterWithPaginationSchema = advancedFilterSchema.extend({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// ============================================================
// 6. Helper Functions
// ============================================================

export const sanitizeFilterValue = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return value.replace(/[<>{}]/g, '').trim();
  }
  return value;
};

export const sanitizedFilterValueSchema = z
  .unknown()
  .transform((val: unknown) => sanitizeFilterValue(val));

export const normalizeDateFilter = z
  .union([z.string(), z.date()])
  .transform((val: string | Date) => {
    if (val instanceof Date) {
      return val.toISOString();
    }
    return val;
  });

// ============================================================
// 7. Type Inferences
// ============================================================

export type Filter = z.infer<typeof filterSchema>;
export type StrictFilter<T extends string> = z.infer<ReturnType<typeof strictFilterSchema<T>>>;
export type TypedFilter = z.infer<typeof typedFilterSchema>;

export type FilterGroup = z.infer<typeof filterGroupSchema>;
export type StrictFilterGroup<T extends string> = z.infer<
  ReturnType<typeof strictFilterGroupSchema<T>>
>;

export type SearchFilter = z.infer<typeof searchFilterSchema>;
export type StrictSearchFilter<T extends string> = z.infer<
  ReturnType<typeof strictSearchFilterSchema<T>>
>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;

export type AdvancedFilter = z.infer<typeof advancedFilterSchema>;
export type AdvancedFilterWithPagination = z.infer<typeof advancedFilterWithPaginationSchema>;

// ============================================================
// 8. Default Export
// ============================================================

export default {
  FILTER_OPERATORS,
  FILTER_OPERATOR_LABELS,
  filterSchema,
  strictFilterSchema,
  typedFilterSchema,
  filterGroupSchema,
  strictFilterGroupSchema,
  searchFilterSchema,
  strictSearchFilterSchema,
  searchQuerySchema,
  advancedFilterSchema,
  advancedFilterWithPaginationSchema,
  sanitizeFilterValue,
  sanitizedFilterValueSchema,
  normalizeDateFilter,
};
