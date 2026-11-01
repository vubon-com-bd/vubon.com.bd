/**
 * Auth Login Attempt Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthLoginAttemptServiceInterface, RecordAttemptInput } from '../interfaces/auth-login-attempt.service.interface.js';
import type { LoginAttemptRepository } from '../../../domain/repositories/login-attempt.repository.interface.js';
import { LOGIN_ATTEMPT_REPOSITORY } from '../../../domain/repositories/login-attempt.repository.interface.js';
import type { AuthLoginAttemptResponseDTO } from '../../dtos/responses/auth-login-attempt-response.dto.js';

@Injectable()
export class AuthLoginAttemptService extends BaseService implements AuthLoginAttemptServiceInterface {
  readonly name = 'AuthLoginAttemptService';

  constructor(
    @Inject(LOGIN_ATTEMPT_REPOSITORY) private readonly repo: LoginAttemptRepository,
  ) {
    super();
  }

  async record(input: RecordAttemptInput): Promise<AuthLoginAttemptResponseDTO> {
    const now = new Date().toISOString();
    return {
      id: Math.random().toString(36).slice(2),
      identifier: input.identifier,
      status: input.status,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      failureReason: input.failureReason,
      attemptedAt: now,
    };
  }

  async listRecent(identifier: string, windowSeconds: number): Promise<readonly AuthLoginAttemptResponseDTO[]> {
    const attempts = await this.repo.findRecent(identifier, windowSeconds);
    return attempts.map((a) => ({
      id: a.id,
      identifier: a.identifier.normalized,
      status: a.status.value,
      ipAddress: a.ipAddress?.value,
      userAgent: a.userAgent?.value,
      failureReason: a.failureReason,
      attemptedAt: a.attemptedAt,
    }));
  }

  async countRecent(identifier: string, windowSeconds: number): Promise<number> {
    return this.repo.countRecent(identifier, windowSeconds);
  }
}
