/**
 * AuthLoginAttemptServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthLoginAttemptEntity } from '../../../domain/entities/auth-login-attempt.entity';
import type { AuthLoginAttemptResponseDTO } from '../../dtos/responses/auth-login-attempt-response.dto';

export interface AuthLoginAttemptServiceInterface
  extends BaseServiceInterface<AuthLoginAttemptEntity, string> {
  record(input: {
    userId?: UserId;
    email?: string;
    ip: string;
    userAgent: string;
    status: 'success' | 'failure' | 'blocked' | 'mfa_pending' | 'mfa_failed';
    failureReason?: string;
  }): Promise<AuthLoginAttemptEntity>;

  countRecentFailures(
    email: string,
    ip: string,
    windowMs: number,
  ): Promise<number>;

  getRecentForUser(
    userId: UserId,
    limit?: number,
  ): Promise<readonly AuthLoginAttemptEntity[]>;

  toResponse(attempt: AuthLoginAttemptEntity): AuthLoginAttemptResponseDTO;
}
