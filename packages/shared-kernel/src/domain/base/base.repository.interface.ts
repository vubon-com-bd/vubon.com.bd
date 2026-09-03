import { Entity } from './base.entity';

/**
 * Base Repository Interface
 * রিপোজিটরির বেস ইন্টারফেস
 */
export interface IRepository<T extends Entity<unknown>> {
  save(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  count(): Promise<number>;
}

export interface IRepositoryWithSoftDelete<T extends Entity<unknown>> extends IRepository<T> {
  findDeleted(): Promise<T[]>;
  restore(id: string): Promise<void>;
  permanentlyDelete(id: string): Promise<void>;
}

export interface IRepositoryWithPagination<T extends Entity<unknown>> {
  findPaginated(page: number, limit: number): Promise<{ items: T[]; total: number }>;
  findPaginatedWithFilters(
    page: number,
    limit: number,
    filters: Record<string, unknown>
  ): Promise<{ items: T[]; total: number }>;
}

export interface IRepositoryWithSearch<T extends Entity<unknown>> {
  search(query: string): Promise<T[]>;
  searchPaginated(
    query: string,
    page: number,
    limit: number
  ): Promise<{ items: T[]; total: number }>;
}
