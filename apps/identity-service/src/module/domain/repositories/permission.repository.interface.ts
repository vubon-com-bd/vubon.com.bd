/**
 * Permission Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { PermissionEntity } from '../entities/permission.entity.js';

export const PERMISSION_REPOSITORY = Symbol('PERMISSION_REPOSITORY');

export interface PermissionListFilter {
  readonly category?: string;
  readonly isSensitive?: boolean;
  readonly search?: string;
}

export interface PermissionListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'category' | 'name';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PermissionListFilter;
}

export interface PermissionPaginationResult {
  readonly items: readonly PermissionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface PermissionStats {
  readonly total: number;
  readonly sensitiveCount: number;
  readonly byCategory: Readonly<Record<string, number>>;
}

export interface PermissionRepository extends BaseRepository<PermissionEntity, string> {
  findByName(name: string): Promise<PermissionEntity | null>;
  findByCategory(category: string): Promise<readonly PermissionEntity[]>;
  findSensitive(): Promise<readonly PermissionEntity[]>;

  findPaginated(options: PermissionListOptions): Promise<PermissionPaginationResult>;
  getStats(): Promise<PermissionStats>;

  softDelete(id: string): Promise<void>;
}
