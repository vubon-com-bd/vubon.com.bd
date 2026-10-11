/**
 * BroadcastModule — mass-send orchestration
 * @module notification-service/modules/broadcast
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { BroadcastController } from '../../interfaces/controllers/rest/broadcast.controller.js';
import { BroadcastService } from '../../application/services/impl/broadcast.service.js';
import { BROADCAST_SERVICE } from '../../application/services/interfaces/broadcast.service.interface.js';
import { BROADCAST_COMMAND_HANDLERS } from '../../application/commands/broadcast/index.js';
import { BROADCAST_QUERY_HANDLERS } from '../../application/queries/broadcast/index.js';
import { BroadcastProcessingSaga } from '../../application/sagas/broadcast-processing.saga.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [BroadcastController],
  providers: [
    BroadcastService,
    { provide: BROADCAST_SERVICE, useExisting: BroadcastService },
    ...BROADCAST_COMMAND_HANDLERS,
    ...BROADCAST_QUERY_HANDLERS,
    BroadcastProcessingSaga,
  ],
  exports: [BroadcastService, BROADCAST_SERVICE],
})
export class BroadcastModule {}
