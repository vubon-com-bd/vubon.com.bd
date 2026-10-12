/**
 * MFA Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { MfaEntity } from '../entities/mfa.entity.js';
import type { MfaIdVO } from '../value-objects/primitives/mfa-id.vo.js';
import type { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';

export const MFA_REPOSITORY = Symbol('MFA_REPOSITORY');

export interface MfaListFilter {
  readonly authId?: string;
  readonly method?: string;
  readonly enabled?: boolean;
  readonly verified?: boolean;
}

export interface MfaListOptions {
  readonly page: number;
  readonly limit: number;
  readonly filter?: MfaListFilter;
}

export interface MfaPaginationResult {
  readonly items: readonly MfaEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface MfaStats {
  readonly total: number;
  readonly enabledCount: number;
  readonly byMethod: Readonly<Record<string, number>>;
  readonly byVerified: { readonly yes: number; readonly no: number };
}

export interface MfaRepository extends BaseRepository<MfaEntity, string> {
  findByIdVO(id: MfaIdVO): Promise<MfaEntity | null>;
  findByAuthId(authId: AuthIdVO): Promise<readonly MfaEntity[]>;
  findPrimaryByAuthId(authId: AuthIdVO): Promise<MfaEntity | null>;
  findEnabledByAuthId(authId: AuthIdVO): Promise<MfaEntity | null>;

  findPaginated(options: MfaListOptions): Promise<MfaPaginationResult>;
  getStats(): Promise<MfaStats>;

  // Cron support
  findUnverified(olderThanHours: number): Promise<readonly MfaEntity[]>;
  findFailing(threshold: number): Promise<readonly MfaEntity[]>;

  softDelete(id: string): Promise<void>;
}
