/**
 * DeliveryResolver
 * @module order-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  DELIVERY_SERVICE,
  type IDeliveryService,
} from '../../../application/services/interfaces/delivery.service.interface.js';
import { DeliveryControllerMapper } from '../../mappers/delivery.controller.mapper.js';

@Resolver('Delivery')
@UseGuards(JwtAuthGuard)
export class DeliveryResolver {
  private readonly logger = new Logger(DeliveryResolver.name);

  constructor(
    @Inject(DELIVERY_SERVICE)
    private readonly service: IDeliveryService,
  ) {}

  @Query('delivery')
  async getDelivery(@Args('id') id: string): Promise<unknown> {
    this.logger.debug(`GraphQL: delivery ${id}`);
    const app = await this.service.getById(id);
    return DeliveryControllerMapper.toHttpResponse(app);
  }
}
