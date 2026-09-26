/**
 * AuthSessionRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthSessionEntity } from '../entities/auth-session.entity';
import { SessionTokenVO } from '../value-objects/primitives/session-token.vo';

export interface AuthSessionRepository extends BaseRepository<AuthSessionEntity, string> {
  findByToken(token: SessionTokenVO): Promise<AuthSessionEntity | null>;
  findActiveByUser(userId: UserId, now: number): Promise<readonly AuthSessionEntity[]>;
  revokeAllForUser(
    userId: UserId,
    at: number,
    reason?: string,
  ): Promise<number>;
  deleteExpired(beforeEpochMs: number): Promise<number>;
}
