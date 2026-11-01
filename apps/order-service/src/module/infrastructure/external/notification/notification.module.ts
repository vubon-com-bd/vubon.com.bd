/**
 * Notification Module
 * @module order-service/infrastructure/external/notification
 */
import { Global, Module } from '@nestjs/common';
import {
  EmailModule,
  SmsModule,
  PushModule,
} from '@vubon/shared-kernel/infrastructure/external';
import { NotificationService } from './notification.service.js';

@Global()
@Module({
  imports: [EmailModule, SmsModule, PushModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class OrderNotificationModule {}
