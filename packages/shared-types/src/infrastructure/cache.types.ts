/**
 * Cache Types
 * @module shared-types/infrastructure
 *
 * Values আসে shared-constants/infrastructure/cache.constants থেকে।
 */

import type { CACHE_PREFIX, CACHE_TTL } from '@vubon/shared-constants/infrastructure';

export type CachePrefix = (typeof CACHE_PREFIX)[keyof typeof CACHE_PREFIX];
export type CacheTtl = (typeof CACHE_TTL)[keyof typeof CACHE_TTL];

export interface CacheEntry<T = unknown> {
  readonly key: string;
  readonly value: T;
  readonly ttl: number;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly hits?: number;
}

export interface CacheOptions {
  readonly ttl?: number;
  readonly prefix?: CachePrefix | string;
  readonly tags?: readonly string[];
  readonly staleWhileRevalidate?: boolean;
}

export interface CacheStats {
  readonly hits: number;
  readonly misses: number;
  readonly keys: number;
  readonly memory: number;
  readonly hitRate: number;
}

export interface CacheSetOptions extends CacheOptions {
  readonly nx?: boolean;
  readonly xx?: boolean;
  readonly keepTtl?: boolean;
}
