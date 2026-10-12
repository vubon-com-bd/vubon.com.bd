/**
 * HealthModule — liveness & readiness endpoints
 * @module logistics-service/modules/health
 */
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller.js';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
