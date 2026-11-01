/**
 * Notification Module
 * @module product-service/infrastructure/external/notification
 */
import { Global, Module } from '@nestjs/common';
import { ProductNotificationDispatcher } from './notification.service.js';

@Global()
@Module({
  providers: [ProductNotificationDispatcher],
  exports: [ProductNotificationDispatcher],
})
export class ProductNotificationModule {}
