/**
 * Credential Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CredentialEntity } from '../entities/credential.entity.js';
import type { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';

export const CREDENTIAL_REPOSITORY = Symbol('CREDENTIAL_REPOSITORY');

export interface CredentialListFilter {
  readonly authId?: string;
  readonly mustChangePassword?: boolean;
  readonly expiredBefore?: string;
}

export interface CredentialListOptions {
  readonly page: number;
  readonly limit: number;
  readonly filter?: CredentialListFilter;
}

export interface CredentialPaginationResult {
  readonly items: readonly CredentialEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CredentialRepository extends BaseRepository<CredentialEntity, string> {
  findByAuthId(authId: AuthIdVO): Promise<CredentialEntity | null>;
  findByAuthIdRaw(authId: string): Promise<CredentialEntity | null>;

  findPaginated(options: CredentialListOptions): Promise<CredentialPaginationResult>;

  // Cron support
  findExpired(nowMs?: number): Promise<readonly CredentialEntity[]>;
  findMustChange(): Promise<readonly CredentialEntity[]>;

  softDelete(id: string): Promise<void>;
}
