/**
 * ScheduleModule — scheduled + digest orchestration
 * @module notification-service/modules/schedule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { ScheduleController } from '../../interfaces/controllers/rest/schedule.controller.js';
import { DigestController } from '../../interfaces/controllers/rest/digest.controller.js';

import { ScheduleService } from '../../application/services/impl/schedule.service.js';
import { DigestService } from '../../application/services/impl/digest.service.js';
import { SCHEDULE_SERVICE } from '../../application/services/interfaces/schedule.service.interface.js';
import { DIGEST_SERVICE } from '../../application/services/interfaces/digest.service.interface.js';

import { SCHEDULE_COMMAND_HANDLERS } from '../../application/commands/schedule/index.js';
import { DIGEST_COMMAND_HANDLERS } from '../../application/commands/digest/index.js';
import { SCHEDULE_QUERY_HANDLERS } from '../../application/queries/schedule/index.js';
import { DIGEST_QUERY_HANDLERS } from '../../application/queries/digest/index.js';

import { ScheduleTriggerSaga } from '../../application/sagas/schedule-trigger.saga.js';
import { DigestGenerationSaga } from '../../application/sagas/digest-generation.saga.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [ScheduleController, DigestController],
  providers: [
    ScheduleService,
    DigestService,
    { provide: SCHEDULE_SERVICE, useExisting: ScheduleService },
    { provide: DIGEST_SERVICE, useExisting: DigestService },
    ...SCHEDULE_COMMAND_HANDLERS,
    ...DIGEST_COMMAND_HANDLERS,
    ...SCHEDULE_QUERY_HANDLERS,
    ...DIGEST_QUERY_HANDLERS,
    ScheduleTriggerSaga,
    DigestGenerationSaga,
  ],
  exports: [ScheduleService, DigestService, SCHEDULE_SERVICE, DIGEST_SERVICE],
})
export class ScheduleModule {}
