/**
 * HealthModule — health probe endpoints
 * @module order-service/modules/health
 */
import { Module } from '@nestjs/common';
import { HealthController } from '../../interfaces/controllers/rest/health.controller.js';
import { OrderHealthIndicator } from './order.health.js';

@Module({
  controllers: [HealthController],
  providers: [OrderHealthIndicator],
  exports: [OrderHealthIndicator],
})
export class HealthModule {}
