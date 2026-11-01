/**
 * Search Index Schema
 * @module shared-schemas/platform/search
 *
 * Values আসে shared-constants/platform/search-index.constants থেকে।
 */

import { z } from 'zod';
import { SEARCH_INDEX_TYPE, SEARCH_INDEX_STATUS } from '@vubon/shared-constants/platform';

export const SearchIndexTypeSchema = z.enum(
  Object.values(SEARCH_INDEX_TYPE) as [string, ...string[]]
);

export const SearchIndexStatusSchema = z.enum(
  Object.values(SEARCH_INDEX_STATUS) as [string, ...string[]]
);

export const SearchIndexSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  type: SearchIndexTypeSchema,
  status: SearchIndexStatusSchema,
  documentCount: z.number().int().nonnegative(),
  shards: z.number().int().positive().max(100),
  replicas: z.number().int().nonnegative().max(10),
  sizeBytes: z.number().int().nonnegative(),
  lastBuiltAt: z.string().datetime().optional(),
  lastUpdatedAt: z.string().datetime().optional(),
  isActive: z.boolean(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const SearchIndexStatsSchema = z.object({
  type: SearchIndexTypeSchema,
  documentCount: z.number().int().nonnegative(),
  sizeBytes: z.number().int().nonnegative(),
  lastBuiltAt: z.string().datetime().optional(),
  buildDurationMs: z.number().int().nonnegative().optional(),
});

export type SearchIndexTypeSchemaType = z.infer<typeof SearchIndexTypeSchema>;
export type SearchIndexStatusSchemaType = z.infer<typeof SearchIndexStatusSchema>;
export type SearchIndexSchemaType = z.infer<typeof SearchIndexSchema>;
export type SearchIndexStatsSchemaType = z.infer<typeof SearchIndexStatsSchema>;
