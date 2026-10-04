/**
 * Sort Schema
 * @module shared-schemas/common/query
 *
 * Values আসে shared-constants/common/sort.constants থেকে।
 */

import { z } from 'zod';
import { SORT_ORDER } from '@vubon/shared-constants/common';

export const SortOrderSchema = z.enum(Object.values(SORT_ORDER) as [string, ...string[]]);

export const SortFieldSchema = z
  .string()
  .trim()
  .min(1, 'Sort field is required')
  .max(64, 'Sort field is too long')
  .regex(/^[a-zA-Z][a-zA-Z0-9_.]*$/, 'Invalid sort field name');

export const SortQuerySchema = z.object({
  sortBy: SortFieldSchema.optional(),
  sortOrder: SortOrderSchema.optional().default(SORT_ORDER.ASC),
});

export const MultiSortQuerySchema = z.object({
  sorts: z
    .array(
      z.object({
        field: SortFieldSchema,
        order: SortOrderSchema,
      })
    )
    .max(5, 'Too many sort fields')
    .optional(),
});

export type SortOrderSchemaType = z.infer<typeof SortOrderSchema>;
export type SortFieldSchemaType = z.infer<typeof SortFieldSchema>;
export type SortQuerySchemaType = z.infer<typeof SortQuerySchema>;
export type MultiSortQuerySchemaType = z.infer<typeof MultiSortQuerySchema>;
