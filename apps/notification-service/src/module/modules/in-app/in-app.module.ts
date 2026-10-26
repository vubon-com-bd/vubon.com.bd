/**
 * InAppModule
 * @module notification-service/modules/in-app
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { InAppController } from '@interfaces/controllers/rest/in-app.controller.js';
import { IN_APP_COMMAND_HANDLERS } from './commands/index.js';
import { IN_APP_QUERY_HANDLERS } from './queries/index.js';
import { NotificationModule } from '@modules/notification/notification.module.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, NotificationModule],
  controllers: [InAppController],
  providers: [
    ...(IN_APP_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(IN_APP_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
})
export class InAppModule {}
