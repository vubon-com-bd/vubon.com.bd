import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthLoginAttemptServiceInterface } from '../interfaces/auth-login-attempt.service.interface';
import type { AuthLoginAttemptRepository } from '../../../domain/repositories/auth-login-attempt.repository.interface';
import { AuthLoginAttemptEntity } from '../../../domain/entities/auth-login-attempt.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { LoginAttemptIpVO } from '../../../domain/value-objects/primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../../../domain/value-objects/primitives/login-attempt-status.vo';

@Injectable()
export class AuthLoginAttemptService
  extends BaseService<AuthLoginAttemptEntity, string>
  implements AuthLoginAttemptServiceInterface
{
  readonly name = 'AuthLoginAttemptService';

  constructor(
    @Inject('AuthLoginAttemptRepository') private readonly attemptRepo: AuthLoginAttemptRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async record(input: {
    userId: string | null;
    email: string | null;
    ip: string;
    userAgent: string;
    status: string;
  }): Promise<void> {
    const entity = AuthLoginAttemptEntity.create({
      userId: input.userId ? UserIdVO.create(input.userId) : null,
      email: input.email,
      ip: LoginAttemptIpVO.create(input.ip),
      userAgent: input.userAgent,
      status: LoginAttemptStatusVO.create(input.status),
      attemptedAt: new Date(),
    });
    await this.attemptRepo.save(entity);
  }

  async countRecent(userId: string, windowMs: number): Promise<number> {
    const since = new Date(Date.now() - windowMs).toISOString();
    const attempts = await this.attemptRepo.findByUser(UserIdVO.create(userId));
    return attempts.filter((a) => a.attemptedAt.toISOString() >= since).length;
  }
}
