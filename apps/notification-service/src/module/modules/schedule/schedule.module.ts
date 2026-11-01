/**
 * ScheduleModule
 * @module notification-service/modules/schedule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { ScheduleController } from '@interfaces/controllers/rest/schedule.controller.js';
import { SCHEDULE_COMMAND_HANDLERS } from './commands/index.js';
import { SCHEDULE_QUERY_HANDLERS } from './queries/index.js';
import { SCHEDULE_SAGAS } from './sagas/index.js';
import { ScheduleHealthIndicator } from './health/index.js';
import { QueuesWorkersModule } from '@infrastructure/modules/queues-workers.module.js';

// ─── Services ───────────────────────────────
import { ScheduleService } from '@application/services/impl/schedule.service.js';
import { SCHEDULE_SERVICE } from '@application/services/interfaces/schedule.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, QueuesWorkersModule],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    { provide: SCHEDULE_SERVICE, useExisting: ScheduleService },
    ...(SCHEDULE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(SCHEDULE_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(SCHEDULE_SAGAS as readonly unknown[] as never[]),
    ScheduleHealthIndicator,
  ],
  exports: [
    ScheduleService,
    SCHEDULE_SERVICE,
    ScheduleHealthIndicator,
  ],
})
export class ScheduleModule {}
