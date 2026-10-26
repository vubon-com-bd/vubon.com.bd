/**
 * SendgridProviderModule — email provider isolated module
 * @module notification-service/modules/provider-gateways/providers
 */
import { Module } from '@nestjs/common';
import { SendgridProvider } from '@infrastructure/providers/email/sendgrid.provider.js';

@Module({
  providers: [SendgridProvider],
  exports: [SendgridProvider],
})
export class SendgridProviderModule {}
