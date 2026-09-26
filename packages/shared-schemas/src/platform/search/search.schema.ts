/**
 * Search Core Schema
 * @module shared-schemas/platform/search
 *
 * Search entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { SearchTypeSchema, SearchScopeSchema } from './search-type.schema';
import { SearchSortSchema } from './search-sort.schema';
import { SearchFilterSchema } from './search-filter.schema';
import { SearchMatchSchema } from './search-match.schema';
import { SearchBoostSchema } from './search-boost.schema';
import { FacetSchema } from './facet.schema';

export const SearchRequestSchema = z.object({
  query: z.string().min(2).max(200),
  type: SearchTypeSchema.optional(),
  scope: SearchScopeSchema.optional(),
  fields: z.array(z.string().min(1).max(100)).max(50).optional(),
  filters: z.array(SearchFilterSchema).max(50).optional(),
  sorts: z.array(SearchSortSchema).max(10).optional(),
  boosts: z.array(SearchBoostSchema).max(20).optional(),
  matches: z.array(SearchMatchSchema).max(20).optional(),
  facets: z.array(z.string().max(100)).max(30).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().min(1).max(100).optional(),
  cursor: z.string().max(500).optional(),
  userId: UuidSchema.optional(),
  sessionId: z.string().max(128).optional(),
});

export const SearchResultSchema = z.object({
  items: z.array(z.unknown()).max(10000),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
  query: z.string().min(1).max(200),
  took: z.number().nonnegative(),
  maxScore: z.number().optional(),
  facets: z.array(FacetSchema).max(30).optional(),
  suggestions: z.array(z.string().max(200)).max(20).optional(),
  cached: z.boolean(),
});

export const SearchSchema = BaseEntitySchema.extend({
  query: z.string().min(1).max(200),
  type: SearchTypeSchema,
  scope: SearchScopeSchema,
  userId: UuidSchema.optional(),
  sessionId: z.string().max(128).optional(),
  resultCount: z.number().int().nonnegative(),
  took: z.number().nonnegative(),
  filters: z.array(SearchFilterSchema).max(50).optional(),
  sorts: z.array(SearchSortSchema).max(10).optional(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  hasResults: z.boolean(),
  clickedResultId: z.string().max(200).optional(),
  clickedAt: z.string().datetime().optional(),
  searchedAt: z.string().datetime(),
});

export const SearchPublicSchema = SearchSchema.pick({
  query: true,
  type: true,
  scope: true,
  resultCount: true,
  took: true,
  hasResults: true,
});

export const SearchListFilterSchema = z.object({
  userId: UuidSchema.optional(),
  type: SearchTypeSchema.optional(),
  scope: SearchScopeSchema.optional(),
  hasResults: z.boolean().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  query: z.string().max(200).optional(),
});

export type SearchRequestSchemaType = z.infer<typeof SearchRequestSchema>;
export type SearchResultSchemaType = z.infer<typeof SearchResultSchema>;
export type SearchSchemaType = z.infer<typeof SearchSchema>;
export type SearchPublicSchemaType = z.infer<typeof SearchPublicSchema>;
export type SearchListFilterSchemaType = z.infer<typeof SearchListFilterSchema>;
