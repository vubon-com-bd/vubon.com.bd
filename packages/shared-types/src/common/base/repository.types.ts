/**
 * Repository Interface Types
 * @module shared-types/common/base
 *
 * ⚠️ Note: এখানে QueryOptions এর নাম RepositoryQueryOptions
 * কারণ common/query/-এ business QueryOptions আছে।
 */

export interface Repository<TEntity, TId = string> {
  findById(id: TId): Promise<TEntity | null>;
  findAll(): Promise<readonly TEntity[]>;
  save(entity: TEntity): Promise<TEntity>;
  delete(id: TId): Promise<void>;
  exists(id: TId): Promise<boolean>;
}

export interface PaginatedRepository<TEntity, TId = string> extends Repository<TEntity, TId> {
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

export interface TransactionContext {
  readonly id: string;
  readonly startedAt: string;
}
