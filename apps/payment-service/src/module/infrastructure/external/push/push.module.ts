/**
 * Payment Push Module
 * @module payment-service/infrastructure/external/push
 */
import { Module } from '@nestjs/common';
import { PushModule as KernelPushModule } from '@vubon/shared-kernel/infrastructure/external/push';
import { PaymentPushService } from '../../services/external/push.service.js';

@Module({
  imports: [KernelPushModule],
  providers: [PaymentPushService],
  exports: [PaymentPushService],
})
export class PaymentPushModule {}
