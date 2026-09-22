import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCartCountQuery } from './get-cart-count.query';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';

@QueryHandler(GetCartCountQuery)
export class GetCartCountHandler
  extends BaseQueryHandler<GetCartCountQuery, number>
  implements IQueryHandler<GetCartCountQuery>
{
  readonly queryType = 'cart.get-count';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
  ) { super(); }

  async execute(query: GetCartCountQuery): Promise<number> {
    const entity = await this.cartRepo.findById(CartIdVO.create(query.cartId));
    return entity?.itemCount ?? 0;
  }
}
