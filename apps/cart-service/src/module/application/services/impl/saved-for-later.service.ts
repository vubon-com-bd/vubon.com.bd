import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SavedForLaterServiceInterface } from '../interfaces/saved-for-later.service.interface';
import type { SavedForLaterRepository } from '../../../domain/repositories/saved-for-later.repository.interface';
import { SavedForLaterEntity } from '../../../domain/entities/saved-for-later.entity';
import { SavedItemIdVO } from '../../../domain/value-objects/primitives/saved-item-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { SavedForLaterResponseDTO } from '../../dtos/responses/saved-for-later-response.dto';

@Injectable()
export class SavedForLaterService
  extends BaseService<SavedForLaterEntity, string>
  implements SavedForLaterServiceInterface
{
  readonly name = 'SavedForLaterService';

  constructor(
    @Inject('SavedForLaterRepository')
    private readonly savedRepo: SavedForLaterRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByUser(userId: string): Promise<readonly SavedForLaterResponseDTO[]> {
    const entities = await this.savedRepo.findByUserId(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async findById(savedItemId: string): Promise<SavedForLaterResponseDTO | null> {
    const entity = await this.savedRepo.findById(SavedItemIdVO.create(savedItemId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: SavedForLaterEntity): SavedForLaterResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      productId: entity.productId.value,
      variantId: entity.variantId?.value,
      quantity: entity.quantity,
      unitPrice: entity.unitPrice,
      currency: entity.currency,
      status: entity.status.value,
    };
  }
}
