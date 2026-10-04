/**
 * Cache Schema
 * @module shared-schemas/infrastructure
 *
 * Values আসে shared-constants/infrastructure/cache.constants থেকে।
 */

import { z } from 'zod';
import { CACHE_PREFIX, CACHE_TTL } from '@vubon/shared-constants/infrastructure';

export const CachePrefixSchema = z.enum(Object.values(CACHE_PREFIX) as [string, ...string[]]);

export const CacheTtlSchema = z
  .number()
  .int()
  .min(1, 'TTL must be at least 1 second')
  .max(CACHE_TTL.THIRTY_DAYS, 'TTL exceeds maximum');

export const CacheEntrySchema = z.object({
  key: z.string().min(1).max(512),
  value: z.unknown(),
  ttl: z.number().int().positive(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  hits: z.number().int().nonnegative().optional(),
});

export const CacheOptionsSchema = z.object({
  ttl: CacheTtlSchema.optional(),
  prefix: z.union([CachePrefixSchema, z.string().min(1).max(50)]).optional(),
  tags: z.array(z.string().min(1).max(50)).max(20).optional(),
  staleWhileRevalidate: z.boolean().optional(),
});

export const CacheStatsSchema = z.object({
  hits: z.number().int().nonnegative(),
  misses: z.number().int().nonnegative(),
  keys: z.number().int().nonnegative(),
  memory: z.number().nonnegative(),
  hitRate: z.number().min(0).max(1),
});

export const CacheSetOptionsSchema = CacheOptionsSchema.extend({
  nx: z.boolean().optional(),
  xx: z.boolean().optional(),
  keepTtl: z.boolean().optional(),
});

export type CachePrefixSchemaType = z.infer<typeof CachePrefixSchema>;
export type CacheTtlSchemaType = z.infer<typeof CacheTtlSchema>;
export type CacheEntrySchemaType = z.infer<typeof CacheEntrySchema>;
export type CacheOptionsSchemaType = z.infer<typeof CacheOptionsSchema>;
export type CacheStatsSchemaType = z.infer<typeof CacheStatsSchema>;
export type CacheSetOptionsSchemaType = z.infer<typeof CacheSetOptionsSchema>;
