/**
 * Redis Client Type Re-export
 * @module cart-service/infrastructure/persistence/redis
 */
import type { Redis } from 'ioredis';

export type CartRedisClient = Redis;

export interface CartRedisClientOptions {
  readonly url: string;
  readonly keyPrefix?: string;
  readonly db?: number;
  readonly maxRetriesPerRequest?: number;
  readonly enableReadyCheck?: boolean;
  readonly lazyConnect?: boolean;
}
