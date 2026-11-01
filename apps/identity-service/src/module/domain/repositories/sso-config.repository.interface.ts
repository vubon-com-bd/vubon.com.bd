/**
 * SSO Config Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { SsoConfigEntity } from '../entities/sso-config.entity.js';

export const SSO_CONFIG_REPOSITORY = Symbol('SSO_CONFIG_REPOSITORY');

export interface SsoConfigListFilter {
  readonly name?: string;
  readonly provider?: string;
  readonly isActive?: boolean;
  readonly search?: string;
}

export interface SsoConfigListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: SsoConfigListFilter;
}

export interface SsoConfigPaginationResult {
  readonly items: readonly SsoConfigEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface SsoConfigStats {
  readonly total: number;
  readonly activeCount: number;
  readonly byProvider: Readonly<Record<string, number>>;
}

export interface SsoConfigRepository extends BaseRepository<SsoConfigEntity, string> {
  findByName(name: string): Promise<SsoConfigEntity | null>;
  findByProvider(provider: string): Promise<readonly SsoConfigEntity[]>;
  findActive(): Promise<readonly SsoConfigEntity[]>;

  findPaginated(options: SsoConfigListOptions): Promise<SsoConfigPaginationResult>;
  getStats(): Promise<SsoConfigStats>;

  softDelete(id: string): Promise<void>;
}
