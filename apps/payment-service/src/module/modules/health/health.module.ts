/**
 * HealthModule — health probes
 * @module payment-service/modules/health
 *
 * The HealthController is registered in interfaces/controllers/rest.
 * This module provides the aggregated PaymentHealthIndicator.
 */
import { Module } from '@nestjs/common';
import { HealthController } from '@interfaces/controllers/rest/health.controller.js';
import { PaymentHealthIndicator } from './payment.health.js';

@Module({
  controllers: [HealthController],
  providers: [PaymentHealthIndicator],
  exports: [PaymentHealthIndicator],
})
export class HealthModule {}
