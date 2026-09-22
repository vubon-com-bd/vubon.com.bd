import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCartQuery } from './get-cart.query';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { CartOperationFailedError } from '../../errors/cart.errors';

@QueryHandler(GetCartQuery)
export class GetCartHandler
  extends BaseQueryHandler<GetCartQuery, CartResponseDTO>
  implements IQueryHandler<GetCartQuery>
{
  readonly queryType = 'cart.get';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
  ) { super(); }

  async execute(query: GetCartQuery): Promise<CartResponseDTO> {
    const entity = await this.cartRepo.findById(CartIdVO.create(query.cartId));
    if (!entity) throw new CartOperationFailedError('cart not found');
    return {
      success: true,
      cart: {
        id: entity.id.value,
        userId: entity.userId?.value,
        type: entity.type.value,
        status: entity.status.value,
        itemCount: entity.itemCount,
        subtotal: entity.subtotal,
        discountTotal: entity.discountTotal,
        taxTotal: entity.taxTotal,
        shippingTotal: entity.shippingTotal,
        grandTotal: entity.grandTotal,
        currency: entity.currency,
        items: [],
      },
    };
  }
}
