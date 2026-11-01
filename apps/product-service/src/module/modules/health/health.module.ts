/**
 * HealthModule — health probe endpoints
 * @module product-service/modules/health
 */
import { Module } from '@nestjs/common';
import { HealthController } from '../../interfaces/controllers/rest/health.controller.js';
import { ProductHealthIndicator } from './product.health.js';

@Module({
  controllers: [HealthController],
  providers: [ProductHealthIndicator],
  exports: [ProductHealthIndicator],
})
export class HealthModule {}
