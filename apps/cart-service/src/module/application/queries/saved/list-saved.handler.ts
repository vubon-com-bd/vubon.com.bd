import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSavedQuery } from './list-saved.query';
import type { SavedForLaterRepository } from '../../../domain/repositories/saved-for-later.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { SavedForLaterResponseDTO } from '../../dtos/responses/saved-for-later-response.dto';

@QueryHandler(ListSavedQuery)
export class ListSavedHandler
  extends BaseQueryHandler<ListSavedQuery, readonly SavedForLaterResponseDTO[]>
  implements IQueryHandler<ListSavedQuery>
{
  readonly queryType = 'cart.saved.list';

  constructor(
    @Inject('SavedForLaterRepository')
    private readonly savedRepo: SavedForLaterRepository,
  ) { super(); }

  async execute(query: ListSavedQuery): Promise<readonly SavedForLaterResponseDTO[]> {
    const entities = await this.savedRepo.findByUserId(UserIdVO.create(query.userId));
    return entities.map((e) => ({
      id: e.id.value,
      userId: e.userId.value,
      productId: e.productId.value,
      variantId: e.variantId?.value,
      quantity: e.quantity,
      unitPrice: e.unitPrice,
      currency: e.currency,
      status: e.status.value,
    }));
  }
}
