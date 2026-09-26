import { Module } from '@nestjs/common';
import { ApnsProvider } from '../../../infrastructure/providers/push/apns.provider';

@Module({
  providers: [ApnsProvider],
  exports: [ApnsProvider],
})
export class ApnsProviderModule {}
