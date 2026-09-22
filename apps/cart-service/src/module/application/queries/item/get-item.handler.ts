import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetItemQuery } from './get-item.query';
import type { CartItemRepository } from '../../../domain/repositories/cart-item.repository.interface';
import { CartItemIdVO } from '../../../domain/value-objects/primitives/cart-item-id.vo';
import type { CartItemResponseDTO } from '../../dtos/responses/cart-item-response.dto';
import { CartItemOperationFailedError } from '../../errors/cart-item.errors';

@QueryHandler(GetItemQuery)
export class GetItemHandler
  extends BaseQueryHandler<GetItemQuery, CartItemResponseDTO>
  implements IQueryHandler<GetItemQuery>
{
  readonly queryType = 'cart.item.get';

  constructor(
    @Inject('CartItemRepository')
    private readonly itemRepo: CartItemRepository,
  ) { super(); }

  async execute(query: GetItemQuery): Promise<CartItemResponseDTO> {
    const entity = await this.itemRepo.findById(CartItemIdVO.create(query.itemId));
    if (!entity) throw new CartItemOperationFailedError('item not found');
    return {
      id: entity.id.value,
      cartId: '',
      productId: entity.productId.value,
      variantId: entity.variantId?.value,
      vendorId: entity.vendorId?.value,
      quantity: entity.quantity.quantity,
      unitPrice: entity.unitPrice,
      totalPrice: entity.totalPrice,
      currency: entity.currency,
      status: entity.status.value,
      note: entity.note?.value,
      selected: entity.selected,
    };
  }
}
