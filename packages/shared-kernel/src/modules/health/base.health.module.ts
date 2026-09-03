import { Module } from '@nestjs/common';
import { HealthController } from './base.health.controller';
import { HealthService } from './base.health';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
