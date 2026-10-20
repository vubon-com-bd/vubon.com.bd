/**
 * TrackingResolver
 * @module order-service/interfaces/controllers/graphql
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  ORDER_TRACKING_SERVICE,
  type IOrderTrackingService,
} from '../../../application/services/interfaces/order-tracking.service.interface.js';

@Resolver('Tracking')
@UseGuards(JwtAuthGuard)
export class TrackingResolver {
  private readonly logger = new Logger(TrackingResolver.name);

  constructor(
    @Inject(ORDER_TRACKING_SERVICE)
    private readonly service: IOrderTrackingService,
  ) {}

  @Query('orderTracking')
  async getTracking(@Args('orderId') orderId: string): Promise<unknown> {
    this.logger.debug(`GraphQL: tracking for ${orderId}`);
    return this.service.getSummaryByOrder(orderId);
  }
}
