import { Module } from '@nestjs/common';
import { OrderNotificationService } from './notification.service';

@Module({
  providers: [OrderNotificationService],
  exports: [OrderNotificationService],
})
export class OrderNotificationModule {}
