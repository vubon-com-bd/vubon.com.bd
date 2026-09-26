/**
 * AuthTokenRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthTokenEntity } from '../entities/auth-token.entity';
import { TokenValueVO } from '../value-objects/primitives/token-value.vo';

export interface AuthTokenRepository extends BaseRepository<AuthTokenEntity, string> {
  findByValue(value: TokenValueVO): Promise<AuthTokenEntity | null>;
  findActiveBySubject(
    subjectId: string,
    type: string,
    now: number,
  ): Promise<readonly AuthTokenEntity[]>;
  revokeAllForSubject(subjectId: string, at: number): Promise<number>;
  deleteExpired(beforeEpochMs: number): Promise<number>;
}
