import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCartSummaryQuery } from './get-cart-summary.query';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { CartSummaryResponseDTO } from '../../dtos/responses/cart-summary-response.dto';
import { CartOperationFailedError } from '../../errors/cart.errors';

@QueryHandler(GetCartSummaryQuery)
export class GetCartSummaryHandler
  extends BaseQueryHandler<GetCartSummaryQuery, CartSummaryResponseDTO>
  implements IQueryHandler<GetCartSummaryQuery>
{
  readonly queryType = 'cart.get-summary';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
  ) { super(); }

  async execute(query: GetCartSummaryQuery): Promise<CartSummaryResponseDTO> {
    const entity = await this.cartRepo.findById(CartIdVO.create(query.cartId));
    if (!entity) throw new CartOperationFailedError('cart not found');
    return {
      success: true,
      summary: {
        cartId: entity.id.value,
        status: entity.status.value,
        itemCount: entity.itemCount,
        subtotal: entity.subtotal,
        discountTotal: entity.discountTotal,
        grandTotal: entity.grandTotal,
        currency: entity.currency,
        hasCoupon: false,
        hasVoucher: false,
      },
    };
  }
}
