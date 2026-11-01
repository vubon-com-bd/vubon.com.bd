/**
 * CartResolver — GraphQL endpoints (read-heavy)
 * @module cart-service/interfaces/controllers/graphql
 *
 * ⚠️ Optional — only active if GraphQLModule is configured in app.module.
 * Registered via @nestjs/graphql decorators.
 */
import { Logger, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { GetCartQuery } from '../../../application/queries/cart/get-cart.query.js';
import { GetCartByUserQuery } from '../../../application/queries/cart/get-cart-by-user.query.js';
import { GetCartSummaryQuery } from '../../../application/queries/cart/get-cart-summary.query.js';
import { ListItemsQuery } from '../../../application/queries/item/list-items.query.js';
import { GetTotalsQuery } from '../../../application/queries/totals/get-totals.query.js';

@Resolver('Cart')
@UseGuards(JwtAuthGuard)
export class CartResolver {
  private readonly logger = new Logger(CartResolver.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Query('cart')
  async getCart(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: getCart ${id} by user ${user.userId}`);
    return this.queryBus.execute(new GetCartQuery(id));
  }

  @Query('myCart')
  async getMyCart(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: myCart for ${user.userId}`);
    return this.queryBus.execute(new GetCartByUserQuery(user.userId));
  }

  @Query('cartSummary')
  async getCartSummary(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: cartSummary ${id} by ${user.userId}`);
    return this.queryBus.execute(new GetCartSummaryQuery(id));
  }

  @Query('cartItems')
  async listCartItems(
    @Args('cartId') cartId: string,
    @Args('page') page?: number,
    @Args('limit') limit?: number,
    @CurrentUser() user?: CurrentUserShape,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: cartItems ${cartId} by ${user?.userId ?? 'anon'}`);
    return this.queryBus.execute(
      new ListItemsQuery({
        page: page ?? 1,
        limit: limit ?? 20,
        filter: { cartId },
      }),
    );
  }

  @Query('cartTotals')
  async getCartTotals(
    @Args('cartId') cartId: string,
    @Args('taxRate') taxRate?: number,
    @CurrentUser() user?: CurrentUserShape,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: cartTotals ${cartId} by ${user?.userId ?? 'anon'}`);
    return this.queryBus.execute(new GetTotalsQuery(cartId, taxRate));
  }
}
