import { Module } from '@nestjs/common';
import { MailgunProvider } from '../../../infrastructure/providers/email/mailgun.provider';

@Module({
  providers: [MailgunProvider],
  exports: [MailgunProvider],
})
export class MailgunProviderModule {}
