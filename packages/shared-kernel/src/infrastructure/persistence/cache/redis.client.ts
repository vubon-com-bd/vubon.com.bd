/**
 * Redis Client Type Re-export
 * @module shared-kernel/infrastructure/persistence/cache
 */
import type { Redis } from 'ioredis';

export type RedisClientType = Redis;

export interface RedisClientOptions {
  readonly url: string;
  readonly keyPrefix?: string;
  readonly db?: number;
  readonly maxRetriesPerRequest?: number;
  readonly enableReadyCheck?: boolean;
}
