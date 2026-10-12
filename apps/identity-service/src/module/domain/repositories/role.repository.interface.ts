/**
 * Role Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { RoleEntity } from '../entities/role.entity.js';
import type { RoleIdVO } from '../value-objects/primitives/role-id.vo.js';

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');

export interface RoleListFilter {
  readonly name?: string;
  readonly isSystemRole?: boolean;
  readonly minLevel?: number;
  readonly maxLevel?: number;
  readonly search?: string;
}

export interface RoleListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'level' | 'name';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: RoleListFilter;
}

export interface RolePaginationResult {
  readonly items: readonly RoleEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface RoleStats {
  readonly total: number;
  readonly systemRoleCount: number;
  readonly byLevel: Readonly<Record<string, number>>;
}

export interface RoleRepository extends BaseRepository<RoleEntity, string> {
  findByIdVO(id: RoleIdVO): Promise<RoleEntity | null>;
  findByName(name: string): Promise<RoleEntity | null>;
  findSystemRoles(): Promise<readonly RoleEntity[]>;
  findWithPermission(permission: string): Promise<readonly RoleEntity[]>;

  findPaginated(options: RoleListOptions): Promise<RolePaginationResult>;
  getStats(): Promise<RoleStats>;

  softDelete(id: string): Promise<void>;
}
