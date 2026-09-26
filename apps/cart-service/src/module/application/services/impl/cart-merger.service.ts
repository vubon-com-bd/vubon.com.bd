import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CartMergerServiceInterface } from '../interfaces/cart-merger.service.interface';
import type { CartMergerRepository } from '../../../domain/repositories/cart-merger.repository.interface';
import { CartMergerEntity } from '../../../domain/entities/cart-merger.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { MergeResponseDTO } from '../../dtos/responses/merge-response.dto';

@Injectable()
export class CartMergerService
  extends BaseService<CartMergerEntity, string>
  implements CartMergerServiceInterface
{
  readonly name = 'CartMergerService';

  constructor(
    @Inject('CartMergerRepository')
    private readonly mergerRepo: CartMergerRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByUser(userId: string): Promise<readonly MergeResponseDTO[]> {
    const entities = await this.mergerRepo.findByUserId(UserIdVO.create(userId));
    return entities.map((e) => ({
      success: true,
      sourceCartId: e.sourceCartId.value,
      targetCartId: e.targetCartId.value,
      itemsAdded: e.itemsAdded,
      itemsMerged: e.itemsMerged,
      conflicts: e.conflicts,
    }));
  }
}
