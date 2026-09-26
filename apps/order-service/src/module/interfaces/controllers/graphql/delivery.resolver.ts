import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GetDeliveryByOrderQuery } from '../../../application/queries/delivery/get-delivery-by-order.query';
import { GetDeliveryMethodsQuery } from '../../../application/queries/delivery/get-delivery-methods.query';

/**
 * GraphQL Delivery Resolver (placeholder)
 *
 * @nestjs/graphql not installed — structural stub only.
 */
export class DeliveryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  async deliveryByOrder(orderId: string): Promise<unknown> {
    return this.queryBus.execute(new GetDeliveryByOrderQuery(orderId));
  }

  async deliveryMethods(): Promise<unknown> {
    return this.queryBus.execute(new GetDeliveryMethodsQuery());
  }
}
