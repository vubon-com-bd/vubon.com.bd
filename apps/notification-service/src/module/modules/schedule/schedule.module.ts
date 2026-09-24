import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ScheduleController } from '../../interfaces/controllers/rest/schedule.controller';

// Services
import { ScheduleService } from '../../application/services/impl/schedule.service';

// Repositories
import { SchedulePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/schedule.prisma.repository';

// Workers + Queues
import { ScheduleTriggerWorker } from '../../infrastructure/workers/schedule-trigger.worker';
import { ScheduleQueue } from '../../infrastructure/queues/schedule.queue';

// Sagas
import { ScheduleTriggerSaga } from '../../application/sagas';

// Command handlers
import {
  CreateScheduleHandler,
  UpdateScheduleHandler,
  CancelScheduleHandler,
} from '../../application/commands/schedule';

// Query handlers
import {
  GetScheduleHandler,
  ListSchedulesHandler,
  ListDueSchedulesHandler,
} from '../../application/queries/schedule';

@Module({
  imports: [CqrsModule],
  controllers: [ScheduleController],
  providers: [
    // Repositories
    SchedulePrismaRepository,

    // Services
    ScheduleService,

    // Queue + Worker
    ScheduleQueue,
    ScheduleTriggerWorker,

    // Sagas
    ScheduleTriggerSaga,

    // Command handlers
    CreateScheduleHandler,
    UpdateScheduleHandler,
    CancelScheduleHandler,

    // Query handlers
    GetScheduleHandler,
    ListSchedulesHandler,
    ListDueSchedulesHandler,
  ],
  exports: [
    ScheduleService,
    SchedulePrismaRepository,
    ScheduleQueue,
  ],
})
export class ScheduleModule {}
