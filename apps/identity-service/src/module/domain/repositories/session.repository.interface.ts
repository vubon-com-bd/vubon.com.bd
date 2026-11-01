/**
 * Session Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { SessionEntity } from '../entities/session.entity.js';
import type { SessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');

export interface SessionListFilter {
  readonly userId?: string;
  readonly authId?: string;
  readonly status?: string;
  readonly deviceId?: string;
  readonly ipAddress?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface SessionListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastAccessedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: SessionListFilter;
}

export interface SessionPaginationResult {
  readonly items: readonly SessionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface SessionStats {
  readonly total: number;
  readonly activeCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly averageDurationSeconds: number;
}

export interface SessionRepository extends BaseRepository<SessionEntity, string> {
  findByIdVO(id: SessionIdVO): Promise<SessionEntity | null>;
  findByUserId(userId: UserIdVO): Promise<readonly SessionEntity[]>;
  findActiveByUserId(userId: UserIdVO): Promise<readonly SessionEntity[]>;
  countActiveByUserId(userId: UserIdVO): Promise<number>;
  findByAuthId(authId: string): Promise<readonly SessionEntity[]>;

  findPaginated(options: SessionListOptions): Promise<SessionPaginationResult>;
  getStats(userId?: string, fromDate?: string, toDate?: string): Promise<SessionStats>;

  // Cron support
  findExpired(nowMs?: number): Promise<readonly SessionEntity[]>;
  findIdle(idleThresholdMs: number, nowMs?: number): Promise<readonly SessionEntity[]>;
  findOldestByUserId(userId: UserIdVO): Promise<SessionEntity | null>;

  revokeAllByUserId(userId: UserIdVO, reason: string): Promise<number>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
