import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetOrderQuery } from '../../../application/queries/order/get-order.query';
import { GetOrderByNumberQuery } from '../../../application/queries/order/get-order-by-number.query';
import { ListOrdersQuery } from '../../../application/queries/order/list-orders.query';

/**
 * GraphQL Order Resolver (placeholder)
 *
 * @nestjs/graphql not installed — structural stub.
 * When the package is added, decorate with:
 *   @Resolver(() => OrderResponseDto)
 *   @Query(() => OrderResponseDto)
 *   @Mutation(() => OrderResponseDto)
 *   @Args()
 */
export class OrderResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  async order(id: string): Promise<unknown> {
    return this.queryBus.execute(new GetOrderQuery(id));
  }

  @UseGuards(JwtAuthGuard)
  async orderByNumber(orderNumber: string): Promise<unknown> {
    return this.queryBus.execute(new GetOrderByNumberQuery(orderNumber));
  }

  @UseGuards(JwtAuthGuard)
  async orders(page = 1, limit = 20): Promise<unknown> {
    return this.queryBus.execute(new ListOrdersQuery(page, limit));
  }

  async createOrder(input: unknown): Promise<unknown> {
    void this.commandBus;
    void input;
    throw new Error('GraphQL createOrder not yet wired');
  }
}
