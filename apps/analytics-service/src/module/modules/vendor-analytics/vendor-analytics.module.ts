/**
 * Vendor Analytics Module
 */
import { Module } from '@nestjs/common';
import { VendorAnalyticsController } from '../../interfaces/controllers/rest/vendor-analytics.controller.js';
import { VENDOR_ANALYTICS_QUERY_HANDLERS } from './queries/index.js';

@Module({
  controllers: [VendorAnalyticsController],
  providers: [
    ...VENDOR_ANALYTICS_QUERY_HANDLERS as readonly unknown[] as never[],
  ],
})
export class VendorAnalyticsModule {}
