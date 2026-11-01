/**
 * Auth SMS Module
 * @module identity-service/infrastructure/external/sms
 */
import { Global, Module } from '@nestjs/common';
import { SmsModule as KernelSmsModule } from '@vubon/shared-kernel/infrastructure/external/sms';
import { AuthSmsService } from './sms.service.js';

@Global()
@Module({
  imports: [KernelSmsModule],
  providers: [AuthSmsService],
  exports: [AuthSmsService],
})
export class AuthSmsModule {}
