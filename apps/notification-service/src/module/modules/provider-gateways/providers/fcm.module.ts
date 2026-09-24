import { Module } from '@nestjs/common';
import { FcmProvider } from '../../../infrastructure/providers/push/fcm.provider';

@Module({
  providers: [FcmProvider],
  exports: [FcmProvider],
})
export class FcmProviderModule {}
