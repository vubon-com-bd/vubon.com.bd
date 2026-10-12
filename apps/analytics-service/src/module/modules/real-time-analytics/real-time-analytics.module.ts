/**
 * Real-Time Analytics Module
 */
import { Module } from '@nestjs/common';
import { RealTimeAnalyticsController } from '../../interfaces/controllers/rest/real-time-analytics.controller.js';
import { REAL_TIME_ANALYTICS_QUERY_HANDLERS } from './queries/index.js';

@Module({
  controllers: [RealTimeAnalyticsController],
  providers: [
    ...REAL_TIME_ANALYTICS_QUERY_HANDLERS as readonly unknown[] as never[],
  ],
})
export class RealTimeAnalyticsModule {}
