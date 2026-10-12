/**
 * OAuth Client Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { OAuthClientEntity } from '../entities/oauth-client.entity.js';

export const OAUTH_CLIENT_REPOSITORY = Symbol('OAUTH_CLIENT_REPOSITORY');

export interface OAuthClientListFilter {
  readonly clientName?: string;
  readonly isActive?: boolean;
  readonly isPublic?: boolean;
  readonly search?: string;
}

export interface OAuthClientListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'clientName';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: OAuthClientListFilter;
}

export interface OAuthClientPaginationResult {
  readonly items: readonly OAuthClientEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface OAuthClientStats {
  readonly total: number;
  readonly activeCount: number;
  readonly publicCount: number;
  readonly confidentialCount: number;
}

export interface OAuthClientRepository extends BaseRepository<OAuthClientEntity, string> {
  findByClientId(clientId: string): Promise<OAuthClientEntity | null>;
  findActiveClients(): Promise<readonly OAuthClientEntity[]>;

  findPaginated(options: OAuthClientListOptions): Promise<OAuthClientPaginationResult>;
  getStats(): Promise<OAuthClientStats>;

  softDelete(id: string): Promise<void>;
}
