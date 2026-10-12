/**
 * Product Analytics Module
 */
import { Module } from '@nestjs/common';
import { ProductAnalyticsController } from '../../interfaces/controllers/rest/product-analytics.controller.js';
import { PRODUCT_ANALYTICS_QUERY_HANDLERS } from './queries/index.js';

@Module({
  controllers: [ProductAnalyticsController],
  providers: [
    ...PRODUCT_ANALYTICS_QUERY_HANDLERS as readonly unknown[] as never[],
  ],
})
export class ProductAnalyticsModule {}
