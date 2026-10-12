/**
 * HealthModule — health probe endpoints
 * @module identity-service/modules/health
 */
import { Module } from '@nestjs/common';
import { HealthController } from '../../interfaces/controllers/rest/health.controller.js';
import { AuthHealthIndicator } from './auth.health.js';

@Module({
  controllers: [HealthController],
  providers: [AuthHealthIndicator],
  exports: [AuthHealthIndicator],
})
export class HealthModule {}
