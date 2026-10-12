/**
 * Order Analytics Module
 */
import { Module } from '@nestjs/common';
import { OrderAnalyticsController } from '../../interfaces/controllers/rest/order-analytics.controller.js';
import { ORDER_ANALYTICS_QUERY_HANDLERS } from './queries/index.js';

@Module({
  controllers: [OrderAnalyticsController],
  providers: [
    ...ORDER_ANALYTICS_QUERY_HANDLERS as readonly unknown[] as never[],
  ],
})
export class OrderAnalyticsModule {}
