import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsClient } from '../../services/external/analytics.client';

@Module({
  providers: [AnalyticsService, AnalyticsClient],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
