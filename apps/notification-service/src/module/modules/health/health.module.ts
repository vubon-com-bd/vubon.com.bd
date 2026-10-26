/**
 * HealthModule — health probe endpoints
 * @module notification-service/modules/health
 */
import { Module } from '@nestjs/common';
import { HealthController } from '@interfaces/controllers/rest/health.controller.js';
import { NotificationHealthIndicator } from './notification.health.js';

@Module({
  controllers: [HealthController],
  providers: [NotificationHealthIndicator],
  exports: [NotificationHealthIndicator],
})
export class HealthModule {}
