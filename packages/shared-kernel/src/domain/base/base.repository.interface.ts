/**
 * Base Repository Interface
 * @module shared-kernel/domain/base
 *
 * Values আসে shared-types থেকে (type only)।
 */
import type { BaseEntity } from '@vubon/shared-types/common';

export interface BaseRepository<TEntity extends BaseEntity<TId>, TId = string> {
  findById(id: TId): Promise<TEntity | null>;
  findAll(): Promise<readonly TEntity[]>;
  save(entity: TEntity): Promise<TEntity>;
  delete(id: TId): Promise<void>;
  exists(id: TId): Promise<boolean>;
}

export interface PaginatedRepository<
  TEntity extends BaseEntity<TId>,
  TId = string,
> extends BaseRepository<TEntity, TId> {
  findPaginated(
    page: number,
    limit: number
  ): Promise<{
    readonly items: readonly TEntity[];
    readonly total: number;
  }>;
}

export interface RepositoryQueryOptions {
  readonly limit?: number;
  readonly offset?: number;
  readonly orderBy?: string;
  readonly orderDirection?: 'asc' | 'desc';
  readonly includeDeleted?: boolean;
}
