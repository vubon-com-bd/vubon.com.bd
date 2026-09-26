import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListItemsQuery } from './list-items.query';
import type { CartItemRepository } from '../../../domain/repositories/cart-item.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { CartItemResponseDTO } from '../../dtos/responses/cart-item-response.dto';

@QueryHandler(ListItemsQuery)
export class ListItemsHandler
  extends BaseQueryHandler<ListItemsQuery, readonly CartItemResponseDTO[]>
  implements IQueryHandler<ListItemsQuery>
{
  readonly queryType = 'cart.item.list';

  constructor(
    @Inject('CartItemRepository')
    private readonly itemRepo: CartItemRepository,
  ) { super(); }

  async execute(query: ListItemsQuery): Promise<readonly CartItemResponseDTO[]> {
    const entities = await this.itemRepo.findByCartId(CartIdVO.create(query.cartId));
    return entities.map((e) => ({
      id: e.id.value,
      cartId: query.cartId,
      productId: e.productId.value,
      variantId: e.variantId?.value,
      vendorId: e.vendorId?.value,
      quantity: e.quantity.quantity,
      unitPrice: e.unitPrice,
      totalPrice: e.totalPrice,
      currency: e.currency,
      status: e.status.value,
      note: e.note?.value,
      selected: e.selected,
    }));
  }
}
