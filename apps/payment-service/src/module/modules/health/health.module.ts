/**
 * HealthModule — health probes
 * @module payment-service/modules/health
 */
import { Module } from '@nestjs/common';
import { HealthController } from '../../interfaces/controllers/rest/health.controller.js';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
