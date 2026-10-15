/**
 * HealthModule — health probe endpoints
 * @module cart-service/modules/health
 */
import { Module } from '@nestjs/common';
import { HealthController } from '../../interfaces/controllers/rest/health.controller.js';
import { CartHealthIndicator } from './cart.health.js';

@Module({
  controllers: [HealthController],
  providers: [CartHealthIndicator],
  exports: [CartHealthIndicator],
})
export class HealthModule {}
