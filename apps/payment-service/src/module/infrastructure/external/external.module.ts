/**
 * External Integrations Module
 * @module payment-service/infrastructure/external
 */
import { Module } from '@nestjs/common';
import { PaymentEmailModule } from './email/email.module.js';
import { PaymentSmsModule } from './sms/sms.module.js';
import { PaymentPushModule } from './push/push.module.js';

@Module({
  imports: [PaymentEmailModule, PaymentSmsModule, PaymentPushModule],
  exports: [PaymentEmailModule, PaymentSmsModule, PaymentPushModule],
})
export class ExternalIntegrationsModule {}
