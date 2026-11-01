/**
 * AnalyticsModule — read-only analytics endpoints
 * @module notification-service/modules/analytics
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AnalyticsController } from '@interfaces/controllers/rest/analytics.controller.js';
import { ANALYTICS_COMMAND_HANDLERS } from './commands/index.js';
import { ANALYTICS_QUERY_HANDLERS } from './queries/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [AnalyticsController],
  providers: [
    ...(ANALYTICS_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(ANALYTICS_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
})
export class AnalyticsModule {}
