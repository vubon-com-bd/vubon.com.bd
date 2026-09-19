import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthAccountLockServiceInterface } from '../interfaces/auth-account-lock.service.interface';
import type { AuthAccountLockRepository } from '../../../domain/repositories/auth-account-lock.repository.interface';
import { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { AccountLockReasonVO } from '../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../domain/value-objects/primitives/account-lock-duration.vo';
import type { AuthAccountLockResponseDTO } from '../../dtos/responses/auth-account-lock-response.dto';

@Injectable()
export class AuthAccountLockService
  extends BaseService<AuthAccountLockEntity, string>
  implements AuthAccountLockServiceInterface
{
  readonly name = 'AuthAccountLockService';

  constructor(
    private readonly lockRepo: AuthAccountLockRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async lock(
    userId: string,
    reason: string,
    durationMs: number,
  ): Promise<AuthAccountLockResponseDTO> {
    const userIdVO = UserIdVO.create(userId);
    const entity = AuthAccountLockEntity.create({
      userId: userIdVO,
      reason: AccountLockReasonVO.create(reason),
      duration: AccountLockDurationVO.fromNow(durationMs),
      lockedAt: new Date(),
      unlockedAt: null,
    });
    await this.lockRepo.save(entity);
    await this.publishEvents(entity);
    return this.toDTO(entity, 0, undefined);
  }

  async unlock(userId: string, reason: string): Promise<void> {
    const userIdVO = UserIdVO.create(userId);
    const existing = await this.lockRepo.findActiveByUser(userIdVO);
    if (!existing) return;
    const unlocked = existing.unlock(reason);
    await this.lockRepo.save(unlocked);
    await this.publishEvents(unlocked);
  }

  async getActive(userId: string): Promise<AuthAccountLockResponseDTO | null> {
    const entity = await this.lockRepo.findActiveByUser(UserIdVO.create(userId));
    return entity ? this.toDTO(entity, 0, undefined) : null;
  }

  private toDTO(
    entity: AuthAccountLockEntity,
    attemptCount: number,
    ipAddress: string | undefined,
  ): AuthAccountLockResponseDTO {
    return {
      userId: entity.userId.value,
      reason: entity.reason.value,
      lockedUntil: new Date(entity.duration.epochMs).toISOString(),
      lockedAt: entity.lockedAt.toISOString(),
      attemptCount,
      ipAddress,
    };
  }

  private async publishEvents(entity: AuthAccountLockEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
