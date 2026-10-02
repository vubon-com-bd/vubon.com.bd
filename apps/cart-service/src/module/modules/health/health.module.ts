import { Module } from '@nestjs/common';
import { HealthController } from './health.controller.js';
import { CartHealthService } from '../../infrastructure/health/health.service.js';

@Module({
  controllers: [HealthController],
  providers: [CartHealthService],
  exports: [CartHealthService],
})
export class HealthModule {}
