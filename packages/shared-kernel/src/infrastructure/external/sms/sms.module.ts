/**
 * SMS Module
 * @module shared-kernel/infrastructure/external/sms
 */
import { Global, Module } from '@nestjs/common';
import { SmsService } from './sms.service';

@Global()
@Module({
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
