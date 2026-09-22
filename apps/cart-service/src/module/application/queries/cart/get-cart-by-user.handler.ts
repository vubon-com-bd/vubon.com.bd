import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCartByUserQuery } from './get-cart-by-user.query';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { CartOperationFailedError } from '../../errors/cart.errors';

@QueryHandler(GetCartByUserQuery)
export class GetCartByUserHandler
  extends BaseQueryHandler<GetCartByUserQuery, CartResponseDTO>
  implements IQueryHandler<GetCartByUserQuery>
{
  readonly queryType = 'cart.get-by-user';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
  ) { super(); }

  async execute(query: GetCartByUserQuery): Promise<CartResponseDTO> {
    const entity = await this.cartRepo.findActiveByUser(UserIdVO.create(query.userId));
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
