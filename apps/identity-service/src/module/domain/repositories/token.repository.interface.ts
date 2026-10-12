/**
 * Token Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { TokenEntity } from '../entities/token.entity.js';
import type { TokenIdVO } from '../value-objects/primitives/token-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const TOKEN_REPOSITORY = Symbol('TOKEN_REPOSITORY');

export interface TokenListFilter {
  readonly userId?: string;
  readonly sessionId?: string;
  readonly type?: string;
  readonly jti?: string;
  readonly revoked?: boolean;
  readonly used?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface TokenListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'expiresAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: TokenListFilter;
}

export interface TokenPaginationResult {
  readonly items: readonly TokenEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface TokenStats {
  readonly total: number;
  readonly activeCount: number;
  readonly revokedCount: number;
  readonly byType: Readonly<Record<string, number>>;
}

export interface TokenRepository extends BaseRepository<TokenEntity, string> {
  findByIdVO(id: TokenIdVO): Promise<TokenEntity | null>;
  findByJti(jti: string): Promise<TokenEntity | null>;
  findByUserId(userId: UserIdVO): Promise<readonly TokenEntity[]>;
  findBySessionId(sessionId: string): Promise<readonly TokenEntity[]>;

  findPaginated(options: TokenListOptions): Promise<TokenPaginationResult>;
  getStats(userId?: string): Promise<TokenStats>;

  // Cron support
  findExpired(nowMs?: number): Promise<readonly TokenEntity[]>;
  findUnusedExpired(nowMs?: number): Promise<readonly TokenEntity[]>;

  revokeAllByUserId(userId: UserIdVO, reason: string): Promise<number>;
  revokeAllBySessionId(sessionId: string, reason: string): Promise<number>;
  purge(cutoffIso: string): Promise<number>;
  softDelete(id: string): Promise<void>;
}
