/**
 * BroadcastModule
 * @module notification-service/modules/broadcast
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { BroadcastController } from '@interfaces/controllers/rest/broadcast.controller.js';
import { BROADCAST_COMMAND_HANDLERS } from './commands/index.js';
import { BROADCAST_QUERY_HANDLERS } from './queries/index.js';
import { BROADCAST_SAGAS } from './sagas/index.js';
import { BroadcastHealthIndicator } from './health/index.js';

import { BroadcastService } from '@application/services/impl/broadcast.service.js';
import { BROADCAST_SERVICE } from '@application/services/interfaces/broadcast.service.interface.js';
import { BroadcastResultService } from '@application/services/impl/broadcast-result.service.js';
import { BROADCAST_RESULT_SERVICE } from '@application/services/interfaces/broadcast-result.service.interface.js';

import { AdminOnlyGuard } from '@interfaces/guards/admin-only.guard.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [BroadcastController],
  providers: [
    BroadcastService,
    { provide: BROADCAST_SERVICE, useExisting: BroadcastService },
    BroadcastResultService,
    { provide: BROADCAST_RESULT_SERVICE, useExisting: BroadcastResultService },
    ...(BROADCAST_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(BROADCAST_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(BROADCAST_SAGAS as readonly unknown[] as never[]),
    BroadcastHealthIndicator,
    AdminOnlyGuard,
  ],
  exports: [
    BroadcastService,
    BROADCAST_SERVICE,
    BroadcastResultService,
    BROADCAST_RESULT_SERVICE,
    BroadcastHealthIndicator,
  ],
})
export class BroadcastModule {}
