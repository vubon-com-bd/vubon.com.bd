/**
 * SmsModule
 * @module notification-service/modules/sms
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { SmsController } from '@interfaces/controllers/rest/sms.controller.js';
import { SMS_COMMAND_HANDLERS } from './commands/index.js';
import { SMS_QUERY_HANDLERS } from './queries/index.js';
import { DeliveryTrackingInterceptor } from '@interfaces/interceptors/delivery-tracking.interceptor.js';
import { NotificationModule } from '@modules/notification/notification.module.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, NotificationModule],
  controllers: [SmsController],
  providers: [
    ...(SMS_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(SMS_QUERY_HANDLERS as readonly unknown[] as never[]),
    DeliveryTrackingInterceptor,
  ],
})
export class SmsModule {}
