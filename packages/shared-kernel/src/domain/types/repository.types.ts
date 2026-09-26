/**
 * Repository Types
 * @module shared-kernel/domain/types
 *
 * References base types (type only)।
 */
import type { Identifiable, Versioned, Timestamped } from './base.types';

export interface RepositoryFilter {
  readonly field: string;
  readonly operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like';
  readonly value: unknown;
}

export interface RepositorySort {
  readonly field: string;
  readonly direction: 'asc' | 'desc';
}

export interface RepositoryPagination {
  readonly page: number;
  readonly limit: number;
}

export interface RepositoryFindOptions {
  readonly filters?: readonly RepositoryFilter[];
  readonly sorts?: readonly RepositorySort[];
  readonly pagination?: RepositoryPagination;
  readonly includeDeleted?: boolean;
}

export interface RepositoryEntity extends Identifiable, Timestamped, Partial<Versioned> {}

export interface RepositoryTransactionOptions {
  readonly timeoutMs?: number;
  readonly isolationLevel?:
    'read-uncommitted' | 'read-committed' | 'repeatable-read' | 'serializable';
}
