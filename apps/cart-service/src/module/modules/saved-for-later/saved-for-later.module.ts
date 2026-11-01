/**
 * SavedForLaterModule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { SavedForLaterController } from '../../interfaces/controllers/rest/saved-for-later.controller.js';

import { SAVED_FOR_LATER_COMMAND_HANDLERS } from './commands/index.js';
import { SAVED_FOR_LATER_QUERY_HANDLERS } from './queries/index.js';

import { SavedForLaterService } from '../../application/services/impl/saved-for-later.service.js';
import { SAVED_FOR_LATER_SERVICE } from '../../application/services/interfaces/saved-for-later.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [SavedForLaterController],
  providers: [
    SavedForLaterService,
    { provide: SAVED_FOR_LATER_SERVICE, useExisting: SavedForLaterService },
    ...(SAVED_FOR_LATER_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(SAVED_FOR_LATER_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [SavedForLaterService, SAVED_FOR_LATER_SERVICE],
})
export class SavedForLaterModule {}
