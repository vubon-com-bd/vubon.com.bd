/**
 * MailgunProviderModule
 * @module notification-service/modules/provider-gateways/providers
 */
import { Module } from '@nestjs/common';
import { MailgunProvider } from '@infrastructure/providers/email/mailgun.provider.js';

@Module({
  providers: [MailgunProvider],
  exports: [MailgunProvider],
})
export class MailgunProviderModule {}
