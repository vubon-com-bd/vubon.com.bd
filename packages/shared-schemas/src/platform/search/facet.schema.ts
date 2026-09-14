/**
 * Facet Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/facet.constants থেকে।
 */

import { z } from 'zod';
import { FACET_TYPE, FACET_FIELD, FACET_SORT } from '@vubon/shared-constants/platform';

export const FacetTypeSchema = z.enum(Object.values(FACET_TYPE) as [string, ...string[]]);

export const FacetFieldSchema = z.enum(Object.values(FACET_FIELD) as [string, ...string[]]);

export const FacetSortSchema = z.enum(Object.values(FACET_SORT) as [string, ...string[]]);

export const FacetValueSchema = z.object({
  value: z.string().max(200),
  count: z.number().int().nonnegative(),
  selected: z.boolean(),
  from: z.number().optional(),
  to: z.number().optional(),
});

export const FacetSchema = z.object({
  field: z.union([FacetFieldSchema, z.string().min(1).max(100)]),
  type: FacetTypeSchema,
  label: z.string().min(1).max(200),
  values: z.array(FacetValueSchema).max(100),
  sort: FacetSortSchema.optional(),
  multiselect: z.boolean(),
});

export const FacetRequestSchema = z.object({
  fields: z.array(z.string().min(1).max(100)).min(1).max(30),
  query: z.string().max(200).optional(),
  maxValues: z.number().int().min(1).max(100).optional(),
});

export const FacetResponseSchema = z.object({
  facets: z.array(FacetSchema).max(30),
  took: z.number().nonnegative(),
});

export type FacetTypeSchemaType = z.infer<typeof FacetTypeSchema>;
export type FacetFieldSchemaType = z.infer<typeof FacetFieldSchema>;
export type FacetSortSchemaType = z.infer<typeof FacetSortSchema>;
export type FacetSchemaType = z.infer<typeof FacetSchema>;
export type FacetResponseSchemaType = z.infer<typeof FacetResponseSchema>;
