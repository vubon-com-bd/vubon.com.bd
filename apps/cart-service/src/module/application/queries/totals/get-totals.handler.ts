import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTotalsQuery } from './get-totals.query';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import { CartNotFoundError } from '../../../domain/errors/cart.errors';

@QueryHandler(GetTotalsQuery)
export class GetTotalsHandler
  extends BaseQueryHandler<GetTotalsQuery, Readonly<Record<string, unknown>>>
  implements IQueryHandler<GetTotalsQuery>
{
  readonly queryType = 'totals.get';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
  ) {
    super();
  }

  async execute(query: GetTotalsQuery): Promise<Readonly<Record<string, unknown>>> {
    const cart = await this.cartRepo.findById(CartIdVO.create(query.cartId));
    if (!cart) throw new CartNotFoundError(query.cartId);
    return {
      itemCount: cart.itemCount,
      subtotal: cart.subtotal,
      discountTotal: cart.discountTotal,
      taxTotal: cart.taxTotal,
      shippingTotal: cart.shippingTotal,
      grandTotal: cart.grandTotal,
      currency: cart.currency,
    };
  }
}
