/**
 * HealthModule — health probe endpoints
 * @module vendor-service/modules/health
 */
import { Module } from '@nestjs/common';
import { HealthController } from '../../interfaces/controllers/rest/health.controller.js';
import { VendorHealthIndicator } from './vendor.health.js';

@Module({
  controllers: [HealthController],
  providers: [VendorHealthIndicator],
  exports: [VendorHealthIndicator],
})
export class HealthModule {}
