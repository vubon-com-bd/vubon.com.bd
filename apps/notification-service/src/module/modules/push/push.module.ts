/**
 * PushModule
 * @module notification-service/modules/push
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { PushController } from '@interfaces/controllers/rest/push.controller.js';
import { PUSH_COMMAND_HANDLERS } from './commands/index.js';
import { PUSH_QUERY_HANDLERS } from './queries/index.js';
import { DeliveryTrackingInterceptor } from '@interfaces/interceptors/delivery-tracking.interceptor.js';
import { NotificationModule } from '@modules/notification/notification.module.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, NotificationModule],
  controllers: [PushController],
  providers: [
    ...(PUSH_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(PUSH_QUERY_HANDLERS as readonly unknown[] as never[]),
    DeliveryTrackingInterceptor,
  ],
})
export class PushModule {}
