/**
 * AuthLoginAttemptService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthLoginAttemptServiceInterface } from '../interfaces/auth-login-attempt.service.interface';
import type { AuthLoginAttemptRepository } from '../../../domain/repositories/auth-login-attempt.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { AuthLoginAttemptEntity } from '../../../domain/entities/auth-login-attempt.entity';
import { LoginAttemptIpVO } from '../../../domain/value-objects/primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../../../domain/value-objects/primitives/login-attempt-status.vo';
import type { AuthLoginAttemptResponseDTO } from '../../dtos/responses/auth-login-attempt-response.dto';
import { ID_GENERATOR } from '../tokens';
import { AUTH_LOGIN_ATTEMPT_REPO } from '../../tokens';

@Injectable()
export class AuthLoginAttemptService
  extends BaseService<AuthLoginAttemptEntity, string>
  implements AuthLoginAttemptServiceInterface {
  readonly name = 'AuthLoginAttemptService';

  constructor(
    @Inject(AUTH_LOGIN_ATTEMPT_REPO)
    private readonly repo: AuthLoginAttemptRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async record(input: {
    userId?: UserId;
    email?: string;
    ip: string;
    userAgent: string;
    status: 'success' | 'failure' | 'blocked' | 'mfa_pending' | 'mfa_failed';
    failureReason?: string;
  }): Promise<AuthLoginAttemptEntity> {
    const now = Date.now();
    const entity = AuthLoginAttemptEntity.create({
      id: this.idGen.generate(),
      userId: input.userId,
      email: input.email,
      ip: LoginAttemptIpVO.of(input.ip),
      userAgent: input.userAgent,
      status: LoginAttemptStatusVO.of(input.status),
      attemptedAt: now,
      failureReason: input.failureReason,
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    });
    return this.repo.save(entity);
  }

  async countRecentFailures(
    email: string,
    ip: string,
    windowMs: number,
  ): Promise<number> {
    return this.repo.countRecentFailures(
      email,
      LoginAttemptIpVO.of(ip),
      Date.now() - windowMs,
    );
  }

  async getRecentForUser(
    userId: UserId,
    limit = 20,
  ): Promise<readonly AuthLoginAttemptEntity[]> {
    return this.repo.findRecentByUser(userId, limit);
  }

  toResponse(attempt: AuthLoginAttemptEntity): AuthLoginAttemptResponseDTO {
    const ipVal = attempt.ip.value;
    const masked =
      ipVal.length > 6
        ? `${ipVal.slice(0, 3)}.***.***.${ipVal.slice(-2)}`
        : '***';
    return {
      id: attempt.id,
      userId: attempt.userId,
      email: attempt.email,
      ipMasked: masked,
      userAgent: attempt.userAgent,
      status: attempt.status.value,
      attemptedAt: new Date(attempt.attemptedAt).toISOString(),
      failureReason: undefined,
    };
  }
}
