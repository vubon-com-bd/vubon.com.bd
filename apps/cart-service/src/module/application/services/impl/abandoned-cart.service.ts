import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AbandonedCartServiceInterface } from '../interfaces/abandoned-cart.service.interface';
import type { AbandonedCartRepository } from '../../../domain/repositories/abandoned-cart.repository.interface';
import { AbandonedCartEntity } from '../../../domain/entities/abandoned-cart.entity';
import { AbandonedCartIdVO } from '../../../domain/value-objects/primitives/abandoned-cart-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { AbandonedCartResponseDTO } from '../../dtos/responses/abandoned-cart-response.dto';

@Injectable()
export class AbandonedCartService
  extends BaseService<AbandonedCartEntity, string>
  implements AbandonedCartServiceInterface
{
  readonly name = 'AbandonedCartService';

  constructor(
    @Inject('AbandonedCartRepository')
    private readonly abandonedRepo: AbandonedCartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByUser(userId: string): Promise<readonly AbandonedCartResponseDTO[]> {
    const entities = await this.abandonedRepo.findByUserId(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async findById(abandonedId: string): Promise<AbandonedCartResponseDTO | null> {
    const entity = await this.abandonedRepo.findById(
      AbandonedCartIdVO.create(abandonedId),
    );
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: AbandonedCartEntity): AbandonedCartResponseDTO {
    return {
      id: entity.id.value,
      cartId: entity.cartId.value,
      userId: entity.userId?.value,
      itemCount: entity.itemCount,
      subtotalAmount: entity.subtotalAmount,
      currency: entity.currency,
      status: entity.status.value,
      reminderCount: entity.reminder.count,
      abandonedAt: entity.abandonedAt.toISOString(),
      recoveredAt: entity.recoveredAt?.toISOString(),
    };
  }
}
