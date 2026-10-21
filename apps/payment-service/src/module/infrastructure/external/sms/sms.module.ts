/**
 * Payment SMS Module
 * @module payment-service/infrastructure/external/sms
 */
import { Module } from '@nestjs/common';
import { SmsModule as KernelSmsModule } from '@vubon/shared-kernel/infrastructure/external/sms';
import { PaymentSmsService } from '../../services/external/sms.service.js';

@Module({
  imports: [KernelSmsModule],
  providers: [PaymentSmsService],
  exports: [PaymentSmsService],
})
export class PaymentSmsModule {}
