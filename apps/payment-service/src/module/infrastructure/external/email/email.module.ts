/**
 * Payment Email Module
 * @module payment-service/infrastructure/external/email
 */
import { Module } from '@nestjs/common';
import { EmailModule as KernelEmailModule } from '@vubon/shared-kernel/infrastructure/external/email';
import { PaymentEmailService } from '../../services/external/email.service.js';

@Module({
  imports: [KernelEmailModule],
  providers: [PaymentEmailService],
  exports: [PaymentEmailService],
})
export class PaymentEmailModule {}
