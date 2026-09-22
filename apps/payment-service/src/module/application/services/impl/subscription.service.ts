import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SubscriptionServiceInterface } from '../interfaces/subscription.service.interface';
import type { SubscriptionRepository } from '../../../domain/repositories/subscription.repository.interface';
import { SubscriptionEntity } from '../../../domain/entities/subscription.entity';
import { SubscriptionIdVO } from '../../../domain/value-objects/primitives/subscription-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto';

@Injectable()
export class SubscriptionService
  extends BaseService<SubscriptionEntity, string>
  implements SubscriptionServiceInterface
{
  readonly name = 'SubscriptionService';

  constructor(
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listActiveByUser(userId: string): Promise<readonly SubscriptionResponseDTO[]> {
    const entities = await this.subscriptionRepo.findActiveByUser(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async findById(subscriptionId: string): Promise<SubscriptionResponseDTO | null> {
    const entity = await this.subscriptionRepo.findById(SubscriptionIdVO.create(subscriptionId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: SubscriptionEntity): SubscriptionResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      plan: entity.plan.value,
      status: entity.status.value,
      currentPeriodFrom: entity.currentPeriodFrom.toISOString(),
      currentPeriodTo: entity.currentPeriodTo.toISOString(),
      cancelledAt: entity.cancelledAt?.toISOString(),
      createdAt: entity.createdAt,
    };
  }
}
