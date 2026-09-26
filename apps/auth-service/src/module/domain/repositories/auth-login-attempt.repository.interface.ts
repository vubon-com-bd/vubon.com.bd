/**
 * AuthLoginAttemptRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthLoginAttemptEntity } from '../entities/auth-login-attempt.entity';
import { LoginAttemptIpVO } from '../value-objects/primitives/login-attempt-ip.vo';

export interface AuthLoginAttemptRepository
  extends BaseRepository<AuthLoginAttemptEntity, string> {
  countRecentFailures(
    email: string,
    ip: LoginAttemptIpVO,
    sinceEpochMs: number,
  ): Promise<number>;
  findRecentByUser(
    userId: UserId,
    limit: number,
  ): Promise<readonly AuthLoginAttemptEntity[]>;
  findByIp(
    ip: LoginAttemptIpVO,
    sinceEpochMs: number,
  ): Promise<readonly AuthLoginAttemptEntity[]>;
}
