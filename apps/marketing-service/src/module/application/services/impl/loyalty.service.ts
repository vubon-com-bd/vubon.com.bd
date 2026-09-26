import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { LoyaltyServiceInterface } from '../interfaces/loyalty.service.interface';
import type { LoyaltyRepository } from '../../../domain/repositories/loyalty.repository.interface';
import { LoyaltyEntity } from '../../../domain/entities/loyalty.entity';
import { LoyaltyPointsVO } from '../../../domain/value-objects/primitives/loyalty-points.vo';
import { LoyaltyTierVO } from '../../../domain/value-objects/primitives/loyalty-tier.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { LoyaltyNotFoundAppError, InsufficientPointsAppError } from '../../errors/loyalty.errors';
import type { LoyaltyResponseDTO } from '../../dtos/responses/loyalty-response.dto';

@Injectable()
export class LoyaltyService
  extends BaseService<LoyaltyEntity, string>
  implements LoyaltyServiceInterface
{
  readonly name = 'LoyaltyService';

  constructor(
    private readonly repo: LoyaltyRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByUser(userId: string): Promise<LoyaltyResponseDTO | null> {
    const entity = await this.repo.findByUser(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async earnPoints(userId: string, points: number): Promise<LoyaltyResponseDTO> {
    const entity = await this.repo.findByUser(UserIdVO.create(userId));
    if (!entity) throw new LoyaltyNotFoundAppError(userId);
    const updated = entity.earnPoints(points);
    await this.repo.save(updated);
    const events = updated.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(updated);
  }

  async redeemPoints(userId: string, points: number): Promise<LoyaltyResponseDTO> {
    const entity = await this.repo.findByUser(UserIdVO.create(userId));
    if (!entity) throw new LoyaltyNotFoundAppError(userId);
    if (entity.points.value < points) {
      throw new InsufficientPointsAppError(entity.points.value, points);
    }
    const updated = entity.redeemPoints(points);
    await this.repo.save(updated);
    const events = updated.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(updated);
  }

  async upgradeTier(userId: string, targetTier: string): Promise<LoyaltyResponseDTO> {
    const entity = await this.repo.findByUser(UserIdVO.create(userId));
    if (!entity) throw new LoyaltyNotFoundAppError(userId);
    const updated = entity.upgradeTier(LoyaltyTierVO.create(targetTier));
    await this.repo.save(updated);
    const events = updated.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(updated);
  }

  private toDTO(entity: LoyaltyEntity): LoyaltyResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      points: entity.points.value,
      tier: entity.tier.value,
      status: entity.status.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as LoyaltyResponseDTO;
  }

  // avoid unused warning
  private _unused(): LoyaltyPointsVO | null { return null; }
}
