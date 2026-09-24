import { Module } from '@nestjs/common';
import { SesProvider } from '../../../infrastructure/providers/email/ses.provider';

@Module({
  providers: [SesProvider],
  exports: [SesProvider],
})
export class SesProviderModule {}
