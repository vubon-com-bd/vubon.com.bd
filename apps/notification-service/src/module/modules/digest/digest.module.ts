/**
 * DigestModule
 * @module notification-service/modules/digest
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { DigestController } from '@interfaces/controllers/rest/digest.controller.js';
import { DIGEST_COMMAND_HANDLERS } from './commands/index.js';
import { DIGEST_QUERY_HANDLERS } from './queries/index.js';

import { DigestService } from '@application/services/impl/digest.service.js';
import { DIGEST_SERVICE } from '@application/services/interfaces/digest.service.interface.js';
import { DigestItemService } from '@application/services/impl/digest-item.service.js';
import { DIGEST_ITEM_SERVICE } from '@application/services/interfaces/digest-item.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [DigestController],
  providers: [
    DigestService,
    { provide: DIGEST_SERVICE, useExisting: DigestService },
    DigestItemService,
    { provide: DIGEST_ITEM_SERVICE, useExisting: DigestItemService },
    ...(DIGEST_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(DIGEST_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [
    DigestService,
    DIGEST_SERVICE,
    DigestItemService,
    DIGEST_ITEM_SERVICE,
  ],
})
export class DigestModule {}
