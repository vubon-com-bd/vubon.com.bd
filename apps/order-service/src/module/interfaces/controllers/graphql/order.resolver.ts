/**
 * OrderResolver — GraphQL read endpoints
 * @module order-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import {
  ORDER_SERVICE,
  type IOrderService,
} from '../../../application/services/interfaces/order.service.interface.js';
import { OrderControllerMapper } from '../../mappers/order.controller.mapper.js';

@Resolver('Order')
@UseGuards(JwtAuthGuard)
export class OrderResolver {
  private readonly logger = new Logger(OrderResolver.name);

  constructor(
    @Inject(ORDER_SERVICE)
    private readonly service: IOrderService,
  ) {}

  @Query('order')
  async getOrder(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: order ${id} for ${user.userId}`);
    const app = await this.service.getById(id);
    return OrderControllerMapper.toHttpResponse(app);
  }

  @Query('orders')
  async listOrders(
    @Args('page') page?: number,
    @Args('limit') limit?: number,
    @Args('status') status?: string,
    @CurrentUser() user?: CurrentUserShape,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: orders for ${user?.userId ?? 'anon'}`);
    const options = OrderControllerMapper.toListOptions({
      page,
      limit,
      status,
    });
    const app = await this.service.listByCustomer(user?.userId ?? 'anon', options);
    return OrderControllerMapper.toListHttp(app);
  }

  @Query('orderStats')
  async getStats(@Args('customerId') customerId?: string): Promise<unknown> {
    const app = await this.service.getStats(customerId);
    return OrderControllerMapper.toStatsHttp(app);
  }
}
