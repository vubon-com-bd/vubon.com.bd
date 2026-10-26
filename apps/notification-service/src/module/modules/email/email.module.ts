/**
 * EmailModule
 * @module notification-service/modules/email
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { EmailController } from '@interfaces/controllers/rest/email.controller.js';
import { EMAIL_COMMAND_HANDLERS } from './commands/index.js';
import { EMAIL_QUERY_HANDLERS } from './queries/index.js';
import { DeliveryTrackingInterceptor } from '@interfaces/interceptors/delivery-tracking.interceptor.js';
import { NotificationModule } from '@modules/notification/notification.module.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, NotificationModule],
  controllers: [EmailController],
  providers: [
    ...(EMAIL_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(EMAIL_QUERY_HANDLERS as readonly unknown[] as never[]),
    DeliveryTrackingInterceptor,
  ],
})
export class EmailModule {}
