import { Global, Module } from '@nestjs/common';
import { LogisticsNotificationService } from './notification.service';

@Global()
@Module({
  providers: [LogisticsNotificationService],
  exports: [LogisticsNotificationService],
})
export class LogisticsNotificationModule {}
