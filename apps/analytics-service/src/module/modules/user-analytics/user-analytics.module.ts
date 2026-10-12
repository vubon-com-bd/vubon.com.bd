/**
 * User Analytics Module
 */
import { Module } from '@nestjs/common';
import { UserAnalyticsController } from '../../interfaces/controllers/rest/user-analytics.controller.js';
import { USER_ANALYTICS_QUERY_HANDLERS } from './queries/index.js';

@Module({
  controllers: [UserAnalyticsController],
  providers: [
    ...USER_ANALYTICS_QUERY_HANDLERS as readonly unknown[] as never[],
  ],
})
export class UserAnalyticsModule {}
