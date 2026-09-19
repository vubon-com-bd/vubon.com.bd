/**
 * Base Cache Repository
 * @module shared-kernel/infrastructure/persistence/cache
 *
 * Uses RedisService for cache-backed storage.
 */
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { BaseRepository } from '../../../domain/base/base.repository.interface';
import type { BaseEntity } from '@vubon/shared-types/common';
import type { RedisService } from './redis.service';

export abstract class BaseCacheRepository<
  TEntity extends BaseEntity<TId>,
  TId = string,
> implements BaseRepository<TEntity, TId> {
  protected constructor(
    protected readonly redis: RedisService,
    protected readonly keyPrefix: string,
    protected readonly ttlSeconds: number = CACHE_TTL.ONE_HOUR
  ) {}

  abstract findById(id: TId): Promise<TEntity | null>;
  abstract findAll(): Promise<readonly TEntity[]>;
  abstract save(entity: TEntity): Promise<TEntity>;
  abstract delete(id: TId): Promise<void>;

  async exists(id: TId): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  protected keyFor(id: TId): string {
    return `${this.keyPrefix}:${String(id)}`;
  }
}
