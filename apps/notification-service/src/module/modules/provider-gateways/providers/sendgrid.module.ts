import { Module } from '@nestjs/common';
import { SendGridProvider } from '../../../infrastructure/providers/email/sendgrid.provider';

@Module({
  providers: [SendGridProvider],
  exports: [SendGridProvider],
})
export class SendGridProviderModule {}
